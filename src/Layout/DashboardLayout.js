import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to='/dashboard'>All Appointment</Link></li>
                        {
                            isAdmin &&
                            <>
                                < li > <Link to='/dashboard/users'>All User</Link></li>

                                <li><Link to='/dashboard/adddoctor'>Add Doctor</Link></li>
                                
                                <li><Link to='/dashboard/managedoctor'>Manage Doctor</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div >
    );
};

export default DashboardLayout;