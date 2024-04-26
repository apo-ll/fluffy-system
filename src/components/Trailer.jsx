"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  MediaPlayer,
  MediaProvider,
  isYouTubeProvider,
  Title,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export function Trailer({ id, title }) {
  function onProviderChange(provider) {
    if (isYouTubeProvider(provider)) {
      provider.cookies = true;
    }
  }
  return (
    <MediaPlayer
      title={`${title}`}
      autoPlay={true}
      src={`youtube/${id}`}
      aspectRatio="16/9"
      onProviderChange={onProviderChange}
      canGoogleCast={true}
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}
