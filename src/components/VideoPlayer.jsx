import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";

function VideoPlayer() {
  const videoRef = useRef();
  const canvasRef = useRef();

  const [progress, setProgress] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const handlePlay = () => {
    console.log(videoRef.current.currentTime);
    if (play) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlay(!play);
  };

  const handleSeek = (e) => {
    const seekTime =
      (e.nativeEvent.offsetX / e.target.clientWidth) *
      videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  const handleVideoEnded = () => {
    setPlay(false);
  };

  const startVideo = () => {
    videoRef.current.src = "video.mp4";
    videoRef.current.play().catch((error) => {
      console.error("Error starting video playback:", error);
    });
  };

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setProgress(((currentTime * 100) / duration).toFixed(2));
    console.log(currentTime, duration);
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      // Check if the video dimensions are available
      if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();
        console.log(detections);
        // videoRef.current.videoWidth = 1280;
        // videoRef.current.videoHeight = 720;

        canvasRef.current.width = 1280;
        canvasRef.current.height = 720;

        faceapi.matchDimensions(canvasRef.current, {
          width: 1280,
          height: 720,
        });

        const resized = faceapi.resizeResults(detections, {
          width: 1280,
          height: 720,
        });

        faceapi.draw.drawDetections(canvasRef.current, resized);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
      }
    }, 1000);
  };

  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="flex items-center relative">
        <video
          crossOrigin="anonymous"
          ref={videoRef}
          // controls
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => {
            setPlay(true);
          }}
          onEnded={handleVideoEnded}
          onLoadedData={() => {
            console.log("loading complete");
          }}
          autoPlay
          playsInline
          width={1280}
          height={720}
        ></video>
        <div className="h-full w-full absolute flex justify-center items-center z-[200]">
          {play ? (
            <FaPause
              className="fill-white w-[70px] h-[70px] cursor-pointer"
              onClick={handlePlay}
            />
          ) : (
            <FaPlay
              className="fill-white w-[70px] h-[70px] cursor-pointer"
              onClick={handlePlay}
            />
          )}
          {/* <FaPlay  className="playBtn" /> */}
          <div className="absolute bottom-2 w-full flex gap-5 flex-col items-center">
            <div className="w-full flex justify-between items-center">
              {progress}
              <div
                className="bg-gray-400 w-[90%] h-[10px] b-[50px] rounded-lg cursor-pointer"
                onClick={handleSeek}
              >
                <div
                  className="bg-red-500 h-full rounded-lg"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {videoRef.current && (videoRef.current.duration || "00:00")}
            </div>
            {play ? (
              <FaPause
                className="fill-white w-[70px] h-[70px] cursor-pointer"
                onClick={handlePlay}
              />
            ) : (
              <FaPlay
                className="fill-white w-[70px] h-[70px] cursor-pointer"
                onClick={handlePlay}
              />
            )}
          </div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width="940"
        height="65"
        className="absolute z-[100] top-[100px]"
      />
    </div>
  );
}

export default VideoPlayer;
