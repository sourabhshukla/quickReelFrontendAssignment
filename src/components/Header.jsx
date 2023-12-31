import { useContext, useRef } from "react";
import { VideoContext } from "../App";

export default function Header() {
  const { setCurrVideo, inputRef, activateInput, allVideos, setAllVideos } =
    useContext(VideoContext);

  const uploadVideo = (e) => {
    const seletedFile = e.target.files[0];
    console.log("here", seletedFile);

    if (seletedFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const videoDataUrl = event.target.result;
        setCurrVideo(videoDataUrl);
        if (allVideos.includes(videoDataUrl)) {
          console.log("Already present");
        } else setAllVideos([...allVideos, videoDataUrl]);
        console.log("Video Data Url", videoDataUrl);
      };
      reader.readAsDataURL(seletedFile);
    }
  };
  return (
    <header className="w-full h-16 bg-base-200 flex justify-end items-center pr-4">
      <input
        type="file"
        accept="video/*"
        ref={inputRef}
        className="hidden"
        onChange={uploadVideo}
      />
      <button
        className="btn btn-primary text-lg cursor-pointer"
        onClick={activateInput}
      >
        Upload
      </button>
    </header>
  );
}
