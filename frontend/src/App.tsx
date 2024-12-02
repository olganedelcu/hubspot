import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HubSpotIntegration from "./pages/HubSpotIntegration";
import Home from "./pages/Home"; 
import HubSpotCallback from "./pages/HubSpotCallback";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home route */}
        <Route path="/hubspot" element={<HubSpotIntegration />} />  {/* HubSpot integration route */}
        <Route path="/hubspot/callback" element={<HubSpotCallback />} />  {/* HubSpot OAuth callback route */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;