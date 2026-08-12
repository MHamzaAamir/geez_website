export default function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-video.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
