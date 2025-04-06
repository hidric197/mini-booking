import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function UpdateRoomForm({ room, onClose, onUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: room?.name || '',
      price: room?.price || '',
      capacity: room?.capacity || '',
      description: room?.description || '',
    },
  });

  const modalRef = useRef(null);

  useEffect(() => {
    reset({
      name: room?.name || '',
      price: room?.price || '',
      capacity: room?.capacity || '',
      description: room?.description || '',
    });
  }, [room, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/rooms/${room.id}`, data);
      onUpdate();
      if (modalRef.current) {
        const modal = bootstrap.Modal.getInstance(modalRef.current);
        modal?.hide();
      }
      onClose();
      alert('Room updated successfully!');
    } catch (error) {
      console.error('Error updating room:', error);
      alert('Failed to update room.');
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
      id={"editRoom-" + room?.id}
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="editRoomLabel"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editRoomLabel">
              Edit Room #{room?.id}
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
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className={`form-control ${errors.name ? 'border border-warning' : ''}`}
                  placeholder="Enter name"
                />
                {errors.name && <p className="text-danger text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  {...register('price', { required: 'Price is required' })}
                  className={`form-control ${errors.price ? 'border border-warning' : ''}`}
                  placeholder="Enter price"
                />
                {errors.price && <p className="text-danger text-sm mt-1">{errors.price.message}</p>}
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Papacity</label>
                <input
                  type="number"
                  {...register('capacity', { required: 'Capacity is required' })}
                  className={`form-control ${errors.capacity ? 'border border-warning' : ''}`}
                  placeholder="Enter capacity"
                />
                {errors.capacity && <p className="text-danger text-sm mt-1">{errors.capacity.message}</p>}
              </div>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  type="text"
                  {...register('description')}
                  className="form-control"
                  placeholder="Enter description"
                ></textarea>
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