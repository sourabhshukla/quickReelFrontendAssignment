import { useContext } from "react";
import VideoList from "./VideoList";
import { VideoContext } from "../App";
import EmptyVideoPlayer from "./EmptyVideoPlayer";
import VideoPlayer from "./VideoPlayer";

export default function VideoSection() {
  const { currVideo } = useContext(VideoContext);
  return (
    <div className="flex mt-[40px] justify-around w-full">
      {!currVideo ? <EmptyVideoPlayer /> : <VideoPlayer />}
      <VideoList />
    </div>
  );
}
