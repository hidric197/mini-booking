import React, { useState, useEffect } from 'react';
import { NumericFormat } from "react-number-format";
import { useApp } from '../providers/AppProvider';
import CreateBookingForm from '../components/room/CreateBookingForm';
import CreateRoomForm from '../components/room/CreateRoomForm';
import UpdateRoomForm from '../components/room/UpdateRoomForm';
import UpdateBookingForm from '../components/booking/UpdateBookingForm';

export default function RoomPage() {
    const { rooms, roomBookings, fetchRooms, fetchRoomBookings, removeBooking, removeRoom, selectedRoom, setSelectedRoom, user } = useApp();
    const [showBookingForm, setShowBookingForm] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSelect = (room) => {
        setSelectedRoom(room);
        setShowBookingForm(true);
        fetchRoomBookings(room.id);
    };

    const backToRoomList = () => {
        setSelectedRoom()
        setShowBookingForm(false);
    };

    const handleUpdate = () => {
        if (selectedRoom) {
            fetchRoomBookings(selectedRoom.id);
        }
    };

    const handleRoomUpdate = () => {
        fetchRooms();
    };

    return (
        <div className="row">
            {selectedRoom ? (
                <div className="col-md-8 border-r p-4 bg-white shadow">
                    <span onClick={backToRoomList}>&lt;&lt; Back to Room List</span>
                    <h3>Room bookings</h3>
                    <div className="row">
                        <div className="col-md-4">
                            <p className="text-sm ">Room: {selectedRoom.name}</p>
                        </div>
                        <div className="col-md-4">
                            <p className="text-sm ">Capacity: {selectedRoom.capacity} people</p>
                        </div>
                        <div className="col-md-4">
                            <p className="text-sm ">Price: đ<NumericFormat value={selectedRoom.price} displayType="text" thousandSeparator="," /> per hour</p>
                        </div>
                        <div className="col-md-12">
                            <p className="text-sm ">{selectedRoom.description ?? "Room description updating..."}</p>
                        </div>
                    </div>

                    <h4>Bookings</h4>
                    {roomBookings == "" ? ("There is no booking") : ("")}

                    {(roomBookings || []).map((booking) => (
                        <div className="row rounded border border-secondary m-2" key={booking.id}>
                            <div className="col-md-2">
                                <p className="text-sm">Booking ID: {booking.id}</p>
                            </div>
                            <div className="col-md-4">
                                <p className="text-sm ">Customer Name: {user ? booking.user_full_name : booking.user.first_name + " *****"}</p>
                            </div>
                            <div className="col-md-3">
                                <p className="text-sm ">Phone Number: {user ? booking.user.phone_number : "***********"}</p>
                            </div>
                            <div className="col-md-3">
                                <p className="text-sm ">Email: {user ? booking.user.email : "******@gmail.com"}</p>
                            </div>

                            <div className="col-md-8">
                                <p className="text-sm ">Time: From <b>{booking.start_date}</b> To <b>{booking.end_date}</b></p>
                            </div>
                            <div className="col-md-4">
                                <p className="text-sm ">Status: {booking.status}</p>
                            </div>
                            {user ? (
                                <div className="col-md-12 text-end">
                                    <button className="btn btn-outline-primary m-1" data-bs-toggle="modal" data-bs-target={`#editBooking-${booking.id}`}>Edit</button>
                                    <button className="btn btn-outline-danger m-1" onClick={() => { if (window.confirm('Delete the item?')) { removeBooking(booking.id) } }}>Remove</button>
                                    <UpdateBookingForm booking={booking} onClose={() => { }} onUpdate={() => { handleUpdate() }} />
                                </div>
                            ) : ('')}

                        </div>
                    ))}
                </div>
            ) : (
                <div className="col-md-8 border-r p-4 bg-white shadow">
                    <h3>Available Rooms</h3>
                    {user ? (
                        <div className="text-end mb-4">
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#createRoom">Add new room</button>
                            <CreateRoomForm />
                        </div>
                    ) : ('')}

                    <div className="row">
                        {rooms.map((room) => (
                            <div
                                role="button"
                                key={room.id}
                                className={`col-md-6 p-4 rounded-lg border ${selectedRoom?.id === room.id ? 'border-success' : ''
                                    }`}
                            >
                                <div className="row" onClick={() => handleSelect(room)}>
                                    <h4 className="font-bold text-md">Room: {room.name}</h4>
                                    <p className="text-sm ">Capacity: {room.capacity} people</p>
                                    <p className="text-sm ">Price: đ<NumericFormat value={room.price} displayType="text" thousandSeparator="," /> per hour</p>
                                    <p className="text-sm text-gray-500 mt-2"><i>{room.description ?? "Description updating..."}</i></p>
                                </div>

                                {user ? (
                                    <div className="col-md-12 text-end">
                                        <button className="btn btn-outline-primary m-1" data-bs-toggle="modal" data-bs-target={`#editRoom-${room.id}`}>Edit</button>
                                        <button className="btn btn-outline-danger m-1" onClick={() => { if (window.confirm('Delete the item?')) { removeRoom(room.id) } }}>Remove</button>
                                        <UpdateRoomForm room={room} onClose={() => { }} onUpdate={() => { handleRoomUpdate() }} />
                                    </div>
                                ) : (
                                    <div className="col-md-12 text-center">
                                        <button className="btn btn-outline-warning m-1" onClick={() => handleSelect(room)}>Book here</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}


            <div className="col-md-4 border-r p-4 bg-white shadow">
                {showBookingForm && selectedRoom ? (
                    <div className="row ml-2">
                        <CreateBookingForm />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Select a room to book</p>
                    </div>
                )}
            </div>
        </div>
    );
}