
import { ARDishCard } from "@/components/ARDishCard";
import { PlatingCanvas } from "@/components/PlatingCanvas";
import { TechniqueAnimation } from "@/components/TechniqueAnimation";

const spherificationSteps = [
  {
    title: "Prepare the Sodium Alginate Bath",
    description: "Mix sodium alginate with water to create a bath solution. Let it rest for 15 minutes to remove air bubbles."
  },
  {
    title: "Create the Flavor Mixture",
    description: "Combine your liquid flavor with calcium lactate. This will be the interior of your spheres."
  },
  {
    title: "Form the Spheres",
    description: "Using a spherification spoon, carefully drop the flavor mixture into the alginate bath."
  },
  {
    title: "Set and Rinse",
    description: "Allow spheres to set for 2 minutes, then remove and rinse in cold water."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <span className="inline-block mb-4 text-sm tracking-wider uppercase">Experience Culinary Innovation</span>
          <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
            Molecular Gastronomy
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "400ms" }}>
            Explore the intersection of science and cuisine through immersive AR experiences
          </p>
        </div>
      </section>

      {/* AR Dishes Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">Featured Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ARDishCard
              title="Levitating Spheres"
              description="Experience our signature spherification process in augmented reality"
              image="/placeholder.svg"
              technique="Spherification"
            />
            <ARDishCard
              title="Nitrogen Cloud"
              description="Watch as liquid nitrogen transforms simple ingredients"
              image="/placeholder.svg"
              technique="Cryocooking"
            />
            <ARDishCard
              title="Sonic Seasoning"
              description="Discover how sound enhances flavor perception"
              image="/placeholder.svg"
              technique="Sound Pairing"
            />
          </div>
        </div>
      </section>

      {/* Interactive Plating */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">Design Your Plate</h2>
          <PlatingCanvas />
        </div>
      </section>

      {/* Technique Animation */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-12 text-center">Master the Techniques</h2>
          <TechniqueAnimation technique="Basic Spherification" steps={spherificationSteps} />
        </div>
      </section>
    </div>
  );
};

export default Index;
