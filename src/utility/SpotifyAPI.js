import { generateRandomString } from './utility';
let user_id;
const spotifyAPIurl = 'https://api.spotify.com';
const client_id = import.meta.env.VITE_CLIENT_ID;
const redirect_uri = 'http://localhost:5173/';

// token

const spotify = {
	_token: null,
	_user_id: null,

	set token(token) {
		if (token.length > 20 && typeof token === 'string') {
			this._token = token;
		}
		console.log(`Token has been set to: ${this._token}`);
		window.setTimeout(() => {
			this.token = '';
			this.authorize();
		}, 3000000);
	},
	get token() {
		return this._token;
	},

	set user_id(responseId) {
		if (responseId.length > 3 && typeof responseId === 'string') {
			this._user_id = responseId;
		}
		console.log(`userid set to: ${this._user_id}`);
	},
	get user_id() {
		return this._user_id;
	},
	// authorization
	authorize() {
		// initiate Auth, then on return useEffect goes to authorize() to saves the token and logs in
		const scope = 'user-read-private  ugc-image-upload user-read-email playlist-modify-public';
		// build end point url
		let url = 'https://accounts.spotify.com/authorize';
		url += '?response_type=token';
		url += '&client_id=' + encodeURIComponent(client_id);
		url += '&scope=' + encodeURIComponent(scope);
		url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
		url += '&show_dialog=false';
		// Send client to Spotify for Authorization.
		window.location = url;
	},
	// on return set the token in memory
	async setToken() {
		const tokenUrl = window.location.href.match(/access_token=([^&]*)/);
		const expiryUrl = window.location.href.match(/expires_in=([^&]*)/);
		const stateUrl = window.location.href.match(/state=([^&]*)/);

		if (tokenUrl) {
			this.token = tokenUrl[1];
			if (this._token) {
				window.history.pushState('Access Token', null, '/'); // This clears the URL
			} else {
				alert('error saving your Spotify token');
			}
		}

		return;
	},
	// get the user profile
	async user() {
		// spotify.authorize();
		const endpoint = spotifyAPIurl + '/v1/me';
		if (this._token) {
			try {
				const response = await fetch(endpoint, {
					headers: {
						Authorization: `Bearer ${this._token}`,
					},
				});
				const jsonResponse = await response.json();
				this.user_id = jsonResponse.id;
				return jsonResponse;
			} catch (error) {
				console.log(error);
			}
		}
	},
	// Search for user entered query
	async search(query) {
		const endpoint = `${spotifyAPIurl}/v1/search?q=${query.trim()}&type=track&market=au`;
		try {
			// console.log(this.token);
			const response = await fetch(endpoint, {
				method: 'GET',
				headers: { Authorization: `Bearer ${this._token}` },
			});
			const jsonResponse = await response.json();
			if (!jsonResponse.tracks) {
				return [];
			} else {
				return await jsonResponse.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
					image: track.album.images[0].url,
					duration: track.duration_ms,
					previewUrl: track.preview_url,
				}));
			}
		} catch (error) {
			console.log(error);
		}
	},
	// Save created playlist to user profile
	async save(PlaylistName, tracksUri) {
		// create new playlist
		let playlist_id = '';
		try {
			console.log('trying first fetch');
			const response = await fetch(`${spotifyAPIurl}/v1/users/${this.user_id}/playlists`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
				method: 'POST',
				body: JSON.stringify({
					name: PlaylistName,
				}),
			});
			const jsonResponse = await response.json();
			playlist_id = jsonResponse.id;
			console.log('trying second fetch');
			const sendTracks = await fetch(`${spotifyAPIurl}/v1/playlists/${playlist_id}/tracks`, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
				method: 'POST',
				body: JSON.stringify({
					uris: tracksUri,
				}),
			});
			return `Playlist "${PlaylistName}" has been saved to your Spotify account`;
		} catch (error) {
			console.log(error);
		}
	},
};

export default spotify;
//
