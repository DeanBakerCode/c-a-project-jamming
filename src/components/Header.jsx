import React from 'react';
import './header.css';

export default function Header({ user, handleLogin }) {
	return (
		<header>
			<div className='banner'>
				<h1>JAMMMING</h1>
				<h1>Spotify Playlist Maker</h1>
			</div>
			<div className='user'>
				<p onClick={!user ? handleLogin : undefined} className={!user ? 'click' : ''}>
					{user ? user.display_name : 'Logged Out'}
				</p>
				{user && <img src={user.images[0].url} alt='user image' />}
			</div>
		</header>
	);
}
