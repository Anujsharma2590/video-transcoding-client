import { File, ListFilter, PlusCircle, Search } from "lucide-react";
import React, {useState} from "react";
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

const videos = [
  {
    video_code: "vid_8aw60vpl",
    title: "Thinking Components",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Lena Logic",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Functional Fury",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Beth Binary",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "React Rendezvous",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Ethan Byte",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Stateful Symphony",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Beth Binary",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Async Awakenings",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Nina Netcode",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "React Rendezvous",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Ethan Byte",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Stateful Symphony",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Beth Binary",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Async Awakenings",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Nina Netcode",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Functional Fury",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Beth Binary",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "React Rendezvous",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Ethan Byte",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Stateful Symphony",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Beth Binary",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Async Awakenings",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Nina Netcode",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "React Rendezvous",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Ethan Byte",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Stateful Symphony",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Beth Binary",
  },
  {
    video_code: "vid_8aw60vpl",
    title: "Async Awakenings",
    thumbnail: "https://picsum.photos/300/200",
    uploader: "Nina Netcode",
  },
];

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
          <div className="font-semibold">Dashboard</div>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </header>
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All Videos</TabsTrigger>
                <TabsTrigger value="active">Transcoded Videos</TabsTrigger>
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
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
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
                <h2 className="text-3xl font-bold mb-2">Made for You</h2>
                <p className="text-muted-foreground mb-4">
                  Your personal playlists. Updated daily.
                </p>

                {/* Video Cards Grid */}
                {/* <ScrollArea className="h-96 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 pr-3">
                  {videos.map((video) => (
                    <VideoCard
                      key={video.video_code} 
                      title={video.title}
                      thumbnail={video.thumbnail}
                      uploader={video.uploader}
                      id={video.video_code}
                    />
                  ))}
                </div>
          
                </ScrollArea> */}
                  <img src="/no-data-found.png" alt="no dtata foiund" height={20} />
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
