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
    <div className="min-w-[300px] w-full h-full flex flex-col items-center justify-center p-6 bg-[#020617] select-none">
      
      {/* HEADER */}
      <div className="flex items-center justify-between w-full max-w-[260px] mb-6">
        <div className="flex flex-col">
          <h3 className="text-lg font-black text-white tracking-widest uppercase italic leading-none">
            Tetris
          </h3>
          <span className="text-[16px] text-indigo-500 font-mono tracking-[0.3em] mt-1">feels fun</span>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total_Score</p>
          <p className="text-2xl text-indigo-400 font-mono leading-none font-black drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]">
            {score.toString().padStart(5, '0')}
          </p>
        </div>
      </div>
      
      {/* GAME VIEWPORT */}
      <div className="relative w-full max-w-[260px] aspect-[1/2] bg-black border-[4px] border-slate-900 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* THE GRID */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-[repeat(20,1fr)]">
          {stage.map((row, y) => 
            row.map((cell, x) => (
              <div 
                key={`${y}-${x}`} 
                className={`
                  w-full h-full border-[0.5px] border-slate-800/40 transition-colors duration-100
                  ${TETROMINOS[cell[0]]?.color || 'bg-transparent'}
                  ${cell[0] !== 0 ? 'shadow-[inset_0_0_12px_rgba(255,255,255,0.1)]' : ''}
                `} 
              />
            ))
          )}
        </div>
        
        {/* CRT SCANLINE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />

        {/* MENUS */}
        {(!dropTime || gameOver) && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
            <div className="text-center p-6">
              {gameOver && (
                <div className="mb-8">
                  <p className="text-red-500 font-black text-3xl tracking-tighter italic">OVERFLOW</p>
                  <div className="h-1 w-full bg-red-950 mt-2 overflow-hidden">
                    <div className="h-full bg-red-500 animate-[progress_2s_ease-in-out_infinite]" style={{width: '60%'}} />
                  </div>
                </div>
              )}
              <button 
                onClick={startGame} 
                className="relative group bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-10 rounded-sm transition-all active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
              >
                <span className="relative z-10 tracking-[0.2em] uppercase italic text-sm">
                  {gameOver ? "Restart_Core" : "Initialize"}
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CONTROLS HINT */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex gap-3">
          {['↑', '←', '↓', '→'].map(key => (
            <div key={key} className="w-8 h-8 flex items-center justify-center border border-slate-800 rounded text-slate-500 font-bold text-xs bg-slate-900/50">
              {key}
            </div>
          ))}
        </div>
        <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold">Manual_Override_Active</p>
      </div>
    </div>
  );
}