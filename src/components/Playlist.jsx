import React from 'react';
import './playlist.css';
import Track from './Track';
import InputBox from './InputBox';

export default function Playlist({ playlistName, handlePlayListName, playlistTracks, handleRemoveTrack, handleSavePlaylist }) {
	return (
		<div className='playlist'>
			<h2>Add to your Playlist</h2>
			<InputBox
				type='playlist'
				playlistName={playlistName}
				handlePlayListName={handlePlayListName}
				handleSavePlaylist={handleSavePlaylist}
			/>
			<Track type='playlist' tracks={playlistTracks} handleRemoveTrack={handleRemoveTrack} />
		</div>
	);
}
