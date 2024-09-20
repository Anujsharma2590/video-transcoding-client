import { File, ListFilter, PlusCircle, Search } from "lucide-react";
import React from "react";
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
const videos = [
  {
    id: 1,
    title: "Thinking Components",
    thumbnail: "https://picsum.photos/200/200",
    uploader: "Lena Logic",
  },
  {
    id: 2,
    title: "Functional Fury",
    thumbnail: "https://picsum.photos/200/200",
    uploader: "Beth Binary",
  },
  {
    id: 3,
    title: "React Rendezvous",
    thumbnail: "https://picsum.photos/200/200",
    uploader: "Ethan Byte",
  },
  {
    id: 4,
    title: "Stateful Symphony",
    thumbnail: "https://picsum.photos/200/200",
    uploader: "Beth Binary",
  },
  {
    id: 5,
    title: "Async Awakenings",
    thumbnail: "https://picsum.photos/200/200",
    uploader: "Nina Netcode",
  },
];

export function Dashboard() {
  return (
    <Card className="flex min-h-screen w-full flex-col  mt-10">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div>temp val</div>

          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all"> Videos</TabsTrigger>
                <TabsTrigger value="active">Transcoded video</TabsTrigger>
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
                <Button className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Upload
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <div className="flex flex-col items-center mt-10">
                <h2 className="text-2xl font-bold mb-4">Made for You</h2>
                <p className="text-muted-foreground mb-6">
                  Your personal playlists. Updated daily.
                </p>

                {/* Video Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((video) => (
                    <VideoCard
                      key={video.id}
                      title={video.title}
                      thumbnail={video.thumbnail}
                      uploader={video.uploader}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Card>
  );
}
