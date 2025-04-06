import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useApp } from '../../providers/AppProvider';

export default function CreateRoomForm() {
  const { fetchRooms } = useApp();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      capacity: '',
      price: '',
      description: '',
    },
  });

  const modalRef = useRef(null);

  useEffect(() => {
    reset({
      name: '',
      capacity: '',
      price: '',
      description: '',
    });
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/rooms', data);
      reset()
      handleClose()
      fetchRooms();
      alert('Room created successfully!');
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room.');
    }
  };

  const handleClose = () => {
    if (modalRef.current) {
      const modal = bootstrap.Modal.getInstance(modalRef.current);
      modal?.hide();
    }
  };

  return (
    <div ref={modalRef} id="createRoom" className="modal" tabIndex="-1" aria-labelledby="exampleModalLabel">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create a New Room</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body text-start">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className={`form-control ${errors.name ? 'border border-warning' : ''
                    }`}
                  placeholder="Enter name"
                />
                {errors.name && <p className="text-danger text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  {...register('capacity', { required: 'Capacity is required' })}
                  className={`form-control ${errors.capacity ? 'border border-warning' : ''
                    }`}
                  placeholder="Enter capacity"
                />
                {errors.capacity && <p className="text-danger text-sm mt-1">{errors.capacity.message}</p>}
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  {...register('price', { required: 'Price is required' })}
                  className={`form-control ${errors.price ? 'border border-warning' : ''
                    }`}
                  placeholder="Enter price"
                />
                {errors.price && <p className="text-danger text-sm mt-1">{errors.price.message}</p>}
              </div>

              <div className="form-group mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  {...register('description')}
                  className="form-control"
                  placeholder="Enter room description"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                <button type="submit" className="btn btn-outline-primary">Create</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}