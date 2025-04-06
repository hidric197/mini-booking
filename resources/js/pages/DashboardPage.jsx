import React, { useEffect } from 'react';
import { useApp } from '../providers/AppProvider';
import LoginForm from '../components/auth/LoginForm';
import RoomPage from '../pages/RoomPage';

export default function DashboardPage() {
  const { user, fetchUser, logout } = useApp();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold">Booking</h1>
      <div className="text-end mb-4">
        {user ? (
          <button className="btn btn-outline-primary" onClick={logout}>Logout</button>
        ) : (
          <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#loginForm">Login</button>
        )}

        <LoginForm />

      </div>
      <div className="flex h-screen">
        <RoomPage />
      </div>
    </div>

  );
}