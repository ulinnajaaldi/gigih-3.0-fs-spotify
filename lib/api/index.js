import { fetchWithToken } from "../utils";

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

export const getPlaylist = async (id) => {
  const response = await fetchWithToken(
    `https://api.spotify.com/v1/playlists/${id}`,
  );

  const result = await response.json();
  return result;
};

export const searchTrack = async (query) => {
  const response = await fetchWithToken(
    `https://api.spotify.com/v1/search?q=${query}&type=album,artist,playlist,track`,
  );

  const result = await response.json();
  return result;
};

export const getUserTracks = async () => {
  const response = await fetchWithToken(
    "https://api.spotify.com/v1/me/tracks?limit=50",
  );

  const result = await response.json();
  return result;
};

export const saveTrack = async (id) => {
  const response = await fetchWithToken(
    `https://api.spotify.com/v1/me/tracks?ids=${id}`,
    {
      method: "PUT",
    },
  );

  return response;
};

export const removeTrack = async (id) => {
  const response = await fetchWithToken(
    `https://api.spotify.com/v1/me/tracks?ids=${id}`,
    {
      method: "DELETE",
    },
  );

  return response;
};

export const checkUserSavedTracks = async (ids) => {
  const response = await fetchWithToken(
    `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,
  );

  const result = await response.json();
  return result;
};
