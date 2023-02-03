import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import { useState } from 'react';

const ManageDoctor = () => {
    const [modalData, setModalData] = useState(null);
    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            try {
                const res = await fetch("http://localhost:5000/doctors", {
                    headers: {
                        authorization: `bearer ${localStorage.getItem("accessToken")}`,
                    }
                });
                const data = res.json();
                return data;
            }
            catch (e) {
                console.log(e);
            }
        }
    });
    const handleCloseModal = () => {
        setModalData(null);
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Doctor ${doctor.name} deleted successfully`)
                }
            })
    }

    return (
        <div>
            {/* <h2 className="text-4xl">{doctors.length}</h2> */}

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>

                                    <label htmlFor="my-modal" onClick={() => setModalData(doctor)} className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                modalData &&
                <ConfirmationModal title={`Are you sure you want to delete?`}
                    message={`If you delete ${modalData.name}. It cannot be undone.`}
                    successAction={handleDeleteDoctor}
                    successButtonName="Delete"
                    modalData={modalData}
                    closeModal={handleCloseModal}></ConfirmationModal>
            }
        </div >
    );
};

export default ManageDoctor;