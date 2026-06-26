import React, { useState, useEffect, useCallback, useRef } from "react";
import { Gamepad2, Play, Pause, RotateCcw, Volume2, VolumeX, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, Zap } from "lucide-react";

type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

const SHAPES: Record<PieceType, number[][]> = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
};

const COLORS: Record<PieceType, string> = {
  I: "bg-cyan-500 border-cyan-300 shadow-cyan-500/40",
  O: "bg-yellow-500 border-yellow-300 shadow-yellow-500/40",
  T: "bg-purple-500 border-purple-300 shadow-purple-500/40",
  S: "bg-emerald-500 border-emerald-300 shadow-emerald-500/40",
  Z: "bg-rose-500 border-rose-300 shadow-rose-500/40",
  J: "bg-blue-500 border-blue-300 shadow-blue-500/40",
  L: "bg-amber-500 border-amber-300 shadow-amber-500/40",
};

const COLS = 10;
const ROWS = 20;

export default function TetrisApp() {
  const [grid, setGrid] = useState<(PieceType | null)[][]>(() =>
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  );

  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    type: PieceType;
    x: number;
    y: number;
  } | null>(null);

  const [nextPieceType, setNextPieceType] = useState<PieceType>("I");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem("tetris_high_score") || "0");
    } catch {
      return 0;
    }
  });
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const requestRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  // Play retro synth sound effects
  const playSound = useCallback((type: "rotate" | "move" | "clear" | "gameover" | "drop") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "rotate") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "move") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.setValueAtTime(170, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "drop") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "clear") {
        osc.type = "square";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24); // C6
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "gameover") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      // AudioContext blocked or not supported
    }
  }, [soundEnabled]);

  // Generate a random piece type
  const getRandomPieceType = (): PieceType => {
    const types: PieceType[] = ["I", "O", "T", "S", "Z", "J", "L"];
    return types[Math.floor(Math.random() * types.length)];
  };

  // Setup/Reset next piece
  const spawnPiece = useCallback((nextType: PieceType) => {
    const shape = SHAPES[nextType];
    const newNextType = getRandomPieceType();
    setNextPieceType(newNextType);

    // Initial position: top-center
    const startX = Math.floor((COLS - shape[0].length) / 2);
    const startY = 0;

    // Check collision right at spawn (Game Over check)
    let collision = false;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const boardY = startY + r;
          const boardX = startX + c;
          if (grid[boardY] && grid[boardY][boardX] !== null) {
            collision = true;
          }
        }
      }
    }

    if (collision) {
      setGameOver(true);
      setIsPaused(true);
      playSound("gameover");
    } else {
      setCurrentPiece({
        shape,
        type: nextType,
        x: startX,
        y: startY,
      });
    }
  }, [grid, playSound]);

  // Restart Game
  const startNewGame = useCallback(() => {
    setGrid(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
    
    const initialType = getRandomPieceType();
    const nextType = getRandomPieceType();
    
    // Set next piece
    setNextPieceType(nextType);

    // Initial position for current piece
    const shape = SHAPES[initialType];
    setCurrentPiece({
      shape,
      type: initialType,
      x: Math.floor((COLS - shape[0].length) / 2),
      y: 0,
    });
  }, []);

  // Check collision of block against board bounds or solid blocks
  const checkCollision = useCallback(
    (shape: number[][], offsetX: number, offsetY: number) => {
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (shape[r][c]) {
            const boardX = offsetX + c;
            const boardY = offsetY + r;

            // Check walls & bottom
            if (boardX < 0 || boardX >= COLS || boardY >= ROWS) {
              return true;
            }
            // Check top bound (only if boardY is valid and occupied)
            if (boardY >= 0 && grid[boardY] && grid[boardY][boardX] !== null) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [grid]
  );

  // Lock current piece to board, scan for completed lines
  const lockPiece = useCallback(() => {
    if (!currentPiece) return;

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      
      // Merge piece to grid
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
          if (currentPiece.shape[r][c]) {
            const boardY = currentPiece.y + r;
            const boardX = currentPiece.x + c;
            if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
              newGrid[boardY][boardX] = currentPiece.type;
            }
          }
        }
      }

      // Check lines
      let linesCleared = 0;
      const filteredGrid = newGrid.filter((row) => {
        const isRowFull = row.every((cell) => cell !== null);
        if (isRowFull) linesCleared++;
        return !isRowFull;
      });

      // Insert empty rows on top
      while (filteredGrid.length < ROWS) {
        filteredGrid.unshift(Array(COLS).fill(null));
      }

      if (linesCleared > 0) {
        playSound("clear");
        setLines((l) => {
          const nextLines = l + linesCleared;
          // Level up every 5 lines
          setLevel(Math.floor(nextLines / 5) + 1);
          return nextLines;
        });

        // Add scoring with original retro weights
        const scoreMultipliers = [0, 40, 100, 300, 1200];
        setScore((s) => {
          const addition = (scoreMultipliers[linesCleared] || 0) * level;
          const nextScore = s + addition;
          if (nextScore > highScore) {
            setHighScore(nextScore);
            try {
              localStorage.setItem("tetris_high_score", String(nextScore));
            } catch {}
          }
          return nextScore;
        });
      } else {
        playSound("drop");
      }

      // Spawn next piece
      setTimeout(() => {
        spawnPiece(nextPieceType);
      }, 0);

      return filteredGrid;
    });

    setCurrentPiece(null);
  }, [currentPiece, nextPieceType, level, highScore, playSound, spawnPiece]);

  // Movement operations
  const moveLeft = useCallback(() => {
    if (isPaused || gameOver || !currentPiece) return;
    if (!checkCollision(currentPiece.shape, currentPiece.x - 1, currentPiece.y)) {
      setCurrentPiece((p) => p ? { ...p, x: p.x - 1 } : null);
      playSound("move");
    }
  }, [currentPiece, isPaused, gameOver, checkCollision, playSound]);

  const moveRight = useCallback(() => {
    if (isPaused || gameOver || !currentPiece) return;
    if (!checkCollision(currentPiece.shape, currentPiece.x + 1, currentPiece.y)) {
      setCurrentPiece((p) => p ? { ...p, x: p.x + 1 } : null);
      playSound("move");
    }
  }, [currentPiece, isPaused, gameOver, checkCollision, playSound]);

  const moveDown = useCallback(() => {
    if (isPaused || gameOver || !currentPiece) return;
    if (!checkCollision(currentPiece.shape, currentPiece.x, currentPiece.y + 1)) {
      setCurrentPiece((p) => p ? { ...p, y: p.y + 1 } : null);
    } else {
      lockPiece();
    }
  }, [currentPiece, isPaused, gameOver, checkCollision, lockPiece]);

  const rotatePiece = useCallback(() => {
    if (isPaused || gameOver || !currentPiece) return;
    
    // Matrix rotation (90 degrees clockwise)
    const n = currentPiece.shape.length;
    const m = currentPiece.shape[0].length;
    const rotated = Array(m).fill(null).map(() => Array(n).fill(0));

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        rotated[c][n - 1 - r] = currentPiece.shape[r][c];
      }
    }

    // Try normal rotation, if colliding, try side kicks (move left or right up to 2 cells to fit)
    const kicks = [0, -1, 1, -2, 2];
    let rotatedSuccess = false;

    for (const kick of kicks) {
      if (!checkCollision(rotated, currentPiece.x + kick, currentPiece.y)) {
        setCurrentPiece((p) => p ? { ...p, shape: rotated, x: p.x + kick } : null);
        playSound("rotate");
        rotatedSuccess = true;
        break;
      }
    }
  }, [currentPiece, isPaused, gameOver, checkCollision, playSound]);

  const hardDrop = useCallback(() => {
    if (isPaused || gameOver || !currentPiece) return;
    let currentY = currentPiece.y;
    while (!checkCollision(currentPiece.shape, currentPiece.x, currentY + 1)) {
      currentY++;
    }
    
    setCurrentPiece((p) => {
      if (!p) return null;
      const updated = { ...p, y: currentY };
      // Perform immediate lock
      setTimeout(() => {
        lockPiece();
      }, 0);
      return updated;
    });
  }, [currentPiece, isPaused, gameOver, checkCollision, lockPiece]);

  // Hook Keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault(); // Stop scrolling in page iframe
      }

      if (gameOver) return;

      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          moveLeft();
          break;
        case "ArrowRight":
        case "KeyD":
          moveRight();
          break;
        case "ArrowDown":
        case "KeyS":
          moveDown();
          break;
        case "ArrowUp":
        case "KeyW":
          rotatePiece();
          break;
        case "Space":
          hardDrop();
          break;
        case "KeyP":
          setIsPaused((p) => !p);
          break;
        case "KeyR":
          startNewGame();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveLeft, moveRight, moveDown, rotatePiece, hardDrop, startNewGame, gameOver]);

  // Timing core game tick loop
  const getSpeed = () => {
    // Speed increases as levels go up
    return Math.max(100, 800 - (level - 1) * 80);
  };

  const gameLoop = useCallback((timestamp: number) => {
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = timestamp;
    }

    const elapsed = timestamp - lastUpdateTimeRef.current;
    if (elapsed > getSpeed()) {
      moveDown();
      lastUpdateTimeRef.current = timestamp;
    }

    if (!isPaused && !gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  }, [isPaused, gameOver, level, moveDown]);

  useEffect(() => {
    if (!isPaused && !gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPaused, gameOver, gameLoop]);

  // Pre-spawn first piece if game starts
  useEffect(() => {
    if (!currentPiece && !gameOver) {
      const initialType = getRandomPieceType();
      const nextType = getRandomPieceType();
      setNextPieceType(nextType);
      setCurrentPiece({
        shape: SHAPES[initialType],
        type: initialType,
        x: Math.floor((COLS - SHAPES[initialType][0].length) / 2),
        y: 0,
      });
    }
  }, [currentPiece, gameOver]);

  return (
    <div className="w-full h-full bg-[#0a0a0c] text-white flex flex-col md:flex-row p-3 sm:p-4 select-none relative overflow-y-auto items-center md:items-stretch justify-start md:justify-center gap-4">
      {/* Sound Controller */}
      <button 
        onClick={() => setSoundEnabled((prev) => !prev)}
        className="absolute top-4 right-4 bg-neutral-900 border border-white/10 hover:border-white/25 text-neutral-400 hover:text-white p-2.5 rounded-xl z-50 transition-all cursor-pointer"
        title={soundEnabled ? "Mute sounds" : "Enable retro sounds"}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {/* LEFT: Game Screen */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[380px] max-h-[580px] shrink-0">
        {/* Retro Game Title / Frame Header */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Gamepad2 className="w-5 h-5 text-purple-400 animate-pulse" />
          <h1 className="font-mono font-extrabold text-sm tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            TETRIS ARCADE
          </h1>
        </div>

        {/* Playable Matrix Frame */}
        <div className="relative bg-[#060608] border-2 border-purple-500/30 rounded-xl p-1 shadow-lg shadow-purple-950/20 w-[170px] xs:w-[190px] sm:w-[215px] md:w-[240px] aspect-[10/20] flex flex-wrap">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="w-full h-[5%] flex">
              {row.map((cell, cIdx) => {
                // Check if the cell is part of the falling block
                let blockType: PieceType | null = cell;
                if (currentPiece) {
                  const relativeY = rIdx - currentPiece.y;
                  const relativeX = cIdx - currentPiece.x;
                  if (
                    relativeY >= 0 &&
                    relativeY < currentPiece.shape.length &&
                    relativeX >= 0 &&
                    relativeX < currentPiece.shape[relativeY].length
                  ) {
                    if (currentPiece.shape[relativeY][relativeX]) {
                      blockType = currentPiece.type;
                    }
                  }
                }

                return (
                  <div
                    key={cIdx}
                    className={`flex-1 aspect-square border-[0.5px] border-neutral-900/40 relative rounded-[2px] transition-all duration-75 ${
                      blockType
                        ? `${COLORS[blockType]} border-t-[1.5px] border-l-[1.5px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]`
                        : "bg-neutral-950/20"
                    }`}
                  >
                    {!blockType && (
                      <div className="absolute inset-0.5 rounded-[1px] bg-neutral-950/40 border-[0.5px] border-neutral-900/10" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Pause or Start Overlay */}
          {(isPaused || gameOver) && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center rounded-lg z-20">
              {gameOver ? (
                <>
                  <span className="text-rose-500 font-mono text-xl font-black tracking-widest uppercase mb-1 drop-shadow-md">
                    GAME OVER
                  </span>
                  <p className="text-neutral-400 text-[11px] mb-4 font-mono">
                    Score: {score} | level {level}
                  </p>
                  <button
                    onClick={startNewGame}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 active:scale-95 text-white font-mono font-bold text-xs uppercase px-4 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-pink-500/20 border border-white/15"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retry
                  </button>
                </>
              ) : (
                <>
                  <span className="text-purple-400 font-mono text-sm font-black tracking-widest uppercase mb-1 animate-pulse">
                    COIN INSERTED
                  </span>
                  <p className="text-neutral-400 text-[10px] mb-4 font-mono max-w-[160px] mx-auto">
                    Press Play or Space to launch retro blocks!
                  </p>
                  <button
                    onClick={() => {
                      if (gameOver) {
                        startNewGame();
                      } else {
                        setIsPaused(false);
                      }
                    }}
                    className="flex items-center gap-1.5 bg-purple-500 hover:bg-purple-400 active:scale-95 text-white font-mono font-bold text-xs uppercase px-5 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-purple-500/30 border border-white/15"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Play App
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Game Info Panel & Controls */}
      <div className="w-full md:w-52 shrink-0 flex flex-col justify-between mt-2 md:mt-1.5 md:pl-3 gap-3 md:gap-4 max-w-[340px] md:max-w-none">
        {/* Panel Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-2.5">
          {/* Scoring panel */}
          <div className="bg-neutral-900/50 border border-white/5 rounded-xl md:rounded-2xl p-2.5 md:p-3.5 flex flex-col relative overflow-hidden">
            <span className="text-[9px] md:text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
              SCORE
            </span>
            <span className="text-sm md:text-lg font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mt-0.5 md:mt-1">
              {score.toLocaleString()}
            </span>
            {highScore > 0 && (
              <span className="hidden md:inline text-[9px] font-mono text-neutral-400 mt-1 opacity-75">
                Record: {highScore.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stage Statistics */}
          <div className="bg-neutral-900/50 border border-white/5 rounded-xl md:rounded-2xl p-2.5 md:p-3.5 grid grid-cols-2 md:grid-cols-1 gap-1.5 md:gap-2.5">
            <div>
              <span className="text-[9px] md:text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
                LEVEL
              </span>
              <span className="text-xs md:text-sm font-mono font-bold text-neutral-200 block mt-0.5">
                {level}
              </span>
            </div>
            <div>
              <span className="text-[9px] md:text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
                LINES
              </span>
              <span className="text-xs md:text-sm font-mono font-bold text-neutral-200 block mt-0.5">
                {lines}
              </span>
            </div>
          </div>

          {/* Next Queue Panel */}
          <div className="col-span-2 md:col-span-1 bg-neutral-900/50 border border-white/5 rounded-xl md:rounded-2xl p-2.5 md:p-3.5 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2">
            <span className="text-[9px] md:text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest md:self-start mb-0 md:mb-2.5">
              NEXT QUEUE
            </span>
            <div className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center bg-[#070709] border border-white/5 rounded-lg relative overflow-hidden">
              {/* Render small shape representation */}
              <div className="flex flex-col gap-[1px] scale-90 md:scale-100">
                {SHAPES[nextPieceType].map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-[1px] justify-center">
                    {row.map((cell, cIdx) => (
                      <div
                        key={cIdx}
                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-[1px] ${
                          cell ? COLORS[nextPieceType] : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Controller Pad (Interactive On Screen) */}
        <div className="bg-neutral-950/40 border border-white/5 rounded-xl md:rounded-2xl p-2.5 md:p-3 flex flex-col gap-2 md:gap-2.5 mt-1 md:mt-2">
          <div className="flex items-center justify-between border-b border-white/5 pb-1 md:pb-1.5">
            <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
              CONTROLLERS
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (gameOver) {
                    startNewGame();
                  } else {
                    setIsPaused((p) => !p);
                  }
                }}
                className="text-[9px] font-mono font-bold text-purple-400 bg-purple-950/20 hover:bg-purple-950/40 px-2 py-0.5 md:py-1 rounded cursor-pointer border border-purple-500/10 active:scale-95"
              >
                {gameOver ? "RESTART" : isPaused ? "RESUME" : "PAUSE"}
              </button>
            </div>
          </div>

          {/* Direction Controls D-PAD */}
          <div className="flex flex-col items-center gap-1 py-0.5 md:py-1 select-none">
            {/* Rotate Row */}
            <button
              onClick={rotatePiece}
              className="w-9 h-9 md:w-11 md:h-11 bg-neutral-900 hover:bg-neutral-850 active:bg-neutral-800 text-neutral-300 active:scale-90 flex items-center justify-center rounded-xl border border-white/10 shadow-sm cursor-pointer"
              title="Rotate Shape"
            >
              <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
            </button>

            {/* Side-by-Side Row */}
            <div className="flex gap-2.5 md:gap-3.5">
              <button
                onClick={moveLeft}
                className="w-9 h-9 md:w-11 md:h-11 bg-neutral-900 hover:bg-neutral-850 active:bg-neutral-800 text-neutral-300 active:scale-90 flex items-center justify-center rounded-xl border border-white/10 shadow-sm cursor-pointer"
                title="Left"
              >
                <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
              
              <button
                onClick={hardDrop}
                className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-tr from-indigo-900 to-purple-950 hover:opacity-90 active:scale-90 text-yellow-400 flex items-center justify-center rounded-xl border border-purple-500/20 shadow-md shadow-indigo-950/40 cursor-pointer"
                title="Hard Drop (Instant)"
              >
                <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400 animate-pulse" />
              </button>

              <button
                onClick={moveRight}
                className="w-9 h-9 md:w-11 md:h-11 bg-neutral-900 hover:bg-neutral-850 active:bg-neutral-800 text-neutral-300 active:scale-90 flex items-center justify-center rounded-xl border border-white/10 shadow-sm cursor-pointer"
                title="Right"
              >
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>

            {/* Soft Drop Row */}
            <button
              onClick={moveDown}
              className="w-9 h-9 md:w-11 md:h-11 bg-neutral-900 hover:bg-neutral-850 active:bg-neutral-800 text-neutral-300 active:scale-90 flex items-center justify-center rounded-xl border border-white/10 shadow-sm cursor-pointer"
              title="Soft Drop"
            >
              <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          {/* Keyboard tip */}
          <span className="hidden md:block text-[8.5px] font-mono text-center text-neutral-500 tracking-normal leading-tight">
            Tip: Press [Space] to Hard Drop, [Arrow Keys] or [WASD] to move & rotate.
          </span>
        </div>
      </div>
    </div>
  );
}
