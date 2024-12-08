import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TokenDisplay from "./TokenDisplay";

const HubSpotCallback: React.FC = () => {
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    const fetchToken = async () => {
      if (code) {
        try {
          const tokenResponse = await fetch(
            "http://localhost:3001/auth/hubspot/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                code,
              }),
            }
          );

          if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            console.error("Error data:", errorData);
            throw new Error(
              `Failed to fetch access token: ${
                errorData.message || "Unknown error"
              }`
            );
          }

          const tokenData = await tokenResponse.json();
          setToken(tokenData.access_token);
        } catch (err) {
          console.error("Error during token exchange:", err);
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Authorization code not found.");
        setLoading(false);
      }
    };

    fetchToken();
  }, [location.search]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {token && (
        <div>
          <p>Processing your request...</p>
          <TokenDisplay token={token} />
        </div>
      )}
    </div>
  );
};

export default HubSpotCallback;
