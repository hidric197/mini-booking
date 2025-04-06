import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApp } from '../../providers/AppProvider';

export default function LoginPage() {
    const { login, user } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async () => {
        try {
            await login(email, password);
            handleClose()
            navigate('/');
        } catch {
            alert('Login failed');
        }
    };

    const handleClose = () => {
        if (modalRef.current) {
            const modal = bootstrap.Modal.getInstance(modalRef.current);
            modal?.hide();
        }
    };

    return (
        <div
            ref={modalRef}
            id="loginForm"
            className="modal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Login
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}
                        ></button>
                    </div>
                    <div className="modal-body text-start">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-danger text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="form-group mb-4">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    {...register('password', { required: 'Password is required' })}
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p className="text-danger text-sm mt-1">{errors.password.message}</p>}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary" onClick={handleClose}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}