import React, { useState } from "react";
import { message, Upload, Radio, Spin } from "antd";
import { FileVideo, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import api from "./api";

const { Dragger } = Upload;

const VideoUpload = ({ onTranscodingComplete }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [transcodeOption, setTranscodeOption] = useState(null);
  const [isTranscoding, setIsTranscoding] = useState(false);
  const [transcodedFileUrl, setTranscodedFileUrl] = useState(null);

  const handleTranscode = async () => {
    let url = ``;
    let payload = {
      video_code: uploadedFile.videoCode,
    };
    if (transcodeOption === "audio") {
      url = `/video/audio`;
    } else {
      url = `video/resolution`;
      payload = {
        ...payload,
        resolution: transcodeOption,
      };
    }

    if (!transcodeOption) {
      message.error("Please select a transcoding option!");
      return;
    }

    setIsTranscoding(true);

    try {
      const response = await api.post(url, payload);

      setTranscodedFileUrl(response.transcodedFileUrl);
      setIsTranscoding(false);
      message.success("Transcoding successful!");
      onTranscodingComplete();
    } catch (error) {
      setIsTranscoding(false);
      message.error("Transcoding failed. Please try again.");
    }
  };

  const uploadProps = {
    name: "video",
    multiple: false,
    action: "http://localhost:3000/api/v1/video/upload",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("id_token")}`,
    },
    onChange(info) {
      const { status, response } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setUploadedFile(response);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: false,
    },
  };

  return (
    <>
      {isTranscoding && (
        <div className="flex justify-center mt-4">
          <Spin tip="Transcoding... Please wait" size="large" />
        </div>
      )}
      <div
        className={`mb-12 mt-12 ${
          isTranscoding ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {!uploadedFile && (
          <Dragger {...uploadProps}>
            <div className="flex flex-col items-center justify-center space-y-4 p-6 border-2 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
              <FileVideo size={60} className="text-blue-500" />
              <p className="text-lg font-semibold text-gray-700">
                Upload Your Video
              </p>
              <p className="text-sm text-gray-500">
                Drag and drop, or <span className="text-blue-500">browse</span>{" "}
                your video files.
              </p>
              <p className="text-xs text-gray-400">
                We support MP4, AVI, MKV formats. Max file size: 5GB.
              </p>
            </div>
          </Dragger>
        )}

        {uploadedFile && (
          <>
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold">Uploaded Video</h3>
              <div className="flex items-start space-x-4 mt-4">
                <img
                  src={uploadedFile.metaData?.thumbnailURL}
                  alt="Video Thumbnail"
                  className="w-48 h-28 object-cover rounded-lg"
                />
                <div>
                  <p>
                    <strong>Name:</strong> {uploadedFile.metaData?.videoName}
                  </p>
                  <p>
                    <strong>Size:</strong>{" "}
                    {(uploadedFile.metaData?.size / (1024 * 1024)).toFixed(2)}{" "}
                    MB
                  </p>

                  {/* Delete button to remove the uploaded video */}
                  <Button
                    variant="destructive"
                    className="mt-4"
                    onClick={() => {}}
                  >
                    <Trash2 className="mr-2" /> Delete Video
                  </Button>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mt-6">
              Select Transcode Option
            </h3>
            <Radio.Group
              onChange={(e) => setTranscodeOption(e.target.value)}
              className="mt-4"
            >
              <Radio value="audio">Convert to Audio (MP3)</Radio>
              <Radio value="1280:720">Change Resolution to 720p</Radio>
              <Radio value="640:480">Change Resolution to 480p</Radio>
              <Radio value="320:240">Change Resolution to 240p</Radio>
            </Radio.Group>

            <Button
              className="mt-6"
              onClick={handleTranscode}
              disabled={!transcodeOption || isTranscoding}
            >
              {isTranscoding ? "Transcoding..." : "Start Transcoding"}
            </Button>

            {/* Show transcoded file once done */}
            {transcodedFileUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Transcoded Video:</h3>
                <p>
                  File URL:{" "}
                  <a
                    href={transcodedFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {transcodedFileUrl}
                  </a>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VideoUpload;
