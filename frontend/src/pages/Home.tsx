import React from 'react';

const Home: React.FC = () => {
    const goToHubSpot = async () => {
        try {
            // Redirect to your backend's auth endpoint
            window.location.href = 'http://localhost:3001/auth/hubspot'; // Adjust the URL as needed
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