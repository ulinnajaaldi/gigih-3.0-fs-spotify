const AUTH_URL = "https://accounts.spotify.com/api/token";

export const AuthLogin = async (body) => {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });

  const result = await response.json();
  return result;
};
