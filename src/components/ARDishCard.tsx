
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface ARDishCardProps {
  title: string;
  description: string;
  image: string;
  technique: string;
}

export const ARDishCard = ({ title, description, image, technique }: ARDishCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative overflow-hidden group transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        <div className="absolute top-4 left-4">
          <Badge variant="default" className="bg-white/90 text-black hover:bg-white/80">
            {technique}
          </Badge>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="mt-4 text-sm font-medium underline-offset-4 hover:underline">
                View AR Experience
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to view the AR presentation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 particle-overlay" />
      </div>
    </Card>
  );
};
