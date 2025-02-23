import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { toast } from "sonner";
import { PlatingToolbar } from "./plating/PlatingToolbar";
import { PresetElementsGrid } from "./plating/PresetElementsGrid";
import { TutorialVideos } from "./plating/TutorialVideos";
import { PRESET_ELEMENTS, TUTORIAL_VIDEOS } from "../constants/platingPresets";

export const PlatingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedElement, setSelectedElement] = useState<fabric.Object | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    fabricCanvas.selection = true;

    fabricCanvas.on("object:moving", (e) => {
      if (!e.target) return;
      const obj = e.target;
      obj.opacity = 0.5;
    });

    fabricCanvas.on("object:modified", (e) => {
      if (!e.target) return;
      const obj = e.target;
      obj.opacity = 1;
      saveToHistory();
    });

    fabricCanvas.on("selection:created", (e) => {
      setSelectedElement(e.selected?.[0] || null);
    });

    fabricCanvas.on("selection:cleared", () => {
      setSelectedElement(null);
    });

    setCanvas(fabricCanvas);
    saveToHistory();

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const saveToHistory = () => {
    if (!canvas) return;
    const json = JSON.stringify(canvas.toJSON());
    setHistory(prev => [...prev.slice(0, historyIndex + 1), json]);
    setHistoryIndex(prev => prev + 1);
  };

  const undo = () => {
    if (!canvas || historyIndex <= 0) return;
    const previousState = history[historyIndex - 1];
    if (previousState) {
      canvas.loadFromJSON(previousState, () => {
        canvas.renderAll();
        setHistoryIndex(prev => prev - 1);
        toast("Undo successful");
      });
    }
  };

  const duplicateSelected = () => {
    if (!canvas || !selectedElement) return;
    selectedElement.clone((cloned: fabric.Object) => {
      cloned.set({
        left: selectedElement.left! + 20,
        top: selectedElement.top! + 20,
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
      saveToHistory();
      toast("Element duplicated");
    });
  };

  const changeElementColor = (color: string) => {
    if (!canvas || !selectedElement) return;
    selectedElement.set({
      fill: color
    });
    canvas.renderAll();
    saveToHistory();
    toast("Color changed");
  };

  const addImage = (url: string) => {
    if (!canvas) return;

    fabric.Image.fromURL(url, (img) => {
      const scale = Math.min(200 / img.width!, 200 / img.height!);
      img.set({
        left: (canvas.width! - img.width! * scale) / 2,
        top: (canvas.height! - img.height! * scale) / 2,
        opacity: 1
      });
      img.scale(scale);

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      toast("Element added to canvas");
    });
  };

  const addShape = (type: "circle" | "rectangle") => {
    if (!canvas) return;

    let shape;
    if (type === "circle") {
      shape = new fabric.Circle({
        radius: 50,
        fill: "#ffffff",
        stroke: "#000000",
        strokeWidth: 1,
        left: canvas.width! / 2 - 25,
        top: canvas.height! / 2 - 25
      });
    } else {
      shape = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "#ffffff",
        stroke: "#000000",
        strokeWidth: 1,
        left: canvas.width! / 2 - 50,
        top: canvas.height! / 2 - 50
      });
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
    toast("Shape added to canvas");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        addImage(event.target.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const deleteSelected = () => {
    if (!canvas || !selectedElement) return;
    canvas.remove(selectedElement);
    setSelectedElement(null);
    toast("Element deleted");
  };

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

  const downloadCanvas = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1
    });
    const link = document.createElement('a');
    link.download = 'plating-design.png';
    link.href = dataURL;
    link.click();
    toast("Design downloaded successfully!");
  };

  const handleDelete = () => {
    deleteSelected();
    saveToHistory();
  };

  return (
    <div className="space-y-6">
      <PlatingToolbar
        onSave={saveDesign}
        onLoad={loadDesign}
        onDownload={downloadCanvas}
        onAddCircle={() => { addShape("circle"); saveToHistory(); }}
        onAddRectangle={() => { addShape("rectangle"); saveToHistory(); }}
        onFileUpload={handleFileUpload}
        onDelete={handleDelete}
        onDuplicate={duplicateSelected}
        onUndo={undo}
        onChangeColor={changeElementColor}
        hasSelectedElement={!!selectedElement}
      />

      <PresetElementsGrid 
        elements={PRESET_ELEMENTS}
        onElementClick={(url) => { addImage(url); saveToHistory(); }}
      />

      <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>

      <TutorialVideos videos={TUTORIAL_VIDEOS} />

      <div className="text-sm text-muted-foreground">
        <p>Tip: Click and drag elements to move them. Use the corner handles to resize.</p>
      </div>
    </div>
  );
};
