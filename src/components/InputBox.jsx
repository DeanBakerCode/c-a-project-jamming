import React from 'react';
import { MdOutlineSearch, MdOutlineSave } from 'react-icons/md';
import './inputBox.css';

export default function InputBox({ type, search, handleSearch, submitSearch, playlistName, handlePlayListName, handleSavePlaylist }) {
	return (
		<div className='input-bar' onSubmit={(e) => e.preventDefault}>
			{type === 'search' ? (
				<input type='text' placeholder='Search for Artists or Songs' onChange={handleSearch} value={search} required />
			) : (
				<input type='text' value={playlistName} onChange={handlePlayListName} required />
			)}

			{type === 'search' ? (
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
