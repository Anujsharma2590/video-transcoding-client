import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, Video, ArrowLeft } from "lucide-react";
import api from "../../api";
import { Button } from "../../ui/Button";
import { Card, CardHeader, CardContent } from "../../ui/Card";

const VideoDetails = () => {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [isTranscoding, setIsTranscoding] = useState(false);
  const [transcodeOption, setTranscodeOption] = useState(null);
  const [transcodedFileUrl, setTranscodedFileUrl] = useState(null);
  const navigate = useNavigate();
  const fetchVideoById = async () => {
    try {
      const response = await api.get(`/video/fetch/${id}`);
      setVideoDetails(response.data);
    } catch (error) {
      console.error("Error fetching video details.", error);
    }
  };

  const handleTranscode = async () => {
    if (!transcodeOption) return;

    setIsTranscoding(true);
    let url =
      transcodeOption === "audio" ? `/video/audio` : `/video/resolution`;
    let payload = { video_code: videoDetails.video_code };

    if (transcodeOption !== "audio") {
      payload = { ...payload, resolution: transcodeOption };
    }

    try {
      const response = await api.post(url, payload);
      setTranscodedFileUrl(response.data.transcodedUrl);
    } catch (error) {
      console.error("Transcoding failed.", error);
    } finally {
      setIsTranscoding(false);
    }
  };

  useEffect(() => {
    if (id) fetchVideoById();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center">


        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center mb-4 "
        >
          <ArrowLeft size={40} className="mr-2" />
        </button>
        <h1 className="text-4xl font-bold mb-6">
        Video Transcoder
      </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videoDetails ? (
          <Card>
            <CardHeader className="flex items-center">
              <Video className="mr-2" />
              <h2 className="text-2xl font-semibold">Original Video</h2>
            </CardHeader>
            <CardContent>
              <video
                controls
                src={videoDetails.original_file_url}
                className="w-full max-w-3xl rounded-lg shadow-lg"
              ></video>
            </CardContent>
          </Card>
        ) : (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8 text-gray-600" />
          </div>
        )}

        {isTranscoding ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8 text-gray-600" />
            <p className="ml-2 text-gray-600">Transcoding in progress...</p>
          </div>
        ) : transcodedFileUrl ? (
          <Card>
            <CardHeader className="flex items-center">
              <Video className="mr-2" />
              <h2 className="text-2xl font-semibold">Transcoded Video</h2>
            </CardHeader>
            <CardContent>
              <video
                controls
                src={transcodedFileUrl}
                className="w-full max-w-3xl rounded-lg shadow-lg"
              ></video>
              <div className="mt-4">
                <p>
                  File URL:{" "}
                  <a
                    href={transcodedFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {transcodedFileUrl}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex items-center">
              <Video className="mr-2" />
              <h2 className="text-2xl font-semibold">Transcoded File</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No transcoded video available.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {videoDetails && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Select Transcode Option
          </h2>

          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="transcodeOption"
                  value="audio"
                  checked={transcodeOption === "audio"}
                  onChange={() => setTranscodeOption("audio")}
                />
                <span>Convert to Audio (MP3)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="transcodeOption"
                  value="1280:720"
                  checked={transcodeOption === "1280:720"}
                  onChange={() => setTranscodeOption("1280:720")}
                />
                <span>Change Resolution to 720p</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="transcodeOption"
                  value="640:480"
                  checked={transcodeOption === "640:480"}
                  onChange={() => setTranscodeOption("640:480")}
                />
                <span>Change Resolution to 480p</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="transcodeOption"
                  value="320:240"
                  checked={transcodeOption === "320:240"}
                  onChange={() => setTranscodeOption("320:240")}
                />
                <span>Change Resolution to 240p</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleTranscode}
              disabled={isTranscoding || !transcodeOption}
            >
              {isTranscoding ? (
                <>
                  <Loader className="inline-block mr-2 animate-spin" />{" "}
                  Transcoding...
                </>
              ) : (
                "Start Transcoding"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
