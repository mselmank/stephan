"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface HeroVideoDialogProps {
  children: React.ReactNode;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  className?: string;
  animationStyle?: "from-center" | "from-bottom";
}

const HeroVideoDialog = ({
  videoSrc,
  className,
  animationStyle = "from-center",
}: HeroVideoDialogProps) => {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={className}></button>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent
        className={`sm:max-w-[unset] top-0 left-0 !m-0 h-screen w-screen rounded-none overflow-hidden ${
          animationStyle === "from-center" ? "sm:zoom-in-center" : "sm:slide-up"
        }`}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          className="h-full w-full object-contain bg-black"
        />
      </DialogContent>
    </Dialog>
  );
};

export default HeroVideoDialog;
