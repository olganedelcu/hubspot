import React, { useState } from "react";
import './HubspotIntegration.css';

const HubSpotIntegration: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [userSecret, setUserSecret] = useState<string>('');
    const [userRedirectUri, setUserRedirectUri] = useState<string>('');
    const [scopes, setScopes] = useState<string>('');

    const handleIntegration = async () => {
        try {
            console.log("Initiating HubSpot integration...");

            const response = await fetch('http://localhost:3001/auth/hubspot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: userId,
                    client_secret: userSecret,
                    redirect_uri: userRedirectUri,
                    scopes: scopes,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to redirect to HubSpot: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Error during HubSpot integration:", error);
        }
    };

    return (
        <div>
            <h1>HubSpot Integration</h1>
            <div>
                <label>
                    User ID (client id):
                    <input 
                        type="text" 
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)} 
                        placeholder="Enter your HubSpot User ID" 
                    />
                </label>
            </div>
            <div>
                <label>
                    User Secret:
                    <input 
                        type="password" 
                        value={userSecret} 
                        onChange={(e) => setUserSecret(e.target.value)} 
                        placeholder="Enter your HubSpot User Secret" 
                    />
                </label>
            </div>
            <div>
                <label>
                    Your Redirect:
                    <input 
                        type="url" 
                        value={userRedirectUri}
                        onChange={(e) => setUserRedirectUri(e.target.value)}
                        placeholder="Enter your HubSpot Redirect URI" 
                    />
                </label>
            </div>
            <div>
                <label>
                    Scopes:
                    <select value={scopes} onChange={(e) => setScopes(e.target.value)}>
                        <option value="">Select a scope</option>
                        <option value="crm.objects.companies.read">Companies Read</option>
                        <option value="crm.objects.contacts.read">Contacts Read</option>
                        <option value="crm.objects.deals.read">Deals Read</option>
                        <option value="crm.objects.tickets.read">Tickets Read</option>
                        <option value="e-commerce">E-commerce</option>
                    </select>
                </label>
            </div>
            <button onClick={handleIntegration}>Start Integration</button>
        </div>
    );
};

export default HubSpotIntegration;