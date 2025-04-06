import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './providers/AppProvider';
import DashboardPage from './pages/DashboardPage';
import RoomPage from './pages/RoomPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/rooms" element={<RoomPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </AppProvider>
);