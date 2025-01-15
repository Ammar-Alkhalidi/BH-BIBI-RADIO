import React from "react";
import "react-h5-audio-player/lib/styles.css";

const AudioPlayer = ({ src }) => (
  <audio controls>
    <source src={src} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
);

export default AudioPlayer;
