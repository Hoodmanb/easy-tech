import { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { Machine } from "@/types";
import uploadToCloudinary from "@/utils/cloudinaryUpload";
import { cleanPayload } from "@/utils/cleanPayload";

export const useGetMachines = () => {
  const [machine, setMachine] = useState<Machine[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchMachines = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance("/api/machine");
      if (response.data?.message === "retrieved successfully") {
        setMachine(response.data.machines);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  return { machine, isLoading, error, refetch: fetchMachines };
};

export const useCreateMachine = () => {
  const [isLoading, setLoading] = useState(false);

  const createMachine = async (machineData: Machine) => {
    setLoading(true);

    try {
      const imageUploads = await Promise.all(
        machineData.media?.images.map((file) =>
          uploadToCloudinary(file.file, "image")
        )
      );

      const videoUploads = await Promise.all(
        machineData.media?.videos.map((file) =>
          uploadToCloudinary(file.file, "video")
        )
      );
      console.log(machineData)
      const payload = {
        ...machineData,
        images: imageUploads,
        videos: videoUploads,
      }
      const response = await axiosInstance.post("/api/machine", cleanPayload(payload));

      if (response.data?.message === "created successfully") {
        console.log(response.data.data)
        return response.data.message;
      } else {
        throw new Error(response.data?.message || "Failed to create machine");
      }
    } catch (err) {
      console.error("Error creating machine:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createMachine, isLoading };
};

export const useUpdateMachine = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const updateMachine = async (id: string, updatedData: Partial<Machine>) => {
    setLoading(true);
    updatedData._id = ""
    try {
      const response = await axiosInstance.put(`/api/machine/${id}`, cleanPayload(updatedData));
      if (response.data?.message === "updated successfully") {
        return response.data.data;
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err);
      throw err; // rethrow so the caller can catch if needed
    } finally {
      setLoading(false);
    }
  };

  return { updateMachine, isLoading, error };
};

export const useDeleteMachine = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const deleteMachine = async (id: string): Promise<String | null> => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/api/machine/${id}`);
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

  return { deleteMachine, isLoading, error };
};