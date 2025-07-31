import { useState } from "react";
import { useDeleteCategory, useUpdateCategory, useGetCategories } from "../hooks/query/index";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@/types/index";

export default function CategoriesSection() {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [renameValue, setRenameValue] = useState("");
    const [isRenaming, setIsRenaming] = useState(false);

    const { deleteCategory, isLoading: isDeleting } = useDeleteCategory();
    const { updateCategory, isLoading: isUpdating } = useUpdateCategory();
    const { categories, isLoading, error, refetch } = useGetCategories();

    const { toast } = useToast();

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory(id);
            toast({
                title: "Success",
                description: "Category deleted successfully",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to delete category",
                variant: "destructive",
            });
        }
    };

    const handleRename = async () => {
        if (!selectedCategory || !renameValue.trim()) return;

        try {
            setIsRenaming(true);
            await updateCategory(selectedCategory._id, { name: renameValue.trim() });
            toast({
                title: "Success",
                description: "Category renamed successfully",
            });
            setSelectedCategory(null);
            setRenameValue("");
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to rename category",
                variant: "destructive",
            });
        } finally {
            setIsRenaming(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Category Management</h2>

            <div className="overflow-x-auto rounded-xl border">
                <table className="min-w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left px-4 py-3">Name</th>
                            <th className="text-left px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={2} className="text-center py-6">
                                    Loading categories...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={2} className="text-center py-6 text-destructive">
                                    Failed to load categories 😓
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="text-center py-6 text-muted-foreground">
                                    No categories found
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category._id} className="border-t">
                                    <td className="px-4 py-3 font-medium">{category.name}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-3">
                                            <button
                                                className="text-blue-600 hover:underline"
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setRenameValue(category.name);
                                                }}
                                            >
                                                Rename
                                            </button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => handleDelete(category._id)}
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? "Deleting..." : "Delete"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {selectedCategory && (
                <div className="mt-6 border p-4 rounded-xl bg-gray-50 space-y-3">
                    <p className="font-semibold">Rename: {selectedCategory.name}</p>
                    <input
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        className="w-full border rounded p-2"
                        placeholder="New category name"
                    />
                    <div className="flex gap-3 mt-2">
                        <button
                            className="bg-blue-600 text-white px-4 py-1 rounded"
                            onClick={handleRename}
                            disabled={isRenaming}
                        >
                            {isRenaming ? "Renaming..." : "Rename"}
                        </button>
                        <button
                            className="bg-gray-300 text-black px-4 py-1 rounded"
                            onClick={() => {
                                setSelectedCategory(null);
                                setRenameValue("");
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
