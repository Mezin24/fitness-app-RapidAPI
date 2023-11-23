export interface Exercise {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export interface Video {
  video: {
    channelId: string;
    channelName: string;
    lengthText: string;
    publishedTimeText: string;
    thumbnails: Thumbnail[];
    title: string;
    videoId: string;
    viewCountText: string;
  };
}

interface Thumbnail {
  height: number;
  url: string;
  width: number;
}
