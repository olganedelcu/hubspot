import React, { useState } from "react";
import "./HubspotIntegration.css";

const HubSpotIntegration: React.FC = () => {
  const [scopes, setScopes] = useState<string[]>([]);

  const availableScopes = [
    { value: "crm.objects.companies.read", label: "Companies Read" },
    { value: "crm.objects.contacts.read", label: "Contacts Read" },
    { value: "crm.objects.deals.read", label: "Deals Read" },
    { value: "crm.objects.tickets.read", label: "Tickets Read" },
    { value: "e-commerce", label: "E-commerce" },
  ];

  const handleScopeChange = (value: string) => {
    setScopes((prevScopes) => {
      if (prevScopes.includes(value)) {
        return prevScopes.filter((scope) => scope !== value);
      } else {
        return [...prevScopes, value];
      }
    });
  };

  const handleIntegration = async () => {
    try {
      console.log("Initiating HubSpot integration...");

      const response = await fetch("http://localhost:3001/auth/hubspot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scopes }), // Sending the selected scopes
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to get HubSpot URL: ${errorData.message || response.statusText}`
        );
      }

      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error during HubSpot integration:", error);
    }
  };

  return (
    <div>
      <h1>HubSpot Integration</h1>
      <div>
        <h3>Scopes (select one or more):</h3>
        {availableScopes.map((scope) => (
          <div key={scope.value}>
            <label>
              <input
                type="checkbox"
                value={scope.value}
                checked={scopes.includes(scope.value)}
                onChange={() => handleScopeChange(scope.value)}
              />
              {scope.label}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h3>Selected Scopes:</h3>
        <ul>
          {scopes.map((scope, index) => (
            <li key={index}>{scope}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleIntegration}>Start Integration</button>
    </div>
  );
};

export default HubSpotIntegration;
