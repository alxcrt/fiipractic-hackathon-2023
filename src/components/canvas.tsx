import { FC, useEffect, useRef } from "react";

interface CanvasProps {
  onContextReady: (ctx: CanvasRenderingContext2D) => void;
  width: number;
  height: number;
}

const Canvas: FC<CanvasProps> = ({ width, height, onContextReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    canvasRef.current?.focus();
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      onContextReady(ctx);
    }
  }, [onContextReady]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        tabIndex={1000}
      ></canvas>
    </div>
  );
};

export default Canvas;
