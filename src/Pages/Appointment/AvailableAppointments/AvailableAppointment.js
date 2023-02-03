import React from 'react';


const AvailableAppointment = ({ Option, setTreatment }) => {
    const { slots, name,price } = Option;
    return (
        <div className="card shadow-md ">
            <div className="card-body text-center">
                <h2 className="font-bold text-secondary text-2xl">{name}</h2>
                <h4 className="font-bold text-accent text-xl">price: ${price}</h4>
                <p className='text-base'>{slots.length > 0 ? slots[0] : 'Appointment not available'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <div className="">

                    <label disabled={slots.length === 0} onClick={() => setTreatment(Option)} htmlFor="booking-modal" className="text-white btn btn-primary bg-gradient-to-r from-primary to-secondary  justify-center ">BOOK APPOINTMENT</label>
                </div>

            </div>
        </div>
    );
};

export default AvailableAppointment;