// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Plus, X, Upload, Image, Video } from "lucide-react";
// import type { Machine, Image as ImageProp, Video as VideoProp } from "@/types";

// interface MachineMediaFormProps {
//   machine?: Machine;
//   onSave: (images: ImageProp, videos: VideoProp) => void;
//   onCancel: () => void;
//   isLoading?: boolean;
// }

// const MachineMediaForm = ({ machine, onSave, onCancel, isLoading }: MachineMediaFormProps) => {
//   const [images, setImages] = useState<ImageProp[]>(machine.media?.images || []);
//   const [videos, setVideos] = useState<VideoProp[]>(machine.media?.videos || []);
//   const [newImageUrl, setNewImageUrl] = useState("");
//   const [newVideoUrl, setNewVideoUrl] = useState("");

//   const addImage = () => {
//     if (newImageUrl.trim()) {
//       setImages([...images, newImageUrl.trim()]);
//       setNewImageUrl("");
//     }
//   };

//   const addVideo = () => {
//     if (newVideoUrl.trim()) {
//       setVideos([...videos, newVideoUrl.trim()]);
//       setNewVideoUrl("");
//     }
//   };

//   const removeImage = (index: number) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const removeVideo = (index: number) => {
//     setVideos(videos.filter((_, i) => i !== index));
//   };

//   const handleSave = () => {
//     onSave(images, videos);
//   };

//   const handleFileUpload = (type: 'image' | 'video') => {
//     // Placeholder for file upload - would integrate with cloud storage
//     alert(`File upload for ${type}s will be implemented with cloud storage integration`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             {machine ? "Edit Machine Media" : "Add New Machine - Media"}
//           </CardTitle>
//           <CardDescription>
//             Manage images and videos for the machine
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-8">
//           {/* Images Section */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold flex items-center gap-2">
//                 <Image className="h-5 w-5" />
//                 Images
//               </h3>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => handleFileUpload('image')}
//               >
//                 <Upload className="h-4 w-4 mr-2" />
//                 Upload Images
//               </Button>
//             </div>

//             {/* Add Image by URL */}
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Enter image URL"
//                 value={newImageUrl}
//                 onChange={(e) => setNewImageUrl(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && addImage()}
//               />
//               <Button onClick={addImage} disabled={!newImageUrl.trim()}>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add
//               </Button>
//             </div>

//             {/* Images List */}
//             <div className="space-y-2">
//               {images.length === 0 ? (
//                 <p className="text-muted-foreground text-center py-8 border-2 border-dashed rounded-lg">
//                   No images added yet. Add images by URL or upload files.
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-1 gap-3">
//                   {images.map((image, index) => (
//                     <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
//                       <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
//                         <Image className="h-6 w-6 text-muted-foreground" />
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium">Image {index + 1}</p>
//                         <p className="text-xs text-muted-foreground truncate max-w-md">
//                           {image}
//                         </p>
//                       </div>
//                       <Badge variant="secondary">JPG</Badge>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => removeImage(index)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Videos Section */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold flex items-center gap-2">
//                 <Video className="h-5 w-5" />
//                 Videos
//               </h3>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => handleFileUpload('video')}
//               >
//                 <Upload className="h-4 w-4 mr-2" />
//                 Upload Videos
//               </Button>
//             </div>

//             {/* Add Video by URL */}
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Enter video URL"
//                 value={newVideoUrl}
//                 onChange={(e) => setNewVideoUrl(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && addVideo()}
//               />
//               <Button onClick={addVideo} disabled={!newVideoUrl.trim()}>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add
//               </Button>
//             </div>

