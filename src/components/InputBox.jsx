import React, { useEffect, useRef } from 'react';
import { MdOutlineSearch, MdOutlineSave, MdClose } from 'react-icons/md';
import './inputBox.css';

export default function InputBox({ type, search, handleSearch, playlistName, handlePlayListName, handleSavePlaylist }) {
	const inputRef = useRef({});

	const focusInput = () => {
		inputRef.current.focus();
	};
	const clearInput = () => {
		inputRef.current.value = '';
		focusInput();
	};
	useEffect(() => {
		//on page load focus input
		if (type === 'search') {
			inputRef.current.focus();
		}
	}, []);

	return (
		<div className='input-bar' onSubmit={(e) => e.preventDefault}>
			{type === 'search' ? (
				<>
					<div className='icon'>
						<MdOutlineSearch />
					</div>
					<input type='text' placeholder='Search for Artists or Songs' onChange={handleSearch} value={search} required ref={inputRef} />
					{inputRef.current && inputRef.current.value && !inputRef.current.value.length == '0' && (
						<div className='icon pointer' onClick={clearInput}>
							<MdClose />
						</div>
					)}
				</>
			) : (
				<>
					<input type='text' value={playlistName} onChange={handlePlayListName} required placeholder='Name your new Playlist' />
					<div className='icon pointer' onClick={handleSavePlaylist}>
						<MdOutlineSave />
					</div>
				</>
			)}
		</div>
	);
}
