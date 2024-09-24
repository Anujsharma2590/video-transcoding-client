import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../ui/Button"; // shadcn Button component
import { Loader } from "lucide-react"; // Icon for loader

const VideoDetails = () => {
  const { id } = useParams(); // Extract the video ID from the route
  const [isTranscoding, setIsTranscoding] = useState(false);
  const [transcodeMessage, setTranscodeMessage] = useState(null);
  const [transcodedUrl, setTranscodedUrl] = useState(null);

  // API Call for Resolution Update
  const handleResolutionTranscoding = async () => {
    setIsTranscoding(true);
    setTranscodeMessage("Transcoding video to higher resolution...");
    try {
      const response = await fetch("http://localhost:3000/api/v1/video/resolution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_code: id }),
      });
      const data = await response.json();
      setTranscodedUrl(data.transcodedUrl);
      setTranscodeMessage(data.message);
    } catch (error) {
      setTranscodeMessage("Error occurred while transcoding the video.");
    } finally {
      setIsTranscoding(false);
    }
  };

  // API Call for Audio Extraction
  const handleAudioExtraction = async () => {
    setIsTranscoding(true);
    setTranscodeMessage("Extracting audio from the video...");
    try {
      const response = await fetch("http://localhost:3000/api/v1/video/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_code: id }),
      });
      const data = await response.json();
      setTranscodedUrl(data.transcodedUrl);
      setTranscodeMessage(data.message);
    } catch (error) {
      setTranscodeMessage("Error occurred while extracting audio.");
    } finally {
      setIsTranscoding(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Video Player</h1>

      {/* Video Player */}
      <div className="mb-6">
        <video
          controls
           src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"
          className="w-full max-w-3xl rounded-lg shadow-lg"
        ></video>
      </div>

      {/* Transcoding Options */}
      <div className="flex gap-4 mb-6">
        <Button onClick={handleResolutionTranscoding} disabled={isTranscoding}>
          {isTranscoding ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin h-4 w-4" />
              Transcoding...
            </span>
          ) : (
            "Transcode Video (Resolution)"
          )}
        </Button>
        <Button onClick={handleAudioExtraction} disabled={isTranscoding}>
          {isTranscoding ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin h-4 w-4" />
              Extracting...
            </span>
          ) : (
            "Extract Audio"
          )}
        </Button>
      </div>

      {/* Transcoding Status */}
      {transcodeMessage && (
        <div className="mt-4 p-4 border rounded-md bg-blue-50 text-blue-600">
          {transcodeMessage}
          {transcodedUrl && (
            <div className="mt-2">
              <a
                href={transcodedUrl}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Transcoded File
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
