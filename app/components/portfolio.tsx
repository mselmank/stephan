"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroVideoDialog from "./hero-video-dialog";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = ["all", "photos", "videos", "events"];

  const works = [
    {
      id: 1,
      title: "Digital Dreamscape",
      category: "photos",
      image: "/placeholder.svg?height=400&width=600",
      videoUrl:
        "https://somhnrgibltmzpwfiemn.supabase.co/storage/v1/object/public/stephan/videos/harold%201.mp4",
      year: "2024",
    },
    {
      id: 2,
      title: "Abstract Harmony",
      category: "videos",
      image: "/placeholder.svg?height=400&width=600",
      videoUrl:
        "https://somhnrgibltmzpwfiemn.supabase.co/storage/v1/object/public/stephan/videos/harold%201.mp4",
      year: "2023",
    },
    {
      id: 3,
      title: "Harold",
      category: "events",
      image: "/placeholder.svg?height=400&width=600",
      videoUrl:
        "https://somhnrgibltmzpwfiemn.supabase.co/storage/v1/object/public/stephan/videos/harold%201.mp4",
      year: "2025",
    },
    {
      id: 4,
      title: "Neon Nights",
      category: "photos",
      image: "/placeholder.svg?height=400&width=600",
      videoUrl:
        "https://somhnrgibltmzpwfiemn.supabase.co/storage/v1/object/public/stephan/videos/MINI%20CLIP%20PLATOS.mp4",
      year: "2023",
    },
    {
      id: 5,
      title: "Nature's Whisper",
      category: "paintings",
      image: "/placeholder.svg?height=400&width=600",
      videoUrl:
        "https://somhnrgibltmzpwfiemn.supabase.co/storage/v1/object/public/stephan/videos/MINI%20CLIP%20PLATOS.mp4",
      year: "2024",
    },
    {
      id: 6,
      title: "Bronze Echo",
      category: "sculptures",
      image: "/placeholder.svg?height=400&width=600",
      videoUrl:
        "https://somhnrgibltmzpwfiemn.supabase.co/storage/v1/object/public/stephan/videos/MINI%20CLIP%20PLATOS.mp4",
      year: "2023",
    },
  ];

  const filteredWorks = works.filter((work) =>
    selectedCategory === "all" ? true : work.category === selectedCategory
  );

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm capitalize text-zinc-950"
            >
              {category}
            </Button>
          ))}
        </div>
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredId(work.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Card className="overflow-hidden bg-zinc-900">
                  <CardContent className="p-0">
                    <div className="group relative aspect-video">
                      {work.videoUrl ? (
                        <>
                          {hoveredId === work.id ? (
                            <video
                              src={work.videoUrl}
                              className="h-full w-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            ""
                          )}
                          <HeroVideoDialog
                            videoSrc={work.videoUrl}
                            thumbnailSrc={work.image}
                            thumbnailAlt={work.title}
                            className="absolute inset-0 z-80 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <div className="rounded-full bg-black/60 p-3 transition-transform duration-300 group-hover:scale-110">
                              <Maximize2 className="h-6 w-6 text-white" />
                            </div>
                          </HeroVideoDialog>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="text-xl font-semibold text-white">
                          {work.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-300">
                          {work.year}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
