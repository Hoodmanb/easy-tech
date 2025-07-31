import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database, Image, Video, FileText } from "lucide-react";

interface StorageData {
  used: number;
  total: number;
  breakdown: {
    images: number;
    videos: number;
    documents: number;
    other: number;
  };
}

const CloudStorageStats = () => {
  // Mock data - replace with actual API call
  const storageData: StorageData = {
    used: 2.4, // GB
    total: 10, // GB
    breakdown: {
      images: 1.2,
      videos: 0.8,
      documents: 0.3,
      other: 0.1,
    },
  };

  const usagePercentage = (storageData.used / storageData.total) * 100;

  const formatSize = (sizeInGB: number) => {
    if (sizeInGB >= 1) {
      return `${sizeInGB.toFixed(1)} GB`;
    }
    return `${(sizeInGB * 1024).toFixed(0)} MB`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Cloud Storage Usage
        </CardTitle>
        <CardDescription>
          Monitor your cloud storage consumption and breakdown
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Total Usage</span>
            <span className="text-muted-foreground">
              {formatSize(storageData.used)} of {formatSize(storageData.total)}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {usagePercentage.toFixed(1)}% of storage used
          </p>
        </div>

        {/* Storage Breakdown */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Storage Breakdown</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Image className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Images</p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(storageData.breakdown.images)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Video className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Videos</p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(storageData.breakdown.videos)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <FileText className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Documents</p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(storageData.breakdown.documents)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Database className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Other</p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(storageData.breakdown.other)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">
                {Math.ceil((storageData.total - storageData.used) * 10) / 10}
              </p>
              <p className="text-xs text-muted-foreground">GB Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">156</p>
              <p className="text-xs text-muted-foreground">Total Files</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-xs text-muted-foreground">Machine Records</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CloudStorageStats;