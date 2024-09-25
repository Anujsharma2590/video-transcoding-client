import { File, ListFilter, PlusCircle, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import { Card } from "../../ui/Card";
import { Input } from "../../ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/Tabs";
import { Button } from "../../ui/Button";
import { VideoCard } from "./VideoCard";
import { ScrollArea } from "../../ui/scroll-area";
import VideoUpload from "../../VideoUpload";
import { UploadModal } from "../UploadModal";
import TranscodeJobs from "./TranscodeJobs";
import api from "../../api.js";
import { Skeleton } from "../../ui/skeleton";

const jobsData = {
  count: 2,
  job: [
    {
      target_format: "Extract Audio from Video",
      transcoded_file_url:
        "https://mypocbucket-testing.s3.ap-south-1.amazonaws.com/video/1/vid_8aw6d99u",
      status: "completed",
      created_at: "2024-09-20T12:45:18.000Z",
      updated_at: "2024-09-20T12:45:18.000Z",
      video: {
        video_code: "vid_8aw60vpl",
        original_file_url:
          "https://mypocbucket-testing.s3.ap-south-1.amazonaws.com/video/1/vid_8aw60vpl",
        user: {
          email: "rahul.aggarwal@travclan.com",
        },
      },
    },
    {
      target_format: "Resolution Update",
      transcoded_file_url:
        "https://mypocbucket-testing.s3.ap-south-1.amazonaws.com/video/1/vid_8aw68k6u",
      status: "completed",
      created_at: "2024-09-20T12:40:04.000Z",
      updated_at: "2024-09-20T12:40:04.000Z",
      video: {
        video_code: "vid_8aw60vpl",
        original_file_url:
          "https://mypocbucket-testing.s3.ap-south-1.amazonaws.com/video/1/vid_8aw60vpl",
        user: {
          email: "rahul.aggarwal@travclan.com",
        },
      },
    },
  ],
};

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch videos from API
    const fetchVideos = async () => {
      try {
        const response = await api.get("/video/fetch");
        const fetchedVideos = response.data.video || [];
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className="flex min-h-100 w-full flex-col bg-muted/40 mt-10">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-8">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="font-semibold">Video Transcoder Dashboard</div>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </header>
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All Videos</TabsTrigger>
                <TabsTrigger value="active">Transcoding Jobs</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Completed
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button className="gap-1" onClick={handleModalOpen}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Upload
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <div className="flex flex-col mt-10">
                <h2 className="text-3xl font-bold mb-2">All Videos</h2>
                <p className="text-muted-foreground mb-4">
                  View and manage your videos. You can transcode videos or
                  extract audio.
                </p>

                {/* Skeleton Loader while fetching videos */}
                {loading ? (
                  <ScrollArea
                    className="h-96 w-full"
                    style={{ height: "32rem" }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 pr-3">
                      {[...Array(8)].map((_, index) => (
                        <div className="flex flex-col space-y-3" key={index}>
                          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <ScrollArea
                    className="h-96 w-full"
                    style={{ height: "32rem" }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 pr-3">
                      {videos.length > 0 ? (
                        videos.map((video, index) => (
                          <VideoCard
                            key={video.video_code}
                            title={
                              video.meta_data.video_name
                                ? video.meta_data.video_name
                                : `Untitled Video - ${index + 1}`
                            }
                            thumbnail={
                              video.meta_data.thumbnailUrl ||
                              "https://via.placeholder.com/320x240.png?text=No+Thumbnail"
                            }
                            id={video.video_code}
                            created_at={video.created_at || "Unknown"}
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                    {videos.length === 0 && (
                      <div className="h-full flex items-center justify-center text-center font-bold text-2xl">
                        No videos found
                      </div>
                    )}
                  </ScrollArea>
                )}
              </div>
            </TabsContent>
            <TabsContent value="active">
              <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Transcoding Jobs</h1>
                <TranscodeJobs jobs={jobsData.job} />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <UploadModal open={isModalOpen} onClose={handleModalClose}>
        <VideoUpload />
      </UploadModal>
    </Card>
  );
}
