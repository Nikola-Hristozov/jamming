let accessToken;
const clientID = "614e4d7ad5f0421eb71b1eda6c9e3d16"
const redirectURI = "http://localhost:3000/"
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresAt = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresAt) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresAt[1]);
            window.setTimeout(() => accessToken = "", expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        }

        else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessURL;

        }
    },
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
        if (jsonResponse.tracks) {
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        }

        else
            return [];
    },

    async savePlaylist(name, tracks) {
        if (!name || !tracks.length) {
            return;
        }
        const accessToken = this.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        let userID;
        const responseUser = await fetch("https://api.spotify.com/v1/me", { headers: headers });
        const jsonResponseUser = await responseUser.json();
        userID = jsonResponseUser.id;
        const responsePlaylist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
            {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ name: name })
            });
        const jsonResponsePlaylist = await responsePlaylist.json();
        const playlistID = jsonResponsePlaylist.id;
        return await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
            {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: tracks })
            }
        );
    }
}
export default Spotify;