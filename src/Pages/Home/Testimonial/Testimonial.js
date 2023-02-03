import React from 'react';

const Testimonial = ({ test }) => {
    const { name, address, img, comment } = test;
    return (
        <div className="card card-compact bg-base-100 shadow-md p-6">
            <p className='text-sm'>{comment}</p>
            <div className="card-body flex flex-row gap-4">
                <img src={img} alt="" className='w-1/6 border rounded-full border-primary border-2' />
                <div >
                    <h2 className="card-title text-base">{name}</h2>
                    <p>{address}</p>
                </div>

            </div>
        </div>
    );
};

export default Testimonial;