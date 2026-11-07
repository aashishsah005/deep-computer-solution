import storefrontImage from "../assets/storefront.jpg";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <h1 className="text-3xl font-semibold mb-8">About Deep Computer And Solution</h1>
      
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <p className="text-muted leading-relaxed">
            Deep Computer And Solution is a Biratnagar-based computer shop on Rangeli
            Rd, offering sales, repair, and refurbished systems under one roof. We
            stock accessories, laptops, desktops, motherboards and networking gear —
            new and carefully tested refurbished — and repair laptops, PCs and
            printers with a clear estimate before any work begins.
          </p>
          <p className="text-muted leading-relaxed">
            We are dedicated to providing the highest quality repairs, prompt service,
            and honest estimates. Whether you need a simple RAM upgrade, motherboard chip-level repair,
            or a brand new office/gaming PC setup, we've got you covered.
          </p>
        </div>
        
        <div className="rounded-lg overflow-hidden border border-border aspect-[4/3]">
          <img 
            src={storefrontImage} 
            alt="Deep Computer And Solution Storefront" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

