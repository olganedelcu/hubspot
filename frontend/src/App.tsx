import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HubSpotIntegration from "./pages/HubSpotIntegration";
import Home from "./pages/Home"; 
import HubSpotCallback from "./pages/HubSpotCallback";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/hubspot" element={<HubSpotIntegration />} />  
        <Route path="/hubspot/callback" element={<HubSpotCallback />} />
      </Routes>
    </Router>
  );
};

export default App;
