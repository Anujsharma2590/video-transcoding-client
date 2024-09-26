import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"; 

export const UploadModal = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload and Transcode Your Video</DialogTitle>
          <DialogDescription>
            Upload your video by dragging and dropping or browsing.
          </DialogDescription>
        </DialogHeader>
        {children}{" "}
        {/* This will be where the upload component will be inserted */}
        {/* <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};
