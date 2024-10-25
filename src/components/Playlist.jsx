import React from 'react';
import './playlist.css';
import Track from './Track';
import InputBox from './InputBox';

export default function Playlist({
	playlistName,
	handlePlayListName,
	playlistTracks,
	handleRemoveTrack,
	handleSavePlaylist,
	handlePreview,
}) {
	return (
		<div className='playlist'>
			<h1>Save to playlist</h1>
			<InputBox
				type='playlist'
				playlistName={playlistName}
				handlePlayListName={handlePlayListName}
				handleSavePlaylist={handleSavePlaylist}
			/>
			<Track type='playlist' tracks={playlistTracks} handleRemoveTrack={handleRemoveTrack} handlePreview={handlePreview} />
		</div>
	);
}
