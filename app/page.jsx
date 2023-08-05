"use client";

import { useEffect } from "react";
import { AuthLogin } from "@/lib/api/auth";
import { getCookies } from "@/lib/utils";
import Image from "next/image";

const Login = () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  useEffect(() => {
    handleCallback();
  }, []);

  const generateRandomString = (length) => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const generateCodeChallenge = async (codeVerifier) => {
    const base64encoded = (string) => {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    };

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    return window.crypto.subtle.digest("SHA-256", data).then(base64encoded);
  };

  const handleLogin = async () => {
    const codeVerifier = generateRandomString(128);
    const state = generateRandomString(16);
    const scope = "playlist-modify-private playlist-read-private";

    if (typeof document !== "undefined") {
      document.cookie = `code_verifier=${codeVerifier}; path=/`;
    }

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const args = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${args}`;
  };

  const codeVerifier = getCookies("code_verifier");

  const handleCallback = async () => {
    const url = new URLSearchParams(window.location.search);
    const code = url.get("code");

    if (!code) return;

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    });

    try {
      const result = await AuthLogin(body);

      const { access_token, refresh_token, expires_in } = result;

      if (typeof document !== "undefined") {
        document.cookie = `access_token=${access_token}; max-age=${expires_in}; path=/`;
        document.cookie = `refresh_token=${refresh_token}; max-age=${
          expires_in + 500
        }; path=/`;
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-tl from-gray-900 to-neutral-900">
      <h1 className="mb-5 translate-y-5 text-4xl font-bold">
        Hi there, welcome to{" "}
        <span className="text-spotify-green">Spoootify</span>
      </h1>
      <Image
        src={"/images/spotify-logo.svg"}
        width={200}
        height={200}
        alt="Spotify Logo"
      />
      <button
        className="-translate-y-5 rounded-full bg-spotify-green px-7 py-4 font-semibold text-neutral-800"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
