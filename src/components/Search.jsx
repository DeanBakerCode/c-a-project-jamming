import React from "react";
import "./search.css";
import InputBox from "./InputBox";
import Track from "./Track";

export default function Search({
  search,
  handleSearch,
  submitSearch,
  tracks,
  handleAddTrack,
}) {
  //
  return (
    <div className="search">
      <InputBox
        type="search"
        handleSearch={handleSearch}
        search={search}
        submitSearch={submitSearch}
      />
      <Track type="search" tracks={tracks} handleAddTrack={handleAddTrack} />
    </div>
  );
}
