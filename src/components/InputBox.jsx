import React from "react";
import { MdOutlineSearch, MdOutlineSave } from "react-icons/md";

export default function InputBox({
  type,
  search, handleSearch, submitSearch,
  playlistName,
  handlePlayListName,
  handleSavePlaylist,
}) {
  return (
    <div className="input-bar">
      {type === "search" ? (
        <input
          type="text"
          placeholder="Search for Artists or Songs"
          onChange={handleSearch}
          value={search}
        />
      ) : (
        <input type="text" value={playlistName} onChange={handlePlayListName} />
      )}

      {type === "search" ? (
        // seach
        <button onClick={submitSearch}>
         <MdOutlineSearch />
        </button>
      ) : (
        // save
        <button onClick={handleSavePlaylist}>
           <MdOutlineSave />
        </button>
      )}
    </div>
  );
}
