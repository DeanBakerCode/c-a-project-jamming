import React from 'react';
import { MdOutlineStop } from 'react-icons/md';
import './header.css';

export default function Header({ user, audioRef, previewTrack, setPreviewTrack }) {
	const handlePlay = () => {
		audioRef.current.pause();
		setPreviewTrack({});
	};

	return (
		<div className='header'>
			<div className='banner'>
				<div className='logo'>
					<h1>JAMMMING</h1>
				</div>

				<div className={previewTrack.previewUrl ? 'trackPreview' : 'hide'}>
					<img className='animation' alt='' src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif' />
					<div className='track-content'>
						<img src={previewTrack.image} alt='album art' className='track-image' />
						<div>
							<p className='track-title'>{previewTrack.name}</p>
							<p className='track-artist'>{previewTrack.artist}</p>
						</div>
					</div>
					<div>
						<audio ref={audioRef} onEnded={() => setPreviewTrack({})}>
							<source src={previewTrack.previewUrl} type='audio/mpeg' />
						</audio>
						<button onClick={handlePlay} className='play-stop'>
							<MdOutlineStop />
						</button>
					</div>
				</div>

				<div className='user' onClick={!user ? handleLogin : undefined}>
					<p>{user.display_name}</p>
					<img src={user.images[0].url} alt='user image' />
				</div>
			</div>
		</div>
	);
}
