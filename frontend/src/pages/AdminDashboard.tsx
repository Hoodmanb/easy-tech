import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus, Database, Image as ImageIcon, Video } from "lucide-react";
import { useDeleteMachine, useGetCategories, useGetMachines, useGetTags } from "@/hooks/query/index";
import { useToast } from "@/hooks/use-toast";
import MachineEditForm from "@/components/MachineEditForm";
import MachineDataForm from "@/components/MachineDataForm";
import MachineMediaForm from "@/components/MachineMediaForm";
import CloudStorageStats from "@/components/CloudStorageStats";
import type { Machine, Image, Video as VideoProp } from "@/types/index";
import CategoriesSection from "@/components/Categories";
import TagsSection from "@/components/TagsSection";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "machines" | "storage" | "categories" | "tags">("overview");
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [isCreatingMachine, setIsCreatingMachine] = useState(false);
  const [editMode, setEditMode] = useState<"data" | "media" | "all">("all");
  const { categories } = useGetCategories();
  const { tags } = useGetTags();

  const { machine: machinesList, isLoading, error, refetch } = useGetMachines();
  const { deleteMachine, isLoading: isDeleting } = useDeleteMachine();
  const { toast } = useToast();

  const handleSaveMachine = () => {
    // Machine will be saved via the form's API calls
    setEditingMachine(null);
    setIsCreatingMachine(false);
    setEditMode("all");
    setActiveTab("machines");
    refetch(); // Refresh the machines list
    toast({
      title: "Success",
      description: `Machine ${editingMachine ? 'updated' : 'created'} successfully`,
    });
  };

  const handleSaveMachineData = (data: Machine) => {
    // Handle data-only save
    console.log("Saving machine data:", data);
    handleSaveMachine();
  };

  const handleSaveMachineMedia = (images: Image[], videos: VideoProp[]) => {
    // Handle media-only save
    console.log("Saving machine media:", { images, videos });
    handleSaveMachine();
  };

  const handleDeleteMachine = async (machineId: string) => {
    try {
      await deleteMachine(machineId);
      refetch(); // Refresh the machines list
      toast({
        title: "Success",
        description: "Machine deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete machine",
        variant: "destructive",
      });
    }
  };

  if (isCreatingMachine || editingMachine) {
    if (editMode === "data") {
      return (
        <div className="min-h-screen py-section">
          <MachineDataForm
            machine={editingMachine || undefined}
            onSave={handleSaveMachineData}
            onCancel={() => {
              setEditingMachine(null);
              setIsCreatingMachine(false);
              setEditMode("all");
            }}
          />
        </div>
      );
    }

    if (editMode === "media") {
      return (
        <div className="min-h-screen py-section">
          <MachineMediaForm
            machine={editingMachine || undefined}
            onSave={handleSaveMachineMedia}
            onCancel={() => {
              setEditingMachine(null);
              setIsCreatingMachine(false);
              setEditMode("all");
            }}
          />
        </div>
      );
    }

    // Default to full edit form
    return (
      <div className="min-h-screen py-section">
        <MachineEditForm
          machine={editingMachine || undefined}
          onSave={handleSaveMachine}
          onCancel={() => {
            setEditingMachine(null);
            setIsCreatingMachine(false);
            setEditMode("all");
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your Easy Technologies website content
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "overview" ? "accent" : "professional"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "machines" ? "accent" : "professional"}
            onClick={() => setActiveTab("machines")}
          >
            Machines Management
          </Button>
          <Button
            variant={activeTab === "storage" ? "accent" : "professional"}
            onClick={() => setActiveTab("storage")}
          >
            Cloud Storage
          </Button>
          <Button
            variant={activeTab === "categories" ? "accent" : "professional"}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </Button>

          <Button
            variant={activeTab === "tags" ? "accent" : "professional"}
            onClick={() => setActiveTab("tags")}
          >
            Tags
          </Button>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Machines Management</CardTitle>
                <CardDescription>Add, edit, or remove machines from the catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">{machinesList.length}</p>
                  <p className="text-sm text-muted-foreground">Total Machines</p>
                  <Button variant="accent" className="w-full" onClick={() => setActiveTab("machines")}>
                    Manage Machines
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Machines</CardTitle>
                <CardDescription>Machines currently featured on the homepage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">
                    {machinesList.filter(m => m.featured).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Featured Items</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Add, edit, or remove Categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">{categories.length}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <Button variant="accent" className="w-full" onClick={() => setActiveTab("categories")}>
                    Manage Categories
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>Add, edit, or remove Tags</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">{tags.length}</p>
                  <p className="text-sm text-muted-foreground">Tags</p>
                  <Button variant="accent" className="w-full" onClick={() => setActiveTab("tags")}>
                    Manage Tags
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "categories" && (
          <CategoriesSection />
        )}

        {activeTab === "tags" && (
          <TagsSection />
        )}

        {activeTab === "storage" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Cloud Storage Management</h2>
            <CloudStorageStats />
          </div>
        )}

        {activeTab === "machines" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Machines Management</h2>
              <div className="flex gap-2">
                <Button variant="professional" onClick={() => {
                  setIsCreatingMachine(true);
                  setEditMode("data");
                }}>
                  <Database className="h-4 w-4 mr-2" />
                  Add Data Only
                </Button>
                <Button variant="accent" onClick={() => {
                  setIsCreatingMachine(true);
                  setEditMode("all");
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Full Machine
                </Button>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Power Source</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead>Videos</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        Loading machines...
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-destructive">
                        Error loading machines: {error}
                      </TableCell>
                    </TableRow>
                  ) : machinesList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        No machines found
                      </TableCell>
                    </TableRow>
                  ) : (
                    machinesList.map((machine) => (
                      <TableRow key={machine._id}>
                        <TableCell className="font-medium">{machine.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{machine.category}</Badge>
                        </TableCell>
                        <TableCell>{machine.powerSource}</TableCell>
                        <TableCell>{machine.capacity}</TableCell>
                        <TableCell>
                          {machine.featured && <Badge variant="default">Featured</Badge>}
                        </TableCell>
                        <TableCell>{machine.media.images.length}</TableCell>
                        <TableCell>{machine.media.videos.length}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="professional"
                              size="sm"
                              onClick={() => {
                                setEditingMachine(machine);
                                setEditMode("data");
                              }}
                              disabled={isDeleting}
                              title="Edit Data"
                            >
                              <Database className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setEditingMachine(machine);
                                setEditMode("media");
                              }}
                              disabled={isDeleting}
                              title="Edit Media"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="accent"
                              size="sm"
                              onClick={() => {
                                setEditingMachine(machine);
                                setEditMode("all");
                              }}
                              disabled={isDeleting}
                              title="Edit All"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteMachine(machine._id)}
                              disabled={isDeleting}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;