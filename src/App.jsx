import React, { useState } from "react";
import { useFaceApiEmotion } from "./hooks/useFaceApiEmotion";
import "./styles.css";

function App() {
  const [mood, setMood] = useState("neutral");

  // Use the hook, get the videoRef it manages
  const videoRef = useFaceApiEmotion(setMood);

  const moodMessages = {
    happy: "You're glowing today!",
    sad: "Take a break. It'll get better 💙",
    angry: "Breathe in, breathe out 😤",
    neutral: "Welcome! Pick your vibe 😌",
    disgusted: "Stay calm! It's just a feeling.",
    fearful: "You're safe here.",
    surprised: "Wow! Something unexpected happened.",
    contempt: "Stay positive!",
  };

  return (
    <div className={`app ${mood}`}>
      <h1>{moodMessages[mood] ?? "Welcome! Pick your vibe 😌"}</h1>

      <h2 style={{ textAlign: "center", fontSize: "2rem", marginTop: "10px" }}>
        Detected Mood: {mood}
      </h2>

      <video
        ref={videoRef}
        width="320"
        height="240"
        style={{ display: "block", margin: "20px auto" }}
        muted
        autoPlay
        playsInline
      />
    </div>
  );
}

export default App;
