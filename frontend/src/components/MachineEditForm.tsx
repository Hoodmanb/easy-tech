// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Trash2, Plus } from "lucide-react";
// import { useCreateMachine, useUpdateMachine } from "@/hooks/useMachines";
// import { useToast } from "@/hooks/use-toast";
// import type { Machine } from "@/types";

// interface MachineEditFormProps {
//   machine?: Machine;
//   onSave: () => void;
//   onCancel: () => void;
// }

// const MachineEditForm = ({ machine, onSave, onCancel }: MachineEditFormProps) => {
//   const [formData, setFormData] = useState<Machine>(
//     machine || {
//       _id: "",
//       name: "",
//       description: "",
//       shortDescription: "",
//       powerSource: "Electric",
//       capacity: "",
//       specifications: {
//         dimensions: "",
//         weight: "",
//         materials: "",
//       },
//       media: {
//         images: [
//           {
//             url: "",
//             publicId: ""
//           }
//         ],
//         videos: [
//           {
//             url: "",
//             publicId: ""
//           }
//         ],
//       },
//       price: "Contact for pricing",
//       featured: false,
//       category: "Machining",
//     }
//   );

//   const [newSpecKey, setNewSpecKey] = useState("");
//   const [newSpecValue, setNewSpecValue] = useState("");

//   const { createMachine, isLoading: isCreating } = useCreateMachine();
//   const { updateMachine, isLoading: isUpdating } = useUpdateMachine();
//   const { toast } = useToast();

//   const isLoading = isCreating || isUpdating;

//   const handleInputChange = (field: string, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSpecificationChange = (key: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       specifications: {
//         ...prev.specifications,
//         [key]: value
//       }
//     }));
//   };

//   const addSpecification = () => {
//     if (newSpecKey && newSpecValue) {
//       handleSpecificationChange(newSpecKey, newSpecValue);
//       setNewSpecKey("");
//       setNewSpecValue("");
//     }
//   };

//   const removeSpecification = (key: string) => {
//     const { [key]: removed, ...rest } = formData.specifications;
//     setFormData(prev => ({
//       ...prev,
//       specifications: {
//         dimensions: rest.dimensions || "",
//         weight: rest.weight || "",
//         materials: rest.materials || "",
//         ...rest
//       }
//     }));
//   };

//   const addImage = () => {
//     setFormData(prev => ({
//       ...prev,
//       images: [...prev.images, "/placeholder.svg"]
//     }));
//   };

//   const removeImage = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   const addVideo = () => {
//     setFormData(prev => ({
//       ...prev,
//       videos: [...prev.videos, "placeholder-video.mp4"]
//     }));
//   };

//   const removeVideo = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       videos: prev.videos.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       if (machine) {
//         // Update existing machine
//         await updateMachine(formData);
//       } else {
//         // Create new machine
//         const machineToCreate = { ...formData };
//         if (!machineToCreate.id) {
//           machineToCreate.id = machineToCreate.name.toLowerCase().replace(/\s+/g, '-');
//         }
//         await createMachine(machineToCreate);
//       }
//       onSave();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: `Failed to ${machine ? 'update' : 'create'} machine`,
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>{machine ? "Edit Machine" : "Add New Machine"}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Basic Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name">Machine Name</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="category">Category</Label>
//                 <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Machining">Machining</SelectItem>
//                     <SelectItem value="Forming">Forming</SelectItem>
//                     <SelectItem value="Welding">Welding</SelectItem>
//                     <SelectItem value="Material Handling">Material Handling</SelectItem>
//                     <SelectItem value="Finishing">Finishing</SelectItem>
//                     <SelectItem value="Cutting">Cutting</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="shortDescription">Short Description</Label>
//               <Input
//                 id="shortDescription"
//                 value={formData.shortDescription}
//                 onChange={(e) => handleInputChange("shortDescription", e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="description">Full Description</Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={(e) => handleInputChange("description", e.target.value)}
//                 rows={4}
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <Label htmlFor="powerSource">Power Source</Label>
//                 <Select value={formData.powerSource} onValueChange={(value) => handleInputChange("powerSource", value)}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Electric">Electric</SelectItem>
//                     <SelectItem value="Fuel-powered">Fuel-powered</SelectItem>
//                     <SelectItem value="Manual">Manual</SelectItem>
//                     <SelectItem value="Hybrid">Hybrid</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label htmlFor="capacity">Capacity</Label>
//                 <Input
//                   id="capacity"
//                   value={formData.capacity}
//                   onChange={(e) => handleInputChange("capacity", e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="price">Price</Label>
//                 <Input
//                   id="price"
//                   value={formData.price || ""}
//                   onChange={(e) => handleInputChange("price", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <Switch
//                 id="featured"
//                 checked={formData.featured}
//                 onCheckedChange={(checked) => handleInputChange("featured", checked)}
//               />
//               <Label htmlFor="featured">Featured Machine</Label>
//             </div>

