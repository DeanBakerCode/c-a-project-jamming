import { generateRandomString } from './utility';
let token;
let user_id;
// token

const spotify = {
	getAuthorize() {
		// initiate Auth, then on return Useeffect goes to authorize() to saves the token and logs in
		const state = generateRandomString(16);
		localStorage.setItem('spotify_auth_state', state);
		const client_id = 'f3483c6011d74df2826d4af168a0deb7';
		const redirect_uri = 'http://localhost:5173/';
		const scope = 'user-read-private  ugc-image-upload user-read-email playlist-modify-public';
		// build end point url
		let url = 'https://accounts.spotify.com/authorize';
		url += '?response_type=token';
		url += '&client_id=' + encodeURIComponent(client_id);
		url += '&scope=' + encodeURIComponent(scope);
		url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
		url += '&state=' + encodeURIComponent(state);
		url += '&show_dialog=true';
		window.location = url;
	},
	authorize() {
		console.log('auth function');
		if (token) {
			console.log(`we have a token, returning: ${token}`);
			return token;
		}
		const tokenUrl = window.location.href.match(/access_token=([^&]*)/);
		const expiryUrl = window.location.href.match(/expires_in=([^&]*)/);
		const stateUrl = window.location.href.match(/state=([^&]*)/);
		if (!token) {
			//
			console.log('setting token');
			token = tokenUrl[1];
			console.log('1');
			// const expiresIn = Number(expiryUrl[1]) * 1000;
			console.log('2');
			window.setTimeout(() => (token = ''), expiresIn);
			window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
			console.log(`token: ${token}`);
			return token;
		}
	},

	user() {
		// spotify.authorize();
		if (token) {
			return fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((userResponse) => userResponse.json())
				.then((userResponseJson) => {
					// id
					// display_name
					// iamges[0].url
					user_id = userResponseJson.id;
					console.log(`user_id: ${user_id}`);
					return userResponseJson;
				});
		}
	},
	search(input) {
		// this.authorize();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${input}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((jsonResponse) => {
				if (!jsonResponse.tracks) {
					return [];
				}
				// console.log(jsonResponse.tracks);
				return jsonResponse.tracks.items.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
					image: track.album.images[0].url,
				}));
			});
	},
	save(PlaylistName, uriArray) {
		const apihead = { Authorization: `Bearer ${token}` };
		return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
			headers: apihead,
			method: 'POST',
			body: JSON.stringify({
				name: PlaylistName,
			}),
		})
			.then((response) => response.json())
			.then((jsonresponse) => {
				const playlist_id = jsonresponse.id;
				console.log(uriArray);
				return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
					headers: apihead,
					method: 'POST',
					body: JSON.stringify({
						uris: uriArray,
					}),
				});
			});
	},
};
export default spotify;
//
