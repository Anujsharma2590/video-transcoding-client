import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, Video } from "lucide-react"; 
import api from "../../api";
import { Button } from "../../ui/Button";
import { Card, CardHeader, CardContent } from "../../ui/Card";

const VideoDetails = () => {
  const { id } = useParams(); 
  const [videoDetails, setVideoDetails] = useState(null);
  const [isTranscoding, setIsTranscoding] = useState(false);
  const [transcodeOption, setTranscodeOption] = useState(null);
  const [transcodedFileUrl, setTranscodedFileUrl] = useState(null);

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
    let url = transcodeOption === "audio" ? `/video/audio` : `/video/resolution`;
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
      <h1 className="text-4xl font-bold mb-6">Video Transcoder</h1>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Video */}
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

        {/* Transcoded Video */}
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

      {/* Transcode Options */}
      {videoDetails && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Select Transcode Option</h2>

          <div className="flex flex-col space-y-4">
            <Button variant="outline" onClick={() => setTranscodeOption("audio")}>
              Convert to Audio (MP3)
            </Button>
            <Button variant="outline" onClick={() => setTranscodeOption("1280:720")}>
              Change Resolution to 720p
            </Button>
            <Button variant="outline" onClick={() => setTranscodeOption("640:480")}>
              Change Resolution to 480p
            </Button>
            <Button variant="outline" onClick={() => setTranscodeOption("320:240")}>
              Change Resolution to 240p
            </Button>
          </div>

          <div className="mt-6">
            <Button onClick={handleTranscode} disabled={isTranscoding}>
              {isTranscoding ? (
                <>
                  <Loader className="inline-block mr-2 animate-spin" /> Transcoding...
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
