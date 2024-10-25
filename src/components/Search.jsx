import React from 'react';
import './search.css';
import InputBox from './InputBox';
import Track from './Track';

export default function Search({ search, handleSearch, submitSearch, tracks, handleAddTrack, handlePreview }) {
	//
	return (
		<div className='search'>
			<h2>Search for tracks...</h2>
			<InputBox type='search' handleSearch={handleSearch} search={search} submitSearch={submitSearch} />
			<Track type='search' tracks={tracks} handleAddTrack={handleAddTrack} handlePreview={handlePreview} />
		</div>
	);
}
