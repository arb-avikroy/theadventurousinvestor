import { useEffect, useRef } from "react";

interface Path {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  angle: number;
}

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const paths: Path[] = [];
    const numPaths = 15;

    for (let i = 0; i < numPaths; i++) {
      paths.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        length: Math.random() * 100 + 50,
        angle: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      paths.forEach((path) => {
        path.x += path.vx;
        path.y += path.vy;
        path.angle += 0.01;

        if (path.x < 0 || path.x > canvas.width) path.vx *= -1;
        if (path.y < 0 || path.y > canvas.height) path.vy *= -1;

        const endX = path.x + Math.cos(path.angle) * path.length;
        const endY = path.y + Math.sin(path.angle) * path.length;

        ctx.beginPath();
        ctx.moveTo(path.x, path.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "rgba(212, 165, 116, 0.15)";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 10]);
        ctx.stroke();

        // Draw dot at the end
        ctx.beginPath();
        ctx.arc(endX, endY, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 165, 116, 0.3)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
};
