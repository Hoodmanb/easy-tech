import { useState, useEffect } from 'react';
import { machines as initialMachines } from '@/data/machines';
import type { Machine } from '@/types/machine';

// TODO: Replace with actual API URL
const API_BASE_URL = 'http://localhost:3001/api';

export const useGetMachines = () => {
  const [data, setData] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call
        // const response = await fetch(`${API_BASE_URL}/machines`);
        // const machines = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use dummy data for now
        const machines = Object.values(initialMachines);
        setData(machines);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch machines');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachines();
  }, []);

  return { data, isLoading, error, refetch: () => setData(Object.values(initialMachines)) };
};

export const useCreateMachine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMachine = async (machine: Omit<Machine, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/machines`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(machine)
      // });
      // return await response.json();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate ID and return machine (dummy implementation)
      const newMachine: Machine = {
        ...machine,
        id: Date.now().toString()
      };
      
      return newMachine;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create machine';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { createMachine, isLoading, error };
};

export const useUpdateMachine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMachine = async (machine: Machine) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/machines/${machine.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(machine)
      // });
      // return await response.json();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return machine;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update machine';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateMachine, isLoading, error };
};

export const useDeleteMachine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMachine = async (machineId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/machines/${machineId}`, {
      //   method: 'DELETE'
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to delete machine');
      // }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete machine';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteMachine, isLoading, error };
};

export const useGetMachine = (machineId: string) => {
  const [data, setData] = useState<Machine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachine = async () => {
      if (!machineId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // TODO: Replace with actual API call
        // const response = await fetch(`${API_BASE_URL}/machines/${machineId}`);
        // const machine = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Use dummy data for now
        const machine = initialMachines[machineId];
        setData(machine || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch machine');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachine();
  }, [machineId]);

  return { data, isLoading, error };
};