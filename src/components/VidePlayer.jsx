import { Play } from "lucide-react";
import React, { useState } from "react";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "oitc9Fjd4HA";
  const playIcon = "https://sekadaukabppid.kpu.go.id/img/segitiga.png";

  return (
    <section className="w-full bg-gradient-to-r from-red-900 to-red-700 py-16 px-6 md:px-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="text-white">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Video Pelayanan dan <br />
            Pengelolaan Informasi <br />
            Publik KPU RI
          </h1>

          <div className="flex  gap-2 mt-4 justify-end lg:mr-20">
            <img
              src={playIcon}
              alt="Icon"
              className="w-20 h-8 hidden lg:block items-end  justify-end"
            />
          </div>
        </div>

        {/* Right Video Section */}
        <div className="relative">
          {!isPlaying ? (
            <div
              className="relative cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video Thumbnail"
                className="rounded-xl shadow-2xl w-full"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-xl group-hover:bg-black/50 transition duration-300"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/40 hover:scale-110 transition duration-300">
                  <Play className="text-white" size={40} />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-video rounded-xl shadow-2xl overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoPlayer;
