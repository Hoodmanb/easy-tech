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
import { Machine, Image, Video, machineDefaultData } from "@/types";

interface MachineEditFormProps {
  machine?: Machine;
  onSave: () => void;
  onCancel: () => void;
}

const MachineEditForm = ({ machine, onSave, onCancel }: MachineEditFormProps) => {
  const [formData, setFormData] = useState<Machine>(
    machine || machineDefaultData
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

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        images: prev.media.images.filter((_, i) => i !== index),
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

  const addImage = (files: FileList | null) => {
    if (!files) return;

    const uploaded = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      publicId: file.name, // Placeholder — real one comes from Cloudinary
    }));

    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        images: [...(prev.media.images || []), ...uploaded],
      },
    }));
  };


  const addVideo = (files: FileList | null) => {
    if (!files) return;

    const uploaded = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      publicId: file.name, // Placeholder — real one comes from Cloudinary
    }));

    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        videos: [...(prev.media.videos || []), ...uploaded],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.media.images.length === 0) {
      toast({
        title: "Missing image",
        description: "At least one image is required",
        variant: "destructive",
      });
      return;
    }

    try {
      if (machine) {
        await updateMachine(machine._id, formData);
      } else {
        const machineToCreate = { ...formData };
        const res = await createMachine(machineToCreate);
        if (res === "created successfully") {
          setFormData(machineDefaultData)
          toast({
            title: "Success",
            description: `machine created successfully`,
          });
        }
      }
      // onSave();
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
              // required
              />
            </div>

            <div>
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              // required
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
            {/* <div>
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
            </div> */}

            <div>
              <Label className="text-lg font-semibold">Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {formData.media.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img.url}
                      alt={`Image ${idx}`}
                      className="aspect-square object-cover rounded-md"
                    />
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
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => addImage(e.target.files)}
                className="mt-2"
              />
            </div>


            {/* <div>
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
            </div> */}

            <div>
              <Label className="text-lg font-semibold">Videos</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {formData.media.videos.map((vid, idx) => (
                  <div key={idx} className="relative">
                    <video
                      controls
                      src={vid.url}
                      className="aspect-video object-cover rounded-md"
                    />
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
              <Input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => addVideo(e.target.files)}
                className="mt-2"
              />
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
