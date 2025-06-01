import { useEffect, useRef } from "react";
import * as faceapi from "@vladmandic/face-api";

export const useFaceApiEmotion = (setMood) => {
  const videoRef = useRef(null);
  let animationFrameId = null;
  const lastMoodRef = useRef(null);

  useEffect(() => {
    const MODEL_URL = "/models";

    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(console.warn);
            startDetection();
          };
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    const startDetection = () => {
      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224 });

      const detect = async () => {
        if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) {
          animationFrameId = requestAnimationFrame(detect);
          return;
        }
        try {
          const result = await faceapi.detectSingleFace(videoRef.current, options).withFaceExpressions();
          if (result?.expressions) {
            const sorted = Object.entries(result.expressions).sort((a, b) => b[1] - a[1]);
            const [topMood, confidence] = sorted[0];
            if (confidence > 0.5 && lastMoodRef.current !== topMood) {
              lastMoodRef.current = topMood;
              setMood(topMood);
            }
          }
        } catch (err) {
          console.error("Detection error:", err);
        }
        animationFrameId = requestAnimationFrame(detect);
      };

      detect();
    };

    loadModels();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [setMood]);

  return videoRef;
};
