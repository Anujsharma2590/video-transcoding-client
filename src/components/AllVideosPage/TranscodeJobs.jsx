import React, { useEffect, useState } from "react";
import { Button } from "../../ui/Button"; // shadcn Button
import { Card } from "../../ui/Card"; // shadcn Card
import { Download, Eye, ArrowRight } from "lucide-react"; // Icons from lucide-react
import api from "../../api"; // Axios instance (adjust this import if needed)
import { Spin } from "antd"; // Optional loading spinner
import { Skeleton } from "@/ui/skeleton";

const TranscodeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transcoded jobs from the API
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
              {/* Left Section: Thumbnail or Video Icon */}
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

              {/* Middle Section: Job Details */}
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

              {/* Right Section: Buttons */}
              <div className="flex gap-3">
                {/* View Button */}
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

                {/* Download Button */}
                <Button
                  size="sm"
                  variant="default"
                  asChild
                  className="flex items-center gap-1"
                >
                  <a
                    href={job.transcoded_file_url}
                    download
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" /> Download
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default TranscodeJobs;
