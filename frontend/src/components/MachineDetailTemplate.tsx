import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ShareButton from "@/components/ShareButton";
import type { Machine } from "@/types/machine";

interface MachineDetailTemplateProps {
  machine: Machine;
  relatedMachines: Machine[];
}

const MachineDetailTemplate = ({ machine, relatedMachines }: MachineDetailTemplateProps) => {
  return (
    <div className="min-h-screen py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link to="/machines" className="hover:text-primary">Machines</Link></li>
            <li>/</li>
            <li className="text-foreground">{machine.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images & Videos Section */}
          <div>
            <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Machine Image Placeholder</span>
            </div>
            
            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {machine.images.map((image, index) => (
                <div key={`image-${index}`} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">IMG {index + 1}</span>
                </div>
              ))}
            </div>

            {/* Video Gallery */}
            {machine.videos.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Videos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {machine.videos.map((video, index) => (
                    <div key={`video-${index}`} className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Video {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Machine Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{machine.name}</h1>
                <Badge variant="secondary" className="mb-4">
                  {machine.category}
                </Badge>
                {machine.featured && (
                  <Badge className="ml-2 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              {machine.description}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{machine.powerSource}</p>
                    <p className="text-sm text-muted-foreground">Power Source</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{machine.capacity}</p>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact CTA */}
            <div className="space-y-4">
              <Button size="lg" variant="accent" className="w-full">
                Request Quote
              </Button>
              <Button size="lg" variant="professional" className="w-full" asChild>
                <Link to="/contact">Contact Sales Team</Link>
              </Button>
              <ShareButton machine={machine} size="lg" className="w-full" />
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Technical Specifications</h2>
          <Card>
            <CardHeader>
              <CardTitle>Detailed Specifications</CardTitle>
              <CardDescription>
                Complete technical details and specifications for the {machine.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(machine.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2">
                    <span className="font-medium text-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground mb-2">
                  Price: {machine.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  All prices include installation and basic training. 
                  Extended warranties and maintenance packages available.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Machines */}
        {relatedMachines.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Machines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedMachines.map((relatedMachine) => (
                <Card key={relatedMachine.id} className="hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardHeader>
                    <CardTitle className="text-lg">{relatedMachine.name}</CardTitle>
                    <CardDescription>{relatedMachine.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="industrial" size="sm" className="w-full" asChild>
                      <Link to={`/machines/${relatedMachine.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineDetailTemplate;