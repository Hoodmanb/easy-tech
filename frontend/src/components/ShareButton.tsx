import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/useShare";
import type { Machine } from "@/types/machine";

interface ShareButtonProps {
  machine: Machine;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "secondary" | "accent" | "professional" | "industrial";
  className?: string;
}

const ShareButton = ({ machine, size = "default", variant = "secondary", className }: ShareButtonProps) => {
  const { shareContent } = useShare();

  const handleShare = async () => {
    const url = `${window.location.origin}/machines/${machine.id}`;
    const title = `${machine.name} - Easy Technologies`;
    const text = `Check out this ${machine.category.toLowerCase()} machine: ${machine.shortDescription}`;

    await shareContent(title, text, url);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      className={className}
    >
      <Share2 className="h-4 w-4 mr-2" />
      Share
    </Button>
  );
};

export default ShareButton;