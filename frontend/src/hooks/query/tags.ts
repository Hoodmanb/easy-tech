import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import type { Tag } from "@/types";

// Get all tags
export const useGetTags = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance("/api/tag");
            if (response.data?.message === "retrieved successfully") {
                setTags(response.data.data);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return { tags, isLoading, error, refetch: fetchTags };
};

// Create tag
export const useCreateTag = () => {
    const [isLoading, setLoading] = useState(false);

    const createTag = async (tagData: Tag) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/api/tag", tagData);
            if (response.data?.message === "created successfully") {
                return response.data.data;
            } else {
                throw new Error(response.data?.message || "Failed to create tag");
            }
        } catch (err) {
            console.error("Create error:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createTag, isLoading };
};

// Update tag
export const useUpdateTag = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const updateTag = async (id: string, updatedData: Partial<Tag>) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(`/api/tag/${id}`, updatedData);
            if (response.data?.message === "updated successfully") {
                return response.data.data;
            }
        } catch (err) {
            console.error("Update error:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateTag, isLoading, error };
};

// Delete tag
export const useDeleteTag = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const deleteTag = async (id: string): Promise<string | null> => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/api/tag/${id}`);
            if (response.data?.message === "deleted successfully") {
                return response.data.data;
            }
            return null;
        } catch (err) {
            console.error("Delete error:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteTag, isLoading, error };
};
