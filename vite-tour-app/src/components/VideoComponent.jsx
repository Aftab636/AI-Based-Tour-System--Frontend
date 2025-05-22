import { useState, useRef } from "react";

const VideoComponent = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/Waterfall.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          Wanderlust
        </h1>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-10 right-10 z-20 focus:outline-none"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <img
          src={
            isPlaying
              ? "/assets/images/PauseButton.png"
              : "/assets/images/PlayButton.png"
          }
          alt={isPlaying ? "Pause" : "Play"}
          className="w-12 h-12 md:w-16 md:h-16 transition-transform hover:scale-110"
        />
      </button>
    </div>
  );
};

export default VideoComponent;
