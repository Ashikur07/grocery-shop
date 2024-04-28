import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";
import swal from 'sweetalert';

const Register = () => {

    useEffect(() => {
        document.title = 'Register';
    }, []);

    const navigate = useNavigate();
    const { createNewUser, setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegisterWithEmail = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photoUrl = e.target.photo.value;
        
        if (password.length < 6) {
            swal({
                position: "middle",
                icon: "warning",
                title: "Password should be at least 6 characters",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            // alert('Your password should have at least one uppercase character');
            swal({
                position: "middle",
                icon: "warning",
                title: "password should have at least one uppercase character",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        else if (!/[a-z]/.test(password)) {
            // alert('Your password should have at least one Lowercase character');
            swal({
                position: "middle",
                icon: "warning",
                title: "password should have at least one Lowercase character",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                // update profile
                updateProfile(user, {
                    displayName: name,
                    photoURL: photoUrl
                })
                    .then()
                    .catch()

                setUser(user);

                swal({
                    title: "Registration Successfull..!",
                    icon: "success",
                    timer: 1500,
                });

                setTimeout(() => {
                    navigate('/');
                }, 1500);

            })

            .catch(error => {
                // alert(error.message);
                swal({
                    position: "middle",
                    icon: "warning",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 2500
                });
            })
    }

    return (
        <div className='bg-[#c2d0d9] w-full h-full py-20'>

            <div className="animate__animated animate__zoomIn mx-auto w-[400px] bg-white rounded-3xl px-12 pb-6">

                <h1 className='text-center text-2xl font-bold py-7'>Register Now!</h1>

                <form onSubmit={handleRegisterWithEmail}>
                    <p className='pb-1'>Your Name</p>
                    <input className='p-2 mb-2 border rounded-md w-full border-red-600' type="text" name='name' placeholder='Enter Your Name' required />

                    <p className='pb-1'>Photo URL</p>
                    <input className='p-2 mb-2 border rounded-md w-full border-red-600' type="text" name='photo' placeholder='Enter Photo URL' required />

                    <p className='pb-1'>Email Address</p>
                    <input className='p-2 mb-2 border rounded-md w-full border-red-600' type="email" name='email' placeholder='Enter Your email' required />

                    <p className='pb-1'>Password</p>
                    <div className="flex flex-col relative">
                        <input
                            className='p-2 border rounded-md w-full border-red-600'
                            type={showPassword ? "text" : "password"}
                            name="password" id="password"
                            placeholder='Enter your Passoword' required />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute left-[270px] top-2 text-xl">
                            {
                                showPassword ? <FaRegEyeSlash /> : <AiOutlineEye />
                            }
                        </span>
                    </div>

                    <button className='font-bold text-white w-full mt-5 p-2 rounded-md border bg-[#1c67bc]'>
                        Register
                    </button>
                </form>

                <h1 className='text-center py-5'>Do not have an accout? <NavLink to="/login" className='text-[16px] font-bold'>Login</NavLink></h1>

            </div>
        </div>
    );
};

export default Register;