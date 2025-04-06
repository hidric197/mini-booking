import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function UpdateBookingForm({ booking, onClose, onUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      room_id: booking?.room_id || '',
      first_name: booking?.user?.first_name || '',
      last_name: booking?.user?.last_name || '',
      email: booking?.user?.email || '',
      phone_number: booking?.user?.phone_number || '',
      start_date: booking?.start_date || '',
      end_date: booking?.end_date || '',
    },
  });

  const modalRef = useRef(null);

  useEffect(() => {
    reset({
      room_id: booking?.room_id || '',
      first_name: booking?.user?.first_name || '',
      last_name: booking?.user?.last_name || '',
      email: booking?.user?.email || '',
      phone_number: booking?.user?.phone_number || '',
      start_date: booking?.start_date || '',
      end_date: booking?.end_date || '',
    });
  }, [booking, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/bookings/${booking.id}`, data);
      onUpdate();
      if (modalRef.current) {
        const modal = bootstrap.Modal.getInstance(modalRef.current);
        modal?.hide();
      }
      onClose();
      alert('Booking updated successfully!');
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking.');
    }
  };

  const handleClose = () => {
    if (modalRef.current) {
      const modal = bootstrap.Modal.getInstance(modalRef.current);
      modal?.hide();
    }
    onClose();
  };

  return (
    <div
      ref={modalRef}
      id={"editBooking-" + booking?.id}
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="editBookingLabel"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editBookingLabel">
              Edit Booking #{booking?.id}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-start">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  {...register('first_name', { required: 'First name is required' })}
                  className={`form-control ${errors.first_name ? 'border border-warning' : ''}`}
                  placeholder="Enter first name"
                />
                {errors.first_name && <p className="text-danger text-sm mt-1">{errors.first_name.message}</p>}
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  {...register('last_name', { required: 'Last name is required' })}
                  className={`form-control ${errors.last_name ? 'border border-warning' : ''}`}
                  placeholder="Enter last name"
                />
                {errors.last_name && <p className="text-danger text-sm mt-1">{errors.last_name.message}</p>}
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className={`form-control ${errors.email ? 'border border-warning' : ''}`}
                  placeholder="Enter email"
                />
                {errors.email && <p className="text-danger text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  {...register('phone_number', { required: 'Phone number is required' })}
                  className={`form-control ${errors.phone_number ? 'border border-warning' : ''}`}
                  placeholder="Enter phone number"
                />
                {errors.phone_number && <p className="text-danger text-sm mt-1">{errors.phone_number.message}</p>}
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="datetime-local"
                  {...register('start_date', { required: 'Start date is required' })}
                  className={`form-control ${errors.start_date ? 'border border-warning' : ''}`}
                />
                {errors.start_date && <p className="text-danger text-sm mt-1">{errors.start_date.message}</p>}
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="datetime-local"
                  {...register('end_date', { required: 'End date is required' })}
                  className={`form-control ${errors.end_date ? 'border border-warning' : ''}`}
                />
                {errors.end_date && <p className="text-danger text-sm mt-1">{errors.end_date.message}</p>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-outline-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}