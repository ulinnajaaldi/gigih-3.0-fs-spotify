const { fetchWithToken } = require("../utils");

export const getUserProfile = async () => {
  const response = await fetchWithToken("https://api.spotify.com/v1/me");

  const result = await response.json();
  return result;
};

export const getUserPlaylists = async () => {
  const response = await fetchWithToken(
    "https://api.spotify.com/v1/me/playlists",
  );

  const result = await response.json();
  return result;
};

export const getUserTopTracks = async () => {
  const response = await fetchWithToken(
    "https://api.spotify.com/v1/me/top/tracks",
  );

  const result = await response.json();
  return result;
};

export const getUserTopArtists = async () => {
  const response = await fetchWithToken(
    "https://api.spotify.com/v1/me/top/artists",
  );

  const result = await response.json();
  return result;
};

export const getUserRecentlyPlayed = async () => {
  const response = await fetchWithToken(
    "https://api.spotify.com/v1/me/player/recently-played",
  );

  const result = await response.json();
  return result;
};

export const getUserCurrentlyPlaying = async () => {
  const response = await fetchWithToken(
    "https://api.spotify.com/v1/me/player/currently-playing",
  );

  const result = await response.json();
  return result;
};

export const searchTrack = async (query) => {
  const response = await fetchWithToken(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
  );

  const result = await response.json();
  return result;
};
 