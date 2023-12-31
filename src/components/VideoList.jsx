import React, { useContext } from "react";
import { VideoContext } from "../App";

export default function VideoList() {
  const { allVideos, setCurrVideo } = useContext(VideoContext);
  return (
    <ul className="menu bg-base-200 w-[400px] rounded-box">
      <li className="menu-title">All Videos</li>
      {allVideos.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="w-full text-xl">No Videos Uploaded</p>
        </div>
      ) : (
        allVideos.map((video) => {
          return (
            <li
              onClick={() => {
                setCurrVideo(video);
              }}
            >
              <div className="flex flex-row items-center justify-between">
                <video width={178} height={100} src={video.url}></video>
                <p>{video.name}</p>
              </div>
            </li>
          );
        })
      )}
    </ul>
  );
}
