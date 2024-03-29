import React from "react";

// plugin imports
import "video.js";
import VREPlayer from "videojs-react-enhanced";
import "videojs-youtube/dist/Youtube";

// CSS imports
import "video.js/dist/video-js.css";
import "./YoutubePlayer.css";

export default function YoutubePlayer({ sourceLink, audioOnly = false }) {
  console.log("AUDIO ONLY", audioOnly);

  const playerOptions = {
    controls: true,
    autoplay: "play",
    audioPosterMode: audioOnly,
  };

  const resources = {
    sources: [
      {
        type: "video/youtube",
        src: sourceLink,
      },
    ],
    youtube: {},
  };

  let videojsOptions = {
    fluid: true,
    techOrder: ["youtube"],
  };

  const onPlayerReady = (player) => {
    console.log("Player Ready!");

    document
      .getElementsByClassName("vjs-poster")[0]
      .classList.remove("vjs-hidden");
  };

  if (!sourceLink) return "";

  return (
    <VREPlayer
      id="myPlayer"
      playerOptions={playerOptions}
      videojsOptions={videojsOptions}
      resources={resources}
      onReady={onPlayerReady.bind(this)}
      onPlay={(e, _, second) => console.log("Play!")}
      onPause={(e, _, second) => console.log("Pause!")}
      onEnded={(e, _) => console.log("Ended!")}
    />
  );
}
