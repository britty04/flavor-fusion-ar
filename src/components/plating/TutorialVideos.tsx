
interface TutorialVideoProps {
  title: string;
  url: string;
  description: string;
}

interface TutorialVideosProps {
  videos: TutorialVideoProps[];
}

export const TutorialVideos = ({ videos }: TutorialVideosProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-lg shadow-sm border">
      <h3 className="col-span-full text-lg font-medium mb-2">Learn from the Experts</h3>
      {videos.map((video, index) => (
        <div key={index} className="space-y-2">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <h4 className="font-medium">{video.title}</h4>
          <p className="text-sm text-muted-foreground">{video.description}</p>
        </div>
      ))}
    </div>
  );
};
