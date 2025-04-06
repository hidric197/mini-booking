import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomBookings, setRoomBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookings, setBooking] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setUser(res.data.data);
    } catch (error) {
      console.log(error)
      setUser(null);
    }
  };

  const fetchRooms = async () => {
    const res = await axios.get('/api/rooms');

    setRooms(res.data.data.data);
  };

  const fetchRoomBookings = async (roomId) => {
    const res = await axios.get(`/api/rooms/${roomId}/bookings`);

    setRoomBookings(res.data.data.bookings);
  }

  const fetchBooking = async (bookingId) => {
    const res = await axios.get(`/api/bookings/${bookingId}`);

    setBooking(res.data.data);
  };

  const removeBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      const updatedBookings = roomBookings.filter((booking) => booking.id !== bookingId);
      setRoomBookings(updatedBookings);
      alert('Booking removed successfully!');
    } catch (error) {
      console.error('Error removing booking:', error);
      alert('Failed to remove booking.');
    }
  };

  const removeRoom = async (roomId) => {
    try {
      await axios.delete(`/api/rooms/${roomId}`);
      const updatedRooms = rooms.filter((room) => room.id !== roomId);
      setRooms(updatedRooms);
      alert('Room removed successfully!');
    } catch (error) {
      console.error('Error removing room:', error);
      alert('Failed to remove room.');
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/login', { email, password });
      const { token } = res.data.data;
      setToken(token);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } catch (error) {
      console.error('Error login:', error);
      alert('Failed to login.');
    }
  };

  const logout = async () => {
    await axios.get('/api/logout');
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  if (token && !axios.defaults.headers.common['Authorization']) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        rooms,
        roomBookings,
        selectedRoom,
        setSelectedRoom,
        setRoomBookings,
        bookings,
        fetchUser,
        fetchRooms,
        fetchBooking,
        removeBooking,
        removeRoom,
        fetchRoomBookings,
        setBooking,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);