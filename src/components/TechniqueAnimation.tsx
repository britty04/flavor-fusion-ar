
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

interface Step {
  title: string;
  description: string;
}

interface TechniqueAnimationProps {
  technique: string;
  steps: Step[];
}

export const TechniqueAnimation = ({ technique, steps }: TechniqueAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display text-2xl mb-6">{technique}</h2>
      <div className="relative min-h-[200px] mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <h3 className="font-medium mb-2">{steps[currentStep].title}</h3>
            <p className="text-muted-foreground">{steps[currentStep].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
        <Button
          onClick={() => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