//             {/* Videos List */}
//             <div className="space-y-2">
//               {videos.length === 0 ? (
//                 <p className="text-muted-foreground text-center py-8 border-2 border-dashed rounded-lg">
//                   No videos added yet. Add videos by URL or upload files.
//                 </p>
//               ) : (
//                 <div className="grid grid-cols-1 gap-3">
//                   {videos.map((video, index) => (
//                     <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
//                       <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
//                         <Video className="h-6 w-6 text-muted-foreground" />
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium">Video {index + 1}</p>
//                         <p className="text-xs text-muted-foreground truncate max-w-md">
//                           {video}
//                         </p>
//                       </div>
//                       <Badge variant="secondary">MP4</Badge>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => removeVideo(index)}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="bg-muted/30 p-4 rounded-lg">
//             <h4 className="font-medium mb-2">Media Summary</h4>
//             <div className="flex gap-6 text-sm">
//               <span className="flex items-center gap-2">
//                 <Image className="h-4 w-4" />
//                 {images.length} Images
//               </span>
//               <span className="flex items-center gap-2">
//                 <Video className="h-4 w-4" />
//                 {videos.length} Videos
//               </span>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex gap-4 pt-6">
//             <Button onClick={handleSave} disabled={isLoading}>
//               {isLoading ? "Saving..." : "Save Media"}
//             </Button>
//             <Button variant="secondary" onClick={onCancel}>
//               Cancel
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default MachineMediaForm;



import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Upload, Image, Video } from "lucide-react";
import type { Machine, Image as ImageProp, Video as VideoProp } from "@/types";

interface MachineMediaFormProps {
  machine?: Machine;
  onSave: (images: ImageProp[], videos: VideoProp[]) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const MachineMediaForm = ({ machine, onSave, onCancel, isLoading }: MachineMediaFormProps) => {
  const [images, setImages] = useState<ImageProp[]>(machine?.media?.images || []);
  const [videos, setVideos] = useState<VideoProp[]>(machine?.media?.videos || []);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, { url: newImageUrl.trim(), publicId: "" }]);
      setNewImageUrl("");
    }
  };

  const addVideo = () => {
    if (newVideoUrl.trim()) {
      setVideos([...videos, { url: newVideoUrl.trim(), publicId: "" }]);
      setNewVideoUrl("");
    }
  };

  const removeImage = (index: number) => {
    const toDelete = images[index];
    if (toDelete?.publicId) {
      // Call API to delete from Cloudinary
      fetch(`/api/media/delete?publicId=${toDelete.publicId}&type=image`, { method: "DELETE" });
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    const toDelete = videos[index];
    if (toDelete?.publicId) {
      fetch(`/api/media/delete?publicId=${toDelete.publicId}&type=video`, { method: "DELETE" });
    }
    setVideos(videos.filter((_, i) => i !== index));
  };

  const uploadFiles = async (files: FileList, type: 'image' | 'video') => {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append("files", file));
    formData.append("type", type);

    const res = await fetch("/api/media/upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (type === 'image') setImages([...images, ...data]);
    if (type === 'video') setVideos([...videos, ...data]);
  };

  const handleFileUpload = (type: 'image' | 'video') => {
    if (type === 'image') imageInputRef.current?.click();
    if (type === 'video') videoInputRef.current?.click();
  };

  const handleSave = () => {
    onSave(images, videos);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {machine ? "Edit Machine Media" : "Add New Machine - Media"}
          </CardTitle>
          <CardDescription>
            Manage images and videos for the machine
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">

          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Image className="h-5 w-5" /> Images
              </h3>
              <>
                <Button variant="secondary" size="sm" onClick={() => handleFileUpload('image')}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Images
                </Button>
                <input type="file" ref={imageInputRef} accept="image/*" multiple hidden onChange={e => e.target.files && uploadFiles(e.target.files, 'image')} />
              </>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addImage()}
              />
              <Button onClick={addImage} disabled={!newImageUrl.trim()}>
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {images.map((img, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img src={img.url} alt="preview" className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Image {index + 1}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-md">{img.url}</p>
                  </div>
                  <Badge variant="secondary">JPG</Badge>
                  <Button variant="destructive" size="sm" onClick={() => removeImage(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Video Upload Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Video className="h-5 w-5" /> Videos
              </h3>
              <>
                <Button variant="secondary" size="sm" onClick={() => handleFileUpload('video')}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Videos
                </Button>
                <input type="file" ref={videoInputRef} accept="video/*" multiple hidden onChange={e => e.target.files && uploadFiles(e.target.files, 'video')} />
              </>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter video URL"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addVideo()}
              />
              <Button onClick={addVideo} disabled={!newVideoUrl.trim()}>
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {videos.map((vid, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                    <Video className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Video {index + 1}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-md">{vid.url}</p>
                  </div>
                  <Badge variant="secondary">MP4</Badge>
                  <Button variant="destructive" size="sm" onClick={() => removeVideo(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Media"}
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MachineMediaForm;
