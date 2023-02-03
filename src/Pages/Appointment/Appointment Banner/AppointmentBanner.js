import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const AppointmentBanner = ({ selectedDate, setselectedDate }) => {

    return (
        <header>
            <div className="hero lg:my-16">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img alt='dentist chair' src={chair} className="max-w-sm rounded-lg shadow-2xl" />
                    <div className='lg:mr-32'>
                        <DayPicker mode='single'
                            selected={selectedDate}
                            onSelect={setselectedDate}
                        >
                        </DayPicker>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default AppointmentBanner;