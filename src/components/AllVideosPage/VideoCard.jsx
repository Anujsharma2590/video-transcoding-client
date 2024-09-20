import { Card } from "../../ui/Card"; // Assuming you're using shadcn's Card
import React from "react";

export function VideoCard({ title, thumbnail, uploader }) {
  return (
    <Card className="w-48 sm:w-60 md:w-72 lg:w-80 flex flex-col items-center p-4 gap-2">
      {/* Thumbnail (image of the video) */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-36 object-cover rounded-md"
      />
      {/* Video title */}
      <h3 className="text-base font-semibold text-center">{title}</h3>
      {/* Optional uploader's name */}
      {uploader && <p className="text-sm text-muted-foreground">{uploader}</p>}
    </Card>
  );
}
