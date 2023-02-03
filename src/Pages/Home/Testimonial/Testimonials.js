import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import Testimonial from './Testimonial';
const Testimonials = () => {

    const testData = [
        {
            id: 1,
            comment: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            name: "Winson Herry",
            address: "California",
            img:people1,
        },
        {
            id: 2,
            comment: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            name: "Winson Herry",
            address: "California",
            img:people1,
        },
        {
            id: 3,
            comment: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            name: "Winson Herry",
            address: "California",
            img:people1,
        },
    ]


    return (
        <div className='my-16 px-5'>
            <div className='flex justify-between mb-10'>
                <div>
                    <h2 className='text-primary font-bold text-xl'>Testimonial</h2 >
                    <h2 className='text-gray-500 text-3xl'>What Our Patients Says</h2>
                </div>
                <img src={quote} alt="" className='w-1/6' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:p-5 gap-5'>
                {
                    testData.map(test => <Testimonial key={test.key} test={test}></Testimonial>)
                }
            </div>
        </div>
    );
};

export default Testimonials;