import React from "react";

const HubSpotIntegration: React.FC = () => {
    const redirectToHubSpot = () => {
        window.location.href = 'http://localhost:3000/auth/hubspot'; // Redirect to our backend endpoint
    };

    return (
        <div>
            <h1>HubSpot Integration</h1>
            <button onClick={redirectToHubSpot}>Start Integration</button>
        </div>
    );
};

export default HubSpotIntegration;
