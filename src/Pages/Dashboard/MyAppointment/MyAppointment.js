import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthProvider';
import { Link } from 'react-router-dom';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;

        }
    })
    return (
        <div>
            <h2 className='text-3xl mb-5'>My Appointment</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.map(
                                (booking, i) => {
                                    return <tr className="hover" key={i}>
                                        <th>{i + 1}</th>
                                        <td>{booking.patient}</td>
                                        <td>{booking.treatment}</td>
                                        <td>{booking.slot}</td>
                                        <td>
                                            {
                                                booking.price && !booking.paid && <Link
                                                    to={`/dashboard/payment/${booking._id}`}
                                                >
                                                    <button
                                                        className='btn btn-primary btn-sm'
                                                    >Pay</button>
                                                </Link>
                                            }
                                            {
                                                booking.price && booking.paid && <span className='text-green-500'>Paid</span>
                                            }
                                        </td>
                                    </tr>
                                }
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;



