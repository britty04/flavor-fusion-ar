
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const PlatingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    fabricCanvas.on("object:moving", (e) => {
      if (!e.target) return;
      const obj = e.target;
      obj.opacity = 0.5;
    });

    fabricCanvas.on("object:modified", (e) => {
      if (!e.target) return;
      const obj = e.target;
      obj.opacity = 1;
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const saveDesign = () => {
    if (!canvas) return;
    const json = JSON.stringify(canvas.toJSON());
    localStorage.setItem("plating-design", json);
    toast("Design saved successfully!");
  };

  const loadDesign = () => {
    if (!canvas) return;
    const saved = localStorage.getItem("plating-design");
    if (saved) {
      canvas.loadFromJSON(saved, () => {
        canvas.renderAll();
        toast("Design loaded successfully!");
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button onClick={saveDesign}>Save Design</Button>
        <Button variant="outline" onClick={loadDesign}>Load Design</Button>
      </div>
      <div className="border rounded-lg overflow-hidden shadow-lg">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
