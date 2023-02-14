import { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "./url/serverUrl";
import { useLoading } from "./LoadingProvider";

export default function useAuth(code) {
  const { setIsLoading } = useLoading();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    setIsLoading(true);

    axios
      .post(`${serverUrl}/login`, { code })
      .then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/"); // Remove code from the URL after '/'
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post(`${serverUrl}/refresh`, { refreshToken })
        .then(res => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(err => {
            console.log(err);
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
