import React, { useEffect } from "react";

const HubSpotCallback: React.FC = () => {
    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Logic to handle the OAuth callback
                console.log("Handling HubSpot OAuth callback...");
                // Add your callback handling logic here
            } catch (error) {
                console.error("Error handling HubSpot callback:", error);
                // Optionally, display an error message to the user
            }
        };

        handleCallback();
    }, []);

    return (
        <div>
            <h1>HubSpot Callback</h1>
            <p>Processing your request...</p>
            {/* Add more UI elements as needed */}
        </div>
    );
};

export default HubSpotCallback;
