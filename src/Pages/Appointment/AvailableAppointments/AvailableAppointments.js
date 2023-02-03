import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import PrivateRoute from '../../../Routes/PrivateRoute/PrivateRoute';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AvailableAppointment from './AvailableAppointment';

const AvailableAppointments = ({ selectedDate }) => {

    // const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');
    const { data: appointmentOptions = [], isLoading, refetch } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`);
            const data = res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>;
    }

    // const { data: appointmentOptions = [] } = useQuery({
    //     queryKey: ['appointmentOptions'],
    //     queryFn: fetch('http://localhost:5000/appointmentOptions')
    //         .then(res => res.json())
    // })

    // useEffect(() => {
    //     fetch('http://localhost:5000/appointmentOptions')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    // }, [])


    return (
        <section>
            <div className='text-center text-xl my-6 font-bold'>
                <p>
                    Appointmet in <span className='text-primary '> {format(selectedDate, 'PP')}</span>
                </p>
                <p>Please Select an Option</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16'>
                {
                    appointmentOptions.map(option => <AvailableAppointment
                        key={option._id} Option={option} setTreatment={setTreatment}></AvailableAppointment>)
                }
            </div>
            {
                treatment && <PrivateRoute><BookingModal treatment={treatment} selectedDate={selectedDate} setTreatment={setTreatment} refetch={refetch}></BookingModal></PrivateRoute>
            }
        </section>
    );
};

export default AvailableAppointments;


{/* <BookingModal treatment={treatment} selectedDate={selectedDate} setTreatment={setTreatment}></BookingModal> */ }