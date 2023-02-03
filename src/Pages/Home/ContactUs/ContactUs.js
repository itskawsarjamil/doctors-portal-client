import React from 'react';
import bg from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
const ContactUs = () => {
    return (
        <div style={{ background: `url(${bg})`, backgroundSize: 'cover' }} >
            <div className='md:w-1/2 text-center mx-auto pb-28'>
                <div className='p-12'>
                    <h3 className='text-primary font-bold'>Contact Us</h3>
                    <h2 className='text-white text-3xl mb-3'>Stay connected with us</h2>
                </div>
                <div className='mb-5'>
                    <input type="text" placeholder="Email Address" className="input input-bordered w-full max-w-xs h-10 my-2" /><br />
                    <input type="text" placeholder="Email Address" className="input input-bordered w-full max-w-xs h-10 my-2" /><br />
                    <textarea className="textarea textarea-bordered w-full max-w-xs my-2" placeholder="Your message"></textarea>
                </div>
                <PrimaryButton>Submit</PrimaryButton>
            </div>
        </div>
    );
};

export default ContactUs;