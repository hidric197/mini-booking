import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApp } from '../../providers/AppProvider';
import axios from 'axios';

export default function CreateBookingForm() {
  const { selectedRoom, fetchRoomBookings } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    start_date: '',
    end_date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const res = await axios.post(`/api/bookings`, {
        ...form,
        room_id: selectedRoom.id,
      });
      setForm({
        room_id: selectedRoom.id,
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        start_date: '',
        end_date: '',
      });
      alert('Booking created successfully!');
      fetchRoomBookings(selectedRoom.id);

    } catch (error) {
      console.error('Error updating booking:', error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <h4 className="font-medium text-lg mb-2">New Booking</h4>
      <p className="text-sm text-gray-500 mb-4">Room: {selectedRoom.name}</p>
      <div className="row">
        <input name="first_name" {...register('first_name', { required: 'First name is required' })} value={form.first_name} onChange={handleChange} placeholder="First Name" className={`form-control mb-2 ${errors.first_name ? 'border border-warning' : ''}`} />
        {errors.first_name && <p className="text-danger text-sm mt-1">{errors.first_name.message}</p>}

        <input name="last_name" {...register('last_name', { required: 'Last name is required' })} value={form.last_name} onChange={handleChange} placeholder="Last Name" className={`form-control mb-2 ${errors.last_name ? 'border border-warning' : ''}`} />
        {errors.last_name && <p className="text-danger text-sm mt-1">{errors.last_name.message}</p>}

        <input name="email" {...register('email', { required: 'Email is required' })} value={form.email} onChange={handleChange} placeholder="Email" className={`form-control mb-2 ${errors.last_name ? 'border border-warning' : ''}`} />
        {errors.email && <p className="text-danger text-sm mt-1">{errors.email.message}</p>}

        <input name="phone_number" {...register('phone_number', { required: 'Phone number is required' })} value={form.phone_number} onChange={handleChange} placeholder="Phone Number" className={`form-control mb-2 ${errors.phone_number ? 'border border-warning' : ''}`} />
        {errors.phone_number && <p className="text-danger text-sm mt-1">{errors.phone_number.message}</p>}

        <input type="datetime-local" {...register('start_date', { required: 'Start date is required' })} name="start_date" value={form.start_date} onChange={handleChange} className={`form-control mb-2 ${errors.start_date ? 'border border-warning' : ''}`} />
        {errors.start_date && <p className="text-danger text-sm mt-1">{errors.start_date.message}</p>}

        <input type="datetime-local" {...register('end_date', { required: 'End date is required' })} name="end_date" value={form.end_date} onChange={handleChange} className={`form-control mb-2 ${errors.last_name ? 'border border-warning' : ''}`} />
        {errors.end_date && <p className="text-danger text-sm mt-1">{errors.end_date.message}</p>}

      </div>
      <button type="submit" className="btn btn-outline-success">Create Booking</button>
    </form>
  );
}