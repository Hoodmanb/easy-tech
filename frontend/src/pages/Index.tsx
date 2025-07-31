import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "../assets/hero-industrial.jpg";

const Index = () => {
  const services = [
    {
      title: "Machine Fabrication",
      description: "Custom industrial machines built to your exact specifications with precision engineering.",
      icon: "🏭"
    },
    {
      title: "Equipment Customization",
      description: "Modify and enhance existing machinery to optimize performance for your specific needs.",
      icon: "⚙️"
    },
    {
      title: "Maintenance & Repair",
      description: "Professional maintenance services to keep your equipment running at peak efficiency.",
      icon: "🔧"
    },
    {
      title: "Technical Support",
      description: "Expert technical support and consultation for all your industrial manufacturing needs.",
      icon: "📞"
    }
  ];

  const featuredMachines = [
    {
      id: "cnc-milling-machine",
      name: "CNC Milling Machine",
      description: "High-precision 5-axis CNC milling machine for complex manufacturing operations.",
      image: "/placeholder.svg"
    },
    {
      id: "industrial-lathe",
      name: "Industrial Lathe",
      description: "Heavy-duty lathe machine capable of handling large-scale turning operations.",
      image: "/placeholder.svg"
    },
    {
      id: "hydraulic-press",
      name: "Hydraulic Press",
      description: "Powerful hydraulic press for metal forming and fabrication processes.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Advanced Manufacturing Solutions
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-slide-up">
            Leading manufacturer of precision industrial machines and fabrication solutions
          </p>
          <div className="space-x-4 animate-slide-up">
            <Button size="xl" variant="accent" asChild>
              <Link to="/machines">View Our Machines</Link>
            </Button>
            <Button size="xl" variant="professional" asChild>
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-section bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive industrial solutions from design to delivery, maintenance, and support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Machines Section */}
      <section className="py-section bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Machines
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our most popular industrial machines designed for efficiency and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMachines.map((machine) => (
              <Card key={machine.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="aspect-video bg-muted rounded-t-lg"></div>
                <CardHeader>
                  <CardTitle className="text-xl">{machine.name}</CardTitle>
                  <CardDescription>{machine.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="industrial" className="w-full" asChild>
                    <Link to={`/machines/${machine.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="accent" asChild>
              <Link to="/machines">View All Machines</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Enhance Your Manufacturing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss your industrial machinery needs and get a custom quote
          </p>
          <div className="space-x-4">
            <Button size="xl" variant="accent" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button size="xl" variant="professional" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;