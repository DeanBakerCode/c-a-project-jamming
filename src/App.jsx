import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Search from './components/Search.jsx';
import Playlist from './components/Playlist';
import './App.css';
// auth module
import spotify from './utility/SpotifyAPI.js';

function App() {
	// const sampleData = [{ id: '1', name: 'Phat Butt', album: 'Y2K!', artist: 'Ice Spice', uri: '' }];

	// tracks

	// search state and handlers
	const [search, setSearch] = useState();
	const handleSearch = ({ target }) => {
		setSearch(() => target.value);
	};

	// playlist Name
	const [playlistName, setPlaylistName] = useState('My Playlist');
	const handlePlayListName = ({ target }) => {
		setPlaylistName(target.value);
	};
	// playlist tracks
	const [playlistTracks, setPlaylistTracks] = useState([]);

	// add to playlist
	const handleAddTrack = (track) => {
		if (!playlistTracks.includes(track)) {
			setPlaylistTracks((currPlaylist) => [track, ...currPlaylist]);
		}
	};
	// remove from playlist
	const handleRemoveTrack = (track) => {
		setPlaylistTracks((currPlaylist) => currPlaylist.filter((currTrack) => currTrack !== track));
	};
	//searched tracks
	const [tracks, setTracks] = useState([]);

	//* API
	//*-----------------------------------------------------------------------

	// API call to log user into app
	const [user, setUser] = useState(null);
	const handleLogin = () => {
		spotify.getAuthorize();
	};
	useEffect(() => {
		try {
			console.log('trying auth from App');
			spotify.authorize();
			spotify.user().then((response) => {
				setUser(response);
			});
		} catch {
			// console.log('not logged in');
		}
	}, []);
	//API call - Search for track
	const submitSearch = () => {
		spotify
			.search(search)
			.then((response) => {
				setTracks(response);
			})
			.then(() => {
				setSearch(() => '');
			});
	};
	// API call - Save playlist to users account
	const handleSavePlaylist = () => {
		setSearch('');
		setTracks([]);
		// get tracks uid and send to Spotify
		const uris = playlistTracks.map((each) => each.uri);
		spotify.save(playlistName, uris);
		setPlaylistTracks([]);
		setPlaylistName('');
	};

	//* RENDER
	//*-----------------------------------------------------------------------
	return (
		<div>
			<Header user={user} handleLogin={handleLogin} />
			<div className='container'>
				{user && (
					<>
						<Search
							handleSearch={handleSearch}
							search={search}
							submitSearch={submitSearch}
							tracks={tracks}
							handleAddTrack={handleAddTrack}
						/>
						<Playlist
							playlistName={playlistName}
							handlePlayListName={handlePlayListName}
							playlistTracks={playlistTracks}
							handleRemoveTrack={handleRemoveTrack}
							handleSavePlaylist={handleSavePlaylist}
						/>
					</>
				)}
				{!user && (
					<div onClick={handleLogin} className='LoginButton'>
						<h1>Login</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
