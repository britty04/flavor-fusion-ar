
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { ImagePlus, Save, Upload, Download, Trash2, Undo, Shapes } from "lucide-react";

const PRESET_ELEMENTS = [
  {
    type: "garnish",
    url: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=200&h=200&fit=crop&auto=format",
    title: "Micro Herbs"
  },
  {
    type: "garnish",
    url: "https://images.unsplash.com/photo-1587324438673-56c78a866b15?w=200&h=200&fit=crop&auto=format",
    title: "Edible Flowers"
  },
  {
    type: "garnish",
    url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop&auto=format",
    title: "Fresh Greens"
  },
  {
    type: "garnish",
    url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=200&h=200&fit=crop&auto=format",
    title: "Citrus Garnish"
  },
  {
    type: "plate",
    url: "https://images.unsplash.com/photo-1615278166719-537516ae2263?w=400&h=400&fit=crop&auto=format",
    title: "White Plate"
  },
  {
    type: "plate",
    url: "https://images.unsplash.com/photo-1615278166728-77257d10e85f?w=400&h=400&fit=crop&auto=format",
    title: "Black Plate"
  },
  {
    type: "plate",
    url: "https://images.unsplash.com/photo-1615278165715-b0fb8447e5c4?w=400&h=400&fit=crop&auto=format",
    title: "Gray Plate"
  },
  {
    type: "sauce",
    url: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200&h=200&fit=crop&auto=format",
    title: "Red Sauce"
  }
];

const TUTORIAL_VIDEOS = [
  {
    title: "Basic Plating Techniques",
    url: "https://www.youtube.com/embed/mxqgUmrRUDE",
    description: "Learn the fundamentals of professional plating"
  },
  {
    title: "Advanced Garnishing",
    url: "https://www.youtube.com/embed/fnvCuxhdHhk",
    description: "Master the art of garnishing"
  }
];

export const PlatingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedElement, setSelectedElement] = useState<fabric.Object | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    // Enable object selection
    fabricCanvas.selection = true;

    // Add event listeners
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

    fabricCanvas.on("selection:created", (e) => {
      setSelectedElement(e.selected?.[0] || null);
    });

    fabricCanvas.on("selection:cleared", () => {
      setSelectedElement(null);
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

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

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm border">
        <Button onClick={saveDesign}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" onClick={loadDesign}>
          <Upload className="mr-2 h-4 w-4" />
          Load
        </Button>
        <Button variant="outline" onClick={downloadCanvas}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" onClick={() => addShape("circle")}>
          <Shapes className="mr-2 h-4 w-4" />
          Add Circle
        </Button>
        <Button variant="outline" onClick={() => addShape("rectangle")}>
          <Shapes className="mr-2 h-4 w-4" />
          Add Rectangle
        </Button>
        <label className="cursor-pointer">
          <Button variant="outline" asChild>
            <span>
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload Image
            </span>
          </Button>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </label>
        {selectedElement && (
          <Button variant="destructive" onClick={deleteSelected}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        )}
      </div>

      {/* Preset Elements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="col-span-full text-lg font-medium mb-2">Quick Add Elements</h3>
        {PRESET_ELEMENTS.map((element, index) => (
          <div
            key={index}
            onClick={() => addImage(element.url)}
            className="cursor-pointer group relative aspect-square rounded-lg overflow-hidden border hover:border-primary transition-colors"
          >
            <img
              src={element.url}
              alt={element.title}
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">{element.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>

      {/* Tutorial Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="col-span-full text-lg font-medium mb-2">Learn from the Experts</h3>
        {TUTORIAL_VIDEOS.map((video, index) => (
          <div key={index} className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <iframe
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <h4 className="font-medium">{video.title}</h4>
            <p className="text-sm text-muted-foreground">{video.description}</p>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-sm text-muted-foreground">
        <p>Tip: Click and drag elements to move them. Use the corner handles to resize.</p>
      </div>
    </div>
  );
};
