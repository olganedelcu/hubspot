import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TokenDisplay from "./TokenDisplay";

interface HubSpotCallbackProps {
  clientSecret: string;
}

const HubSpotCallback: React.FC<HubSpotCallbackProps> = ({ clientSecret }) => {
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      fetch("http://localhost:3001/auth/hubspot/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          client_secret: clientSecret,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch access token");
          }
          return response.json();
        })
        .then((data) => {
          setToken(data.access_token);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [location.search, clientSecret]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {token ? (
        <div>
          <p>Processing your request...</p>
          <TokenDisplay token={token} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HubSpotCallback;
