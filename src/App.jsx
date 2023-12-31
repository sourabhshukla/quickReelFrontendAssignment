import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import EmptyVideoPlayer from "./components/EmptyVideoPlayer";
import VideoSection from "./components/VideoSection";
export const VideoContext = createContext();
function App() {
  const [currVideo, setCurrVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const inputRef = useRef();
  const activateInput = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    console.log(allVideos);
  }, [allVideos]);

  return (
    <VideoContext.Provider
      value={{
        currVideo,
        setCurrVideo,
        allVideos,
        setAllVideos,
        inputRef,
        activateInput,
        isLoading,
        setIsLoading,
      }}
    >
      <div className="flex w-full flex-col">
        <Header />
        <VideoSection />
        {/* {!currVideo ? <EmptyVideoPlayer /> : <VideoPlayer />} */}
        {/* <VideoList /> */}
      </div>
    </VideoContext.Provider>
  );
}

export default App;
