import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name, slots,price } = treatment;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const slot = form.slot.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            appointDate: date,
            treatment: treatment.name,
            patient: name,
            slot,
            email,
            phone,
            price
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTreatment(null);
                refetch();
                if (data.acknowledged) {
                    toast.success('appointment booked');
                }
                else {
                    toast.error(data.message);
                    console.error(data.message);
                }
            })

    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-6">{name}</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={date} disabled className="input input-bordered w-full mb-3 " />
                        <select name='slot' className="select select-bordered w-full mb-3 ">
                            {
                                slots.map((slot, i) => {
                                    return <option key={i} value={slot}>{slot} </option>
                                })
                            }
                        </select>
                        <input required name='name' type="text" value={user?.displayName} disabled placeholder="Your Name" className="input input-bordered w-full mb-3 " />
                        <input required name='email' value={user?.email} disabled type="email" placeholder="Email Address" className="input input-bordered w-full mb-3 " />
                        <input name='phone' type="phone" placeholder="Phone Number" className="input input-bordered w-full mb-3 " />
                        <input type="submit" value="submit" className='btn btn-secondary w-full' /></form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;