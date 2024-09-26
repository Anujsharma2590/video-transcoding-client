import React, { useEffect, useState } from "react";
import { Button } from "../../ui/Button"; 
import { Card } from "../../ui/Card"; 
import { Download, Eye, ArrowRight, Loader, CheckCircle, XCircle, Clock } from "lucide-react"; 
import api from "../../api"; 
import { Skeleton } from "../../ui/skeleton";

const TranscodeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/video/job/");
        setJobs(response.data.job || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load transcoded jobs.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const downloadVideo = async (transcodedFileUrl) => {
    try {
      const response = await api.get(`/video/download/`, {
        params: { video_url: transcodedFileUrl },
        responseType: 'blob', 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'video.mp4'); 
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error downloading video:", err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-500 h-5 w-5" />;
      case "processing":
        return <Loader className="text-blue-500 h-5 w-5 animate-spin" />;
      case "completed":
        return <CheckCircle className="text-green-500 h-5 w-5" />;
      case "failed":
        return <XCircle className="text-red-500 h-5 w-5" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[100px] width-fullrounded-xl mb-2" />
        <Skeleton className="h-[100px] width-full rounded-xl mb-2" />
        <Skeleton className="h-[100px] width-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No transcoding jobs found.</p>
      ) : (
        jobs.map((job, index) => (
          <Card
            key={index}
            className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 "
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 flex-shrink-0">
                {job.video.meta_data?.thumbnailUrl ? (
                  <img
                    src={job.video.meta_data.thumbnailUrl}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                    <Video className="h-10 w-10 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-800">
                  {job.video.meta_data?.video_name || "Untitled Video"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Created At: {new Date(job.created_at).toLocaleString()}
                </p>

                <div className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-500">
                    {job.target_format}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">
                    {job.target_format}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1">
                  {getStatusIcon(job.status)}
                  <span className="text-sm font-semibold capitalize">
                    {job.status}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="flex items-center gap-1"
                  >
                    <a
                      href={job.transcoded_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" /> View
                    </a>
                  </Button>

                  <Button
                    size="sm"
                    variant="default"
                    className="flex items-center gap-1"
                    onClick={() => downloadVideo(job.transcoded_file_url)}
                  >
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </div>
              </div>
            </div>
       
          </Card>
        ))
      )}
    </div>
  );
};

export default TranscodeJobs;
