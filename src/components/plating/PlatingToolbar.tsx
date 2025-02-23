
import { Button } from "../ui/button";
import { ImagePlus, Save, Upload, Download, Trash2, Shapes, RotateCcw, Copy, PaintBucket } from "lucide-react";

interface PlatingToolbarProps {
  onSave: () => void;
  onLoad: () => void;
  onDownload: () => void;
  onAddCircle: () => void;
  onAddRectangle: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onUndo: () => void;
  onChangeColor: (color: string) => void;
  hasSelectedElement: boolean;
}

export const PlatingToolbar = ({
  onSave,
  onLoad,
  onDownload,
  onAddCircle,
  onAddRectangle,
  onFileUpload,
  onDelete,
  onDuplicate,
  onUndo,
  onChangeColor,
  hasSelectedElement
}: PlatingToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm border">
      <Button onClick={onSave}>
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>
      <Button variant="outline" onClick={onLoad}>
        <Upload className="mr-2 h-4 w-4" />
        Load
      </Button>
      <Button variant="outline" onClick={onDownload}>
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button variant="outline" onClick={onAddCircle}>
        <Shapes className="mr-2 h-4 w-4" />
        Add Circle
      </Button>
      <Button variant="outline" onClick={onAddRectangle}>
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
          onChange={onFileUpload}
        />
      </label>
      {hasSelectedElement && (
        <>
          <Button variant="outline" onClick={onDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
          <input
            type="color"
            onChange={(e) => onChangeColor(e.target.value)}
            className="h-10 w-10 rounded-md cursor-pointer"
            title="Change Color"
          />
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </>
      )}
      <Button variant="outline" onClick={onUndo}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Undo
      </Button>
    </div>
  );
};
