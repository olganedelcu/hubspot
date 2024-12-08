import React from 'react';

const Home: React.FC = () => {
    const goToHubSpot = async () => {
        try {
            // Redirect to your HubSpot integration
            window.location.href = 'http://localhost:5173/hubspot'; // Adjusted the URL to the new HubSpot integration
        } catch (error) {
            console.error("Error redirecting to HubSpot:", error);
            // Optionally, display an error message to the user
        }
    };

    return (
        <div>
            <h1>Welcome to the HubSpot Integration</h1>
            <button onClick={goToHubSpot}>Go to HubSpot Integration</button>
        </div>
    );
};

export default Home;