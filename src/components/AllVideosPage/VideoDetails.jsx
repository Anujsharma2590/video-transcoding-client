import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Radio, message } from "antd";
import { Loader } from "lucide-react"; // Icon for loader
import api from "../../api";
import { Button } from "../../ui/Button";

const VideoDetails = () => {
  const { id } = useParams(); // Extract the video ID from the route
  const [videoDetails, setVideoDetails] = useState(null);
  const [isTranscoding, setIsTranscoding] = useState(false);
  const [transcodeOption, setTranscodeOption] = useState(null);
  const [transcodedFileUrl, setTranscodedFileUrl] = useState(null);
  const [transcodeMessage, setTranscodeMessage] = useState(null);

  // Fetch Video Details API Call
  const fetchVideoById = async () => {
    try {
      const response = await api.get(`/video/fetch/${id}`);
      setVideoDetails(response.data);
    } catch (error) {
      message.error("Error fetching video details.");
    }
  };

  // Handle Transcoding API Call
  const handleTranscode = async () => {
    if (!transcodeOption) {
      message.error("Please select a transcoding option!");
      return;
    }

    setIsTranscoding(true);
    let url = "";
    let payload = {
      video_code: videoDetails.video_code,
    };

    if (transcodeOption === "audio") {
      url = `/video/audio`;
    } else {
      url = `/video/resolution`;
      payload = {
        ...payload,
        resolution: transcodeOption,
      };
    }

    try {
      const response = await api.post(url, payload);
      setTranscodedFileUrl(response.data.transcodedFileUrl);
      setIsTranscoding(false);
      message.success("Transcoding successful!");
    } catch (error) {
      setIsTranscoding(false);
      message.error("Transcoding failed. Please try again.");
    }
  };

  useEffect(() => {
    if (id) fetchVideoById();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Video Player</h1>

      {/* Video Player */}
      <div className="mb-6">
        {videoDetails ? (
          <video
            controls
            src={videoDetails.original_file_url}
            className="w-full max-w-3xl rounded-lg shadow-lg"
          ></video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>

      {/* Transcoding Options */}
      {videoDetails && (
        <div className="transcode-options mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Select Transcode Option
          </h2>

          <Radio.Group
            onChange={(e) => setTranscodeOption(e.target.value)}
            className="mt-4"
          >
            <Radio value="audio">Convert to Audio (MP3)</Radio>
            <Radio value="1280:720">Change Resolution to 720p</Radio>
            <Radio value="640:480">Change Resolution to 480p</Radio>
            <Radio value="320:240">Change Resolution to 240p</Radio>
          </Radio.Group>

          {/* Transcode Button */}
          <div className="mt-6">
            <Button onClick={handleTranscode} disabled={isTranscoding}>
              {isTranscoding ? (
                <>
                  <Loader className="inline-block mr-2" /> Transcoding...
                </>
              ) : (
                "Start Transcoding"
              )}
            </Button>
          </div>

          {/* Show transcoded video/audio link */}
          {transcodedFileUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Transcoded File:</h3>
              <p>
                File URL:{" "}
                <a
                  href={transcodedFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {transcodedFileUrl}
                </a>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Display Transcoding Message */}
      {transcodeMessage && (
        <p className="mt-4 text-red-500">{transcodeMessage}</p>
      )}
    </div>
  );
};

export default VideoDetails;
