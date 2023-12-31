import { useContext } from "react";
import { MdFileUpload } from "react-icons/md";
import { VideoContext } from "../App";

export default function EmptyVideoPlayer() {
  const { activateInput } = useContext(VideoContext);
  return (
    <div className="w-full flex justify-center">
      <div className="w-[1280px] h-[720px] flex justify-center items-center bg-slate-800">
        <button onClick={activateInput} className="btn btn-primary">
          <MdFileUpload />
          Upload A Video
        </button>
      </div>
    </div>
  );
}
