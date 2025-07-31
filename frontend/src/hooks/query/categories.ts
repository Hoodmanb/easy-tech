import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { Category } from "@/types"; // Make sure Category type exists

// Get all categories
export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance("/api/category");
      if (response.data?.message === "retrieved successfully") {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, isLoading, error, refetch: fetchCategories };
};

// Create category
export const useCreateCategory = () => {
  const [isLoading, setLoading] = useState(false);

  const createCategory = async (categoryData: Category) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/category", categoryData);
      if (response.data?.message === "created successfully") {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || "Failed to create category");
      }
    } catch (err) {
      console.error("Error creating category:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, isLoading };
};

// Update category
export const useUpdateCategory = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const updateCategory = async (id: string, updatedData: Partial<Category>) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/category/${id}`, updatedData);
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

  return { updateCategory, isLoading, error };
};

// Delete category
export const useDeleteCategory = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const deleteCategory = async (id: string): Promise<string | null> => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/api/category/${id}`);
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

  return { deleteCategory, isLoading, error };
};