//             {/* Specifications */}
//             <div>
//               <Label className="text-lg font-semibold">Specifications</Label>
//               <div className="space-y-2 mt-2">
//                 {Object.entries(formData.specifications).map(([key, value]) => (
//                   <div key={key} className="flex gap-2 items-center">
//                     <Input
//                       value={key}
//                       className="w-1/3"
//                       disabled
//                     />
//                     <Input
//                       value={value}
//                       onChange={(e) => handleSpecificationChange(key, e.target.value)}
//                       className="flex-1"
//                     />
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => removeSpecification(key)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//                 <div className="flex gap-2 items-center">
//                   <Input
//                     placeholder="Specification name"
//                     value={newSpecKey}
//                     onChange={(e) => setNewSpecKey(e.target.value)}
//                     className="w-1/3"
//                   />
//                   <Input
//                     placeholder="Specification value"
//                     value={newSpecValue}
//                     onChange={(e) => setNewSpecValue(e.target.value)}
//                     className="flex-1"
//                   />
//                   <Button type="button" variant="accent" size="sm" onClick={addSpecification}>
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Images */}
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <Label className="text-lg font-semibold">Images</Label>
//                 <Button type="button" variant="accent" size="sm" onClick={addImage}>
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add Image
//                 </Button>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
//                       <span className="text-sm text-muted-foreground">IMG {index + 1}</span>
//                     </div>
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       className="absolute -top-2 -right-2"
//                       onClick={() => removeImage(index)}
//                     >
//                       <Trash2 className="h-3 w-3" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Videos */}
//             <div>
//               <div className="flex justify-between items-center mb-2">
//                 <Label className="text-lg font-semibold">Videos</Label>
//                 <Button type="button" variant="accent" size="sm" onClick={addVideo}>
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add Video
//                 </Button>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                 {formData.videos.map((video, index) => (
//                   <div key={index} className="relative">
//                     <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
//                       <span className="text-sm text-muted-foreground">Video {index + 1}</span>
//                     </div>
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       size="sm"
//                       className="absolute -top-2 -right-2"
//                       onClick={() => removeVideo(index)}
//                     >
//                       <Trash2 className="h-3 w-3" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex gap-4 pt-4">
//               <Button type="submit" variant="accent" className="flex-1" disabled={isLoading}>
//                 {isLoading ? "Saving..." : machine ? "Update Machine" : "Create Machine"}
//               </Button>
//               <Button type="button" variant="professional" onClick={onCancel} className="flex-1" disabled={isLoading}>
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default MachineEditForm;






import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus } from "lucide-react";
import { useCreateMachine, useUpdateMachine } from "@/hooks/query/index";
import { useToast } from "@/hooks/use-toast";
import type { Machine, Image, Video } from "@/types";

interface MachineEditFormProps {
  machine?: Machine;
  onSave: () => void;
  onCancel: () => void;
}

const MachineEditForm = ({ machine, onSave, onCancel }: MachineEditFormProps) => {
  const [formData, setFormData] = useState<Machine>(
    machine || {
      _id: "",
      name: "",
      description: "",
      shortDescription: "",
      powerSource: "Electric",
      capacity: "",
      specifications: {
        dimensions: "",
        weight: "",
        materials: "",
      },
      media: {
        images: [],
        videos: [],
      },
      price: "Contact for pricing",
      featured: false,
      category: "Machining",
    }
  );

  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");

  const { createMachine, isLoading: isCreating } = useCreateMachine();
  const { updateMachine, isLoading: isUpdating } = useUpdateMachine();
  const { toast } = useToast();

  const isLoading = isCreating || isUpdating;

  const handleInputChange = (field: keyof Machine, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }));
  };

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      handleSpecificationChange(newSpecKey, newSpecValue);
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const removeSpecification = (key: string) => {
    const { [key]: removed, ...rest } = formData.specifications;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        materials: rest.materials ?? '', // Ensure it's always defined
        ...rest,
      },
    }));
  };


  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        images: [...prev.media.images, { url: "", publicId: "" }],
      },
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        images: prev.media.images.filter((_, i) => i !== index),
      },
    }));
  };

  const addVideo = () => {
    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        videos: [...prev.media.videos, { url: "", publicId: "" }],
      },
    }));
  };

  const removeVideo = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        videos: prev.media.videos.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (machine) {
        await updateMachine(machine._id, formData);
      } else {
        const machineToCreate = { ...formData };
        await createMachine(machineToCreate);
      }
      onSave();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${machine ? "update" : "create"} machine`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{machine ? "Edit Machine" : "Add New Machine"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Machine Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Machining", "Forming", "Welding", "Material Handling", "Finishing", "Cutting"].map(
                      (cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            {/* Specs */}
            <div>
              <Label className="text-lg font-semibold">Specifications</Label>
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex gap-2 items-center">
                  <Input className="w-1/3" disabled value={key} />
                  <Input
                    value={value}
                    onChange={(e) => handleSpecificationChange(key, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSpecification(key)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Specification name"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  className="w-1/3"
                />
                <Input
                  placeholder="Specification value"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={addSpecification}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Media */}
            <div>
              <Label className="text-lg font-semibold">Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {formData.media.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        {img.url ? "Image" : "Placeholder"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2"
                      onClick={() => removeImage(idx)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" onClick={addImage} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>

            <div>
              <Label className="text-lg font-semibold">Videos</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {formData.media.videos.map((vid, idx) => (
                  <div key={idx} className="relative">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        {vid.url ? "Video" : "Placeholder"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2"
                      onClick={() => removeVideo(idx)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" onClick={addVideo} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Video
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="accent" className="flex-1" disabled={isLoading}>
                {isLoading ? "Saving..." : machine ? "Update Machine" : "Create Machine"}
              </Button>
              <Button type="button" variant="ghost" onClick={onCancel} className="flex-1" disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MachineEditForm;
