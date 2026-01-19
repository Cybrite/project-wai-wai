import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import './styles/auth-global.css'
import "./responsive.css";
import App from "./App.jsx";
import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './styles/auth-global.css'     // Auth Page
import './styles/home-page.css'            // Home Page
import './styles/job-dashboard.css'    // Dashboard
import './styles/job-generator.css'   // Job Gen
import './styles/Analytics.css'       // Analytics
import './styles/resume-parser-global.css'    // Smart Resume
import './styles/Notifications.css'   // Notifications
import './styles/navbar-global.css'
import './styles/footer-global.css'
import "./responsive.css";     // Mobile adjustments

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
