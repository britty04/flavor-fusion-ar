
interface PresetElementProps {
  type: string;
  url: string;
  title: string;
}

interface PresetElementsGridProps {
  elements: PresetElementProps[];
  onElementClick: (url: string) => void;
}

export const PresetElementsGrid = ({ elements, onElementClick }: PresetElementsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="col-span-full text-lg font-medium mb-2">Quick Add Elements</h3>
      {elements.map((element, index) => (
        <div
          key={index}
          onClick={() => onElementClick(element.url)}
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
  );
};
