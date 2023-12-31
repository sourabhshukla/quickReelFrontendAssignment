import "./App.css";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
function App() {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <VideoPlayer />
    </div>
  );
}

export default App;
