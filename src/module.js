// helper function generate random string for state
const generateRandomString = (length) => {
  let randomString = "";
  const characters =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < length; i++) {
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }
  console.log(randomString);
  return randomString;
};
//
const getToken = () => {
    ''
}
// Authorize
const authorize = () => {
  console.log("auth");
  const client_id = "f3483c6011d74df2826d4af168a0deb7";
  const secret = "";
  const redirect_uri =
    "https://9000-idx-c-a-project-jamming-1725402963319.cluster-mwrgkbggpvbq6tvtviraw2knqg.cloudworkstations.dev/?monospaceUid=821334";
  const scope =
    "user-read-private  ugc-image-upload user-read-email playlist-modify-private";
  const state = generateRandomString(16);
  // saving the state in local storage
  const stateKey = "spotify_auth_state";
  // name and value
  localStorage.setItem(stateKey, state);
  //
  // build end point url
  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  // url += "&show_dialog=true";
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);
//   window.location = url;
    window.open(url, "_blank");

    return ;
};

export { authorize };
