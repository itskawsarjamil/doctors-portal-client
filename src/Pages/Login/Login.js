
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginEmail,setLoginEmail]=useState('');
    const [token]=useToken(loginEmail);

    if(token)
    {
        navigate(from, { replace: true });
    }



    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                setLoginEmail(data.email);
            })
            .catch(err => {
                console.error(err.message);
                setLoginError(err.message);
            })
    }
    return (
        <div className='h-[800px] flex items-center justify-center border'>
            <div className='border-4 border-primary p-8 shadow-lg '>
                <h2 className='text-2xl text-center font-bold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" className="input input-bordered w-full max-w-xs"
                            {...register("email",
                                { required: true })}
                            aria-invalid={errors.email ? "true" : "false"} />
                        {errors.email?.type === 'required' && <p role="alert" className='text-red-600'>email is required</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full max-w-xs"
                            {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                }
                            )} />
                        <label className="label">
                            <span className="label-text"><Link to='/signup'>Forget Password?</Link></span>
                        </label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-3 text-white' value="Login" type="submit" />
                </form>
                {
                    loginError && <p className='text-red-500 font-bold'>{loginError}</p>
                }
                <p>New to Doctors Portal <Link className='text-secondary' to="/signup">Create new Account</Link></p>
                <div className='divider'>OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;