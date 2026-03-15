import React, { useState, useEffect, useCallback, useRef } from 'react';

const STAGE_WIDTH = 10;
const STAGE_HEIGHT = 20;

const TETROMINOS = {
  0: { shape: [[0]], color: 'bg-slate-950' },
  I: { shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]], color: 'bg-cyan-400 border-b-2 border-black/30' },
  J: { shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]], color: 'bg-blue-500 border-b-2 border-black/30' },
  L: { shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']], color: 'bg-orange-500 border-b-2 border-black/30' },
  O: { shape: [['O', 'O'], ['O', 'O']], color: 'bg-yellow-400 border-b-2 border-black/30' },
  S: { shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]], color: 'bg-green-500 border-b-2 border-black/30' },
  T: { shape: [[0, 0, 0], ['T', 'T', 'T'], [0, 'T', 0]], color: 'bg-purple-500 border-b-2 border-black/30' },
  Z: { shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]], color: 'bg-red-500 border-b-2 border-black/30' }
};

const createStage = () => Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']));

const randomTetromino = () => {
  const tetros = 'IJLOSTZ';
  const rand = tetros[Math.floor(Math.random() * tetros.length)];
  return TETROMINOS[rand];
};

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => { savedCallback.current = callback; }, [callback]);
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Tetris() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState({ pos: { x: 4, y: 0 }, tetromino: TETROMINOS[0].shape, collided: false });
  const [stage, setStage] = useState(createStage());

  const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
      for (let x = 0; x < player.tetromino[y].length; x += 1) {
        if (player.tetromino[y][x] !== 0) {
          if (
            !stage[y + player.pos.y + moveY] || 
            !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
            stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const resetPlayer = useCallback(() => {
    const newTetro = randomTetromino();
    setPlayer({ pos: { x: STAGE_WIDTH / 2 - 2, y: 0 }, tetromino: newTetro.shape, collided: false });
  }, []);

  const rotate = (matrix) => {
    const rotated = matrix.map((_, index) => matrix.map(col => col[index]));
    return rotated.map(row => row.reverse());
  };

  const playerRotate = (stage) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);
    if (!checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      setPlayer(clonedPlayer);
    }
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) },
      collided,
    }));
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(800);
    resetPlayer();
    setGameOver(false);
    setScore(0);
  };

  // The engine that combines everything
  useEffect(() => {
    const updateStage = prevStage => {
      // Clear out old "falling" cells
      const newStage = prevStage.map(row => 
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Draw the active piece
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const posY = y + player.pos.y;
            const posX = x + player.pos.x;
            if (newStage[posY] && newStage[posY][posX]) {
              newStage[posY][posX] = [value, `${player.collided ? 'merged' : 'clear'}`];
            }
          }
        });
      });

      // Handle row clearing if piece merged
      if (player.collided) {
        resetPlayer();
        const swept = newStage.reduce((acc, row) => {
          if (row.findIndex(cell => cell[0] === 0) === -1) {
            setScore(prev => prev + 100);
            acc.unshift(new Array(STAGE_WIDTH).fill([0, 'clear']));
            return acc;
          }
          acc.push(row);
          return acc;
        }, []);
        return swept;
      }
      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player, resetPlayer]);

  useInterval(() => { drop(); }, dropTime);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.keyCode === 37) { // Left
         if (!checkCollision(player, stage, { x: -1, y: 0 })) updatePlayerPos({ x: -1, y: 0 });
      } else if (e.keyCode === 39) { // Right
         if (!checkCollision(player, stage, { x: 1, y: 0 })) updatePlayerPos({ x: 1, y: 0 });
      } else if (e.keyCode === 40) { // Down
         drop();
      } else if (e.keyCode === 38) { // Up (Rotate)
         playerRotate(stage);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, stage, gameOver]);

  return (
    <div className="min-w-[300px] w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="flex items-center justify-between w-full max-w-[280px] mb-4">
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-widest uppercase">Arcade</h3>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Score</p>
          <p className="text-xl text-slate-200 font-mono leading-none">{score.toString().padStart(5, '0')}</p>
        </div>
      </div>
      
      <div className="w-full max-w-[260px] aspect-[1/2] bg-slate-900 border-4 border-slate-800 rounded-lg shadow-2xl relative overflow-hidden group">
        <div className="z-10 w-full h-full bg-slate-950 p-[1px]">
          <div className="w-full h-full grid grid-rows-[repeat(20,1fr)] grid-cols-[repeat(10,1fr)] gap-[1px] bg-slate-800">
            {stage.map((row, y) => 
              row.map((cell, x) => (
                <div key={`${y}-${x}`} className={`w-full h-full rounded-sm transition-colors duration-100 ${TETROMINOS[cell[0]]?.color || 'bg-slate-950'}`} />
              ))
            )}
          </div>
        </div>
        
        {(!dropTime || gameOver) && (
          <div className="absolute inset-0 z-20 w-full h-full flex items-center justify-center bg-black/70 backdrop-blur-md">
            <div className="text-center p-8">
              {gameOver && <p className="text-red-500 font-black text-2xl mb-6 drop-shadow-lg">CRASHED</p>}
              <button onClick={startGame} className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3 px-8 rounded-full shadow-xl shadow-indigo-500/40 transition-all active:scale-90 scale-110">
                {gameOver ? "REBOOT" : "BOOT UP"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-4 text-[10px] font-mono text-slate-600">
        <span>&larr; &rarr; MOVE</span>
        <span>&uarr; ROTATE</span>
      </div>
    </div>
  );
}