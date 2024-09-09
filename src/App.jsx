import React, { useState } from "react";
import Search from "./components/Search.jsx";
import Playlist from "./components/Playlist";
import "./App.css";
// auth module
import {authorize} from "./module.js";

function App() {
  // sample data
  const data = [
    { title: "Phat Butt", album: "Y2K!", artist: "Ice Spice", uri: "1" },
    { title: "SICKO MODE", album: "ASTROWORLD", artist: "Travis Scott", uri: "2" },
  ];
  const [tracks, setTracks] = useState(data)
// handle auth
  const [token, setToken] = useState("");
const handleAuth = () => {
  if(!token){
    setToken(authorize);
  }
}

  // search
  const [search, setSearch] = useState();
  const handleSearch = ({ target }) => {
    setSearch(() => target.value);
  };
  const submitSearch = () => {
    console.log(search)
    // search for tracks
    fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // save responce to tracks
    setTracks(data);

  };




  // playlist
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const handlePlayListName = ({ target }) => {
    setPlaylistName(target.value);
  };
  const [playlist, setPlaylist] = useState([]);
  // add to playlist
  const handleAddTrack = (track) => {
    if (!playlist.includes(track)) {
      setPlaylist(() => [track, ...playlist]);
    }
  };
  // remove from playlist
  const handleRemoveTrack = (track) => {
    setPlaylist((currPlaylist) =>
      currPlaylist.filter((currTrack) => currTrack !== track)
    );
  };
  const handleSavePlaylist = () => {
    // get tracks uid and send to Spotify
  };

  // render
  return (
    <>
      <div className="banner">
        <h1>Jammming</h1>
        {!token && <button onClick={handleAuth}>aUTH</button>}
      </div>
      <div className="container">
        <Search
          search={search}
          handleSearch={handleSearch}
          submitSearch={submitSearch}
          tracks={tracks}
          handleAddTrack={handleAddTrack}
        />
        <Playlist
          playlistName={playlistName}
          handlePlayListName={handlePlayListName}
          tracks={playlist}
          handleRemoveTrack={handleRemoveTrack}
          handleSavePlaylist={handleSavePlaylist}
        />
      </div>
    </>
  );
}

export default App;
