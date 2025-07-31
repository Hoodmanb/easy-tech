import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import type { Machine } from "@/types/index";


interface MachineDataFormProps {
  machine?: Machine;
  onSave: (data: Machine) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const MachineDataForm = ({ machine, onSave, onCancel, isLoading }: MachineDataFormProps) => {
  const [specifications, setSpecifications] = useState(
    machine?.specifications || {
      dimensions: "",
      weight: "",
      materials: "",
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Machine>({
    defaultValues: {
      name: machine?.name || "",
      description: machine?.description || "",
      shortDescription: machine?.shortDescription || "",
      powerSource: machine?.powerSource || "Electric",
      capacity: machine?.capacity || "",
      specifications: machine?.specifications || {
        dimensions: "",
        weight: "",
        materials: "",
      },
      price: machine?.price || "",
      featured: machine?.featured || false,
      category: machine?.category || "",
      media: {
        images: [
          {
            url: "",
            publicId: ""
          }
        ],
        videos: [
          {
            url: "",
            publicId: ""
          }
        ],
      }
    },
  });

  const watchedFeatured = watch("featured");

  const addSpecification = () => {
    const key = prompt("Enter specification name:");
    if (key && key.trim()) {
      setSpecifications(prev => ({
        ...prev,
        [key.trim()]: "",
      }));
    }
  };

  const updateSpecification = (key: string, value: string) => {
    setSpecifications(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const removeSpecification = (key: string) => {
    if (["dimensions", "weight", "materials"].includes(key)) {
      // Don't allow removal of core specifications
      return;
    }

    setSpecifications(prev => {
      const newSpecs = { ...prev };
      delete newSpecs[key];
      return newSpecs;
    });
  };

  const onSubmit = (data: Machine) => {
    onSave({
      ...data,
      specifications,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {machine ? "Edit Machine Data" : "Add New Machine - Data"}
          </CardTitle>
          <CardDescription>
            Manage machine information, specifications, and metadata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Machine Name *</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Machine name is required" })}
                    placeholder="Enter machine name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setValue("category", value)} defaultValue={machine?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Machining">Machining</SelectItem>
                      <SelectItem value="Forming">Forming</SelectItem>
                      <SelectItem value="Welding">Welding</SelectItem>
                      <SelectItem value="Material Handling">Material Handling</SelectItem>
                      <SelectItem value="Finishing">Finishing</SelectItem>
                      <SelectItem value="Cutting">Cutting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Input
                  id="shortDescription"
                  {...register("shortDescription", { required: "Short description is required" })}
                  placeholder="Brief description for listings"
                />
                {errors.shortDescription && (
                  <p className="text-sm text-destructive">{errors.shortDescription.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                  placeholder="Detailed machine description"
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Technical Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Technical Specifications</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="powerSource">Power Source *</Label>
                  <Select onValueChange={(value) => setValue("powerSource", value as any)} defaultValue={machine?.powerSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select power source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Fuel-powered">Fuel-powered</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Input
                    id="capacity"
                    {...register("capacity", { required: "Capacity is required" })}
                    placeholder="e.g., 50 tons, 1000 kg/hr"
                  />
                  {errors.capacity && (
                    <p className="text-sm text-destructive">{errors.capacity.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Detailed Specifications</Label>
                  <Button type="button" variant="secondary" size="sm" onClick={addSpecification}>
                    Add Specification
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex gap-2 items-end">
                      <div className="flex-1 space-y-2">
                        <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                        <Input
                          value={value}
                          onChange={(e) => updateSpecification(key, e.target.value)}
                          placeholder={`Enter ${key}`}
                        />
                      </div>
                      {!["dimensions", "weight", "materials"].includes(key) && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSpecification(key)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Pricing and Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pricing and Features</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    {...register("price")}
                    placeholder="e.g., $150,000 - $200,000"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={watchedFeatured}
                    onCheckedChange={(checked) => setValue("featured", checked)}
                  />
                  <Label htmlFor="featured">Featured Machine</Label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Data"}
              </Button>
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MachineDataForm;