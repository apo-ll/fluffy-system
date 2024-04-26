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
  return (
    <MediaPlayer
      title={`${title}`}
      autoplay
      src={`https://www.youtube.com/watch?v=${id}`}
      aspectRatio="16/9"
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}
