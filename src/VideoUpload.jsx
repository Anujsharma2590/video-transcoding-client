import React from "react";
import { message, Upload } from "antd";
import { FileVideo } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import MaxWidthWrapper from "./MaxWidthWrapper";
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const VideoUpload = () => (
  <div className="mb-12 mt-12 sm:mt-20">
    <Dragger {...props}>
      <div className="flex flex-col items-center justify-center space-y-4 p-6 border-2 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
        <FileVideo size={60} className="text-blue-500" />
        <p className="text-lg font-semibold text-gray-700">Upload Your Video</p>
        <p className="text-sm text-gray-500">
          Drag and drop, or <span className="text-blue-500">browse</span> your
          video files.
        </p>
        <p className="text-xs text-gray-400">
          We support MP4, AVI, MKV formats. Max file size: 5GB.
        </p>
      </div>
    </Dragger>
  </div>
);

export default VideoUpload;
