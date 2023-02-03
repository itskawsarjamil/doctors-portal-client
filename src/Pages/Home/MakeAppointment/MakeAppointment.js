import React from 'react';
import doctorsmall from '../../../assets/images/doctor-small.png';
import bgbg from '../../../assets/images/bg-blue.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <div className="hero mt-32 bg-base-100 " style={{
            background: `url(${bgbg})`, backgroundSize: 'cover'
        }}>
            <div className="hero-content flex-col lg:flex-row pb-0">
                <img src={doctorsmall} className="w-1/2 -mt-32 rounded-lg hidden md:block " alt='' />
                <div className='text-white lg:w-1/2 p-6'>

                    <h1 className="text-xl text-primary font-bold">Appointment</h1>
                    <h1 className="text-5xl font-bold">Make an Appointment Today</h1>
                    <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <PrimaryButton></PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default MakeAppointment;