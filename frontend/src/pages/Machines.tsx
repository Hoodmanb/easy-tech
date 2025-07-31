import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { machines } from "@/data/machines";
import ShareButton from "@/components/ShareButton";
import type { Machine } from "@/types/machine";

const Machines = () => {
  const [machinesList] = useState<Machine[]>(Object.values(machines));

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const categories = ["All", "Machining", "Forming", "Welding", "Material Handling", "Finishing", "Cutting"];
  
  // Filter machines by category and search term
  const filteredMachines = machinesList.filter(machine => {
    const matchesCategory = selectedCategory === "All" || machine.category === selectedCategory;
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Machines Catalog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of industrial machines designed for precision, 
            reliability, and efficiency in your manufacturing operations
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="space-y-6 mb-12">
          {/* Search Input */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search machines by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "industrial" : "professional"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMachines.map((machine) => (
            <Card key={machine.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="aspect-video bg-muted rounded-t-lg relative">
                {machine.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{machine.name}</CardTitle>
                    <Badge variant="secondary" className="mb-2">
                      {machine.category}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{machine.shortDescription}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Power:</span>
                    <p className="text-muted-foreground">{machine.powerSource}</p>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Capacity:</span>
                    <p className="text-muted-foreground">{machine.capacity}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="industrial" className="flex-1" asChild>
                    <Link to={`/machines/${machine.id}`}>View Details</Link>
                  </Button>
                  <ShareButton machine={machine} size="sm" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results message */}
        {filteredMachines.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {searchTerm ? "No machines found matching your search" : "No machines found in this category"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? `Try adjusting your search term "${searchTerm}" or clear the search to see all machines`
                : "Try selecting a different category or view all machines"
              }
            </p>
            <div className="space-x-2">
              {searchTerm && (
                <Button variant="accent" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              )}
              <Button variant="professional" onClick={() => setSelectedCategory("All")}>
                View All Machines
              </Button>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-gradient-card rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            We specialize in custom machine fabrication. Contact us to discuss your specific requirements.
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="accent" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="professional" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;