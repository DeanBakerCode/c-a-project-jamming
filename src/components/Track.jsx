import React from 'react';
import './track.css';
import { MdPlaylistAdd, MdPlaylistRemove } from 'react-icons/md';

export default function Track({ type, tracks, handleAddTrack, handleRemoveTrack }) {
	//
	return (
		<div className='track-list'>
			<ul>
				{tracks.map((track, index) => {
					return (
						<li className='track' key={index}>
							<img src={track.image} alt='' />
							<div>
								<p className='title'>{track.name}</p>
								<p className='artist'>
									{track.album} - {track.artist}
								</p>
							</div>
							{type === 'search' ? (
								<button className='add-remove' onClick={() => handleAddTrack(track)}>
									<MdPlaylistAdd />
								</button>
							) : (
								<button className='add-remove' onClick={() => handleRemoveTrack(track)}>
									<MdPlaylistRemove />
								</button>
							)}
						</li>
					);
				})}
			</ul>
			<p></p>
		</div>
	);
}
