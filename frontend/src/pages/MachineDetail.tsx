import { useParams, Navigate } from "react-router-dom";
import { useGetMachine } from "@/hooks/useMachines";
import MachineDetailTemplate from "@/components/MachineDetailTemplate";
import MetaTags from "@/components/MetaTags";
import { machines, getRelatedMachines } from "@/data/machines";

const MachineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: machine, isLoading, error } = useGetMachine(id || "");
  
  if (isLoading) {
    return (
      <div className="min-h-screen py-section flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading machine details...</p>
        </div>
      </div>
    );
  }

  if (!id || error || !machine) {
    return <Navigate to="/machines" replace />;
  }

  const relatedMachines = getRelatedMachines(id);
  const currentUrl = `${window.location.origin}/machines/${machine.id}`;

  return (
    <>
      <MetaTags
        title={`${machine.name} - Easy Technologies`}
        description={machine.description}
        image="/og-machine-placeholder.jpg"
        url={currentUrl}
      />
      <MachineDetailTemplate machine={machine} relatedMachines={relatedMachines} />
    </>
  );
};

export default MachineDetail;