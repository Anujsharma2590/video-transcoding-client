import React from "react";
import { Button } from "../../ui/Button"; // shadcn Button
import { Card } from "../../ui/Card"; // shadcn Card
import { Download, Eye, ArrowRight } from "lucide-react"; // Icons from lucide-react

const TranscodeJobs = ({ jobs }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <Card key={index} className="p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center justify-between">
            {/* Left Section: Original Video Info */}
            <div className="flex items-center gap-4">
              {/* Original Video Info */}
              <div>
                <h3 className="font-semibold">Original Video</h3>
                <p className="text-sm text-gray-500"> Created At: {new Date(job.created_at).toLocaleString()}</p>
              </div>

              {/* Arrow Icon */}
              <ArrowRight className="h-6 w-6 text-gray-400" />
            </div>

            {/* Right Section: Transcoded Video Info */}
            <div className="flex items-center gap-4">
              {/* Transcoded Video Info */}
              <div className="flex flex-col">
                <h3 className="font-semibold">Transcoded File</h3>
                <p className="text-sm text-gray-500">{job.target_format}</p>
              </div>

              {/* View and Download Buttons */}
              <div className="flex gap-2">
                {/* View Button */}
                <Button size="sm" variant="outline" asChild className="flex items-center gap-1">
                  <a
                    href={job.transcoded_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" /> 
                  </a>
                </Button>

                {/* Download Button */}
                <Button size="sm" variant="default" asChild className="flex items-center gap-1">
                  <a
                    href={job.transcoded_file_url}
                    download
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TranscodeJobs;
