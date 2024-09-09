import React from "react";
import "./playlist.css";
import Track from "./Track";
import InputBox from "./InputBox";

export default function Playlist({
  playlistName,
  handlePlayListName,
  tracks,
  handleRemoveTrack,
  handleSavePlaylist,
}) {
  return (
    <div className="playlist">
      <InputBox
        type="playlist"
        playlistName={playlistName}
        handlePlayListName={handlePlayListName}
        handleSavePlaylist={handleSavePlaylist}
      />
      <Track
        type="playlist"
        tracks={tracks}
        handleRemoveTrack={handleRemoveTrack}
      />
    </div>
  );
}
