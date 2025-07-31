import { useToast } from "@/hooks/use-toast";

export const useShare = () => {
  const { toast } = useToast();

  const shareContent = async (
    title: string,
    text: string,
    url: string
  ): Promise<boolean> => {
    // Check if native share is available
    if (navigator.share && navigator.canShare) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return true;
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          // Fall back to clipboard copy if sharing fails
          return await fallbackToClipboard(url);
        }
        return false;
      }
    } else {
      // Fall back to clipboard copy
      return await fallbackToClipboard(url);
    }
  };

  const fallbackToClipboard = async (url: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "The machine link has been copied to your clipboard",
      });
      return true;
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Unable to share or copy the link",
        variant: "destructive",
      });
      return false;
    }
  };

  return { shareContent };
};