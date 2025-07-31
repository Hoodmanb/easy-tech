import { useState } from "react";
import { useDeleteTag, useUpdateTag, useGetTags } from "@/hooks/query/index";
import { useToast } from "@/hooks/use-toast";
import type { Tag } from "@/types";

export default function TagsSection() {
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [renameValue, setRenameValue] = useState("");
    const [isRenaming, setIsRenaming] = useState(false);

    const { deleteTag, isLoading: isDeleting } = useDeleteTag();
    const { updateTag, isLoading: isUpdating } = useUpdateTag();
    const { tags, isLoading, error, refetch } = useGetTags();

    const { toast } = useToast();

    const handleDelete = async (id: string) => {
        try {
            await deleteTag(id);
            toast({
                title: "Success",
                description: "Tag deleted successfully",
            });
            refetch();
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to delete tag",
                variant: "destructive",
            });
        }
    };

    const handleRename = async () => {
        if (!selectedTag || !renameValue.trim()) return;

        try {
            setIsRenaming(true);
            await updateTag(selectedTag._id, { name: renameValue.trim() });
            toast({
                title: "Success",
                description: "Tag renamed successfully",
            });
            setSelectedTag(null);
            setRenameValue("");
            refetch();
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to rename tag",
                variant: "destructive",
            });
        } finally {
            setIsRenaming(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Tag Management</h2>

            <div className="overflow-x-auto rounded-xl border">
                <table className="min-w-full text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left px-4 py-3">Name</th>
                            <th className="text-left px-4 py-3">Description</th>
                            <th className="text-left px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="text-center py-6">
                                    Loading tags...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={3} className="text-center py-6 text-destructive">
                                    Failed to load tags 😓
                                </td>
                            </tr>
                        ) : tags.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center py-6 text-muted-foreground">
                                    No tags found
                                </td>
                            </tr>
                        ) : (
                            tags.map((tag) => (
                                <tr key={tag._id} className="border-t">
                                    <td className="px-4 py-3 font-medium">{tag.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{tag.description || "—"}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-3">
                                            <button
                                                className="text-blue-600 hover:underline"
                                                onClick={() => {
                                                    setSelectedTag(tag);
                                                    setRenameValue(tag.name);
                                                }}
                                            >
                                                Rename
                                            </button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => handleDelete(tag._id)}
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

            {selectedTag && (
                <div className="mt-6 border p-4 rounded-xl bg-gray-50 space-y-3">
                    <p className="font-semibold">Rename: {selectedTag.name}</p>
                    <input
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        className="w-full border rounded p-2"
                        placeholder="New tag name"
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
                                setSelectedTag(null);
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
