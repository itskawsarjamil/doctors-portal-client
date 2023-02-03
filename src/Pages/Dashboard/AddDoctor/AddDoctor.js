import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../Shared/Loading/Loading';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const formData = new FormData();
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();

    const { data: Specialties, isLoading } = useQuery({
        queryKey: ["specialties"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/appointmentSpecialty");
            const data = await res.json();
            return data;
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    if (isLoading) {
        return <Loading></Loading>;
    };
    const handleSignUp = (data) => {

        // console.log(e);
        // console.log(e.image[0]);
        const img = data.image[0];
        formData.append("image", img);
        // console.log(formData);


        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        // console.log(url);

        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }
                    // console.log(doctor);

                    // save doctor information to the database
                    fetch('http://localhost:5000/dashboard/adddoctor', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            // console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            navigate('/dashboard/managedoctor')
                        })
                }
            })

    }
    return (
        <div className='w-96 p-7  mx-auto '>

            <form onSubmit={handleSubmit(handleSignUp)} className='border-2 p-10'>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" {...register("email", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />

                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Add Specialty</span></label>
                    <select {...register("specialty", {
                        required: true
                    })} className="select select-bordered w-full max-w-xs">

                        {
                            Specialties.map(specialty => <option key={specialty._id} defaultValue={specialty.name}>{specialty.name}</option>)
                        }
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label htmlFor='file' className="label mt-4 "> <span className="label-text">Image</span></label>
                    <input id='file' type="file" {...register("image", {
                        required: "Image is Required"
                    })} className="input w-full max-w-xs" />
                    {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                </div>
                <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />

            </form>
        </div>
    );
};

export default AddDoctor;