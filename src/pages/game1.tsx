import { FC, useMemo, useState, useEffect } from "react";
import Canvas from "~/components/canvas";
import { Button } from "~/components/ui/button";

const Game: FC = ({}) => {
  const [pumps, setPumps] = useState<number>(0);
  const [popAfter, setPopAfter] = useState<number>(0);
  const [curentScore, setCurrentScore] = useState<number>(0);
  const [baloons, setBaloons] = useState<number>(39);
  const [currentBaloons, setCurrentBaloons] = useState<number>(-1);

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    resetGame();
  }, []);

  const handleContextReady = useMemo(() => {
    return (ctx: CanvasRenderingContext2D) => {
      // start your game here and pass in your canvas context
      // draw a circle at mouse position
      const canvas = ctx.canvas;
      canvas.addEventListener("mousemove", (evt) => {
        const mousePos = getMousePos(canvas, evt);
        const message = `Mouse position: ${mousePos.x},${mousePos.y}`;
        console.log(message);

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.beginPath();
        // ctx.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI, true);
        // ctx.fillStyle = "green";
        // ctx.fill();
      });

      // draw a circle relative to thhe number of pumps
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(300, 300, 20 + pumps * 5, 0, 2 * Math.PI, true);
      ctx.fillStyle = "#FEB5D8";
      // add a stroke
      ctx.fill();
    };
  }, [pumps]);

  const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  const resetGame = () => {
    setPumps(0);
    setCurrentScore(0);
    setPopAfter(Math.floor(Math.random() * 10) + 1);
    setCurrentBaloons(currentBaloons + 1);
  };

  return (
    <main className="mt-10 flex flex-col items-center justify-center">
      {/* <div>Game</div> */}

      <div className="relative border-4">
        <Canvas onContextReady={handleContextReady} width={600} height={600} />

        {/* Score */}
        <div className="pointer-events-none absolute left-5 top-5">
          <div className="text-2xl font-bold text-[#BBBEBB]">Score</div>
          <div className="text-5xl font-bold text-[#BBBEBB]">
            {score.toFixed(2)}
          </div>
        </div>

        {/* Current money */}
        <div className="pointer-events-none absolute left-[50%] top-5 -translate-x-1/2 transform">
          <div className="text-5xl font-bold text-[#BBBEBB]">{`$${curentScore.toFixed(
            2
          )}`}</div>
        </div>

        {/* Balloons Left */}
        <div className="pointer-events-none absolute right-5 top-5">
          <div className="text-2xl font-bold text-[#BBBEBB]">Balloons Left</div>
          <div className="text-5xl font-bold text-[#BBBEBB]">
            {`${currentBaloons} / ${baloons}`}
          </div>
        </div>

        {/* Pump and Collect */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-4">
          <Button
            onClick={() => {
              setPumps(pumps + 1);
              setCurrentScore(curentScore + 0.1);

              if (pumps === popAfter) {
                alert("You popped the balloon!");
                resetGame();
              }
            }}
          >
            Pump
          </Button>
          <Button
            className="text-blac bg-green-400 hover:bg-green-500"
            onClick={() => {
              setScore(score + curentScore);
              resetGame();
            }}
          >
            Collect
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Game;