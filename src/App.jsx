import { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
export const VideoContext = createContext();
function App() {
  const [currVideo, setCurrVideo] = useState();
  const [allVideos, setAllVideos] = useState();

  return (
    <VideoContext.Provider
      value={(currVideo, setCurrVideo, allVideos, setAllVideos)}
    >
      <div className="flex w-full flex-col">
        <Header />
        <VideoPlayer />
      </div>
    </VideoContext.Provider>
  );
}

export default App;
