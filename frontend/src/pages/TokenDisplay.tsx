import React from 'react';

interface TokenDisplayProps {
    token: string;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ token }) => {
    return (
        <div>
            <h1>Token Data</h1>
            <p>Your access token is: {token}</p>
        </div>
    );
};

export default TokenDisplay;