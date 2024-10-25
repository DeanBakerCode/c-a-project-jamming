import React from 'react';
import './track.css';
import { MdKeyboardDoubleArrowRight, MdClose, MdPlayArrow } from 'react-icons/md';

export default function Track({ type, tracks, handleAddTrack, handleRemoveTrack, handlePreview }) {
	// console.log(JSON.stringify(tracks));
	const playPreview = (url) => {
		console.log('paying' + url);
		new Audio(url);
	};
	//
	const trackTime = (duration) => {
		const s = String(Math.floor((duration / 1000) % 60)).padStart(2, 0);
		const m = Math.floor((duration / 1000 / 60) % 60);
		const h = Math.floor((duration / 1000 / 60 / 60) % 24);
		if (h > 0) {
			const padM = String(m).padStart(2, 0);
			return `${h}:${padM}:${s}`;
		} else {
			return `${m}:${s}`;
		}
	};
	return (
		<div className='track-list'>
			<ul>
				{tracks &&
					tracks.length > 0 &&
					tracks.map((track, index) => {
						return (
							<li className='track' key={index} onClick={type === 'search' ? () => handleAddTrack(track) : () => handleRemoveTrack(track)}>
								<div className='track_head'>
									<div
										onClick={(e) => {
											e.stopPropagation();
											handlePreview(track);
										}}
									>
										<img src={track.image} alt='' className={track.previewUrl && 'preview'} />
										{track.previewUrl && <MdPlayArrow className='play-icon' />}
									</div>

									<div>
										<p className='title'>{track.name}</p>
										<p className='artist'>{track.artist}</p>
									</div>
								</div>

								<div className='track_tail'>
									<p className='duration'>{trackTime(track.duration)}</p>
									<div className='add-remove'>
										{type === 'search' ? (
											<MdKeyboardDoubleArrowRight style={{ color: 'lightgreen' }} />
										) : (
											<MdClose style={{ color: 'red' }} />
										)}
									</div>
								</div>
							</li>
						);
					})}

				{tracks === undefined ||
					(tracks && tracks.length === 0 && (
						<p className='no-result'>{type === 'search' ? 'Enter a search request above.' : 'Playlist is empty...'}</p>
					))}
			</ul>
		</div>
	);
}
