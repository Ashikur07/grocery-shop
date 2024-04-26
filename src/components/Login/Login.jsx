import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";
import swal from 'sweetalert';



const Login = () => {

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const { createUserWithGoogle, createUserWithGitHub, signInUser } = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();


    const handleGoogleSignIn = () => {
        createUserWithGoogle(googleProvider)
            .then(() => {

                swal({
                    title: "Login Successfull..!",
                    icon: "success",
                    timer: 1500,
                });

                setTimeout(() => {
                    navigate(location?.state ? location.state : '/');
                }, 1500);

            })
            .catch()
    }

    const handleGitHubSignIn = () => {
        createUserWithGitHub(gitHubProvider)
            .then(() => {

                  swal({
                    title: "Login Successfull..!",
                    icon: "success",
                    timer: 1500,
                });

                setTimeout(() => {
                    navigate(location?.state ? location.state : '/');
                }, 1500);

            })
            .catch()
    }


    const handleSignInWithEmail = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then(() => {
                
                 swal({
                    title: "Login Successfull..!",
                    icon: "success",
                    timer: 1500,
                });

                setTimeout(() => {
                    navigate(location?.state ? location.state : '/');
                }, 1500);

            })
            .catch(() => {
                // alert('Email or password does not match...! Plese try again')
                swal({
                    position: "middle",
                    icon: "warning",
                    title: "Email or password does not match...! Plese try again",
                    showConfirmButton: false,
                    timer: 2000
                });
            })
    }

    return (
        <div className='bg-[#c2d0d9]  w-full  py-20'>

            <div className="animate__animated animate__zoomIn mx-auto w-[390px] bg-white rounded-3xl px-8 pb-10">

                <h1 className='text-center text-2xl font-bold py-7'>Please login</h1>

                <button onClick={handleGoogleSignIn} className='border border-[#a39898] w-full p-2 gap-16 flex rounded-md'>
                    <FcGoogle className='text-xl' />
                    <p className='font-semibold'>
                        Sign in with Google
                    </p>
                </button>

                <button onClick={handleGitHubSignIn} className='w-full mt-2 rounded-md border p-2 gap-16 flex bg-[#2EA043] text-white'>
                    <FaGithub className='text-xl text-black' />
                    <p className='font-semibold'>
                        Sign in with GitHub
                    </p>
                </button>

                <div className='flex my-6 justify-between items-center'>
                    <p className='flex-grow border-b border-[#a39898]'></p>
                    <p className='px-4'>or</p>
                    <p className='flex-grow border-b border-[#a39898]'></p>
                </div>

                <form onSubmit={handleSignInWithEmail}>
                    <p className='pb-1'>Email Address</p>
                    <input className='p-2 mb-2 border rounded-md w-full border-red-600' type="email" name='email' placeholder='Enter Your email' required />

                    <p className='pb-1'>Password</p>
                    <div className="flex flex-col relative">
                        <input
                            className='p-2 border rounded-md w-full border-red-600'
                            type={showPassword ? "text" : "password"}
                            name="password" id="password"
                            placeholder='Enter your Passoword' required />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute left-[290px] top-2 text-xl">
                            {
                                showPassword ? <FaRegEyeSlash /> : <AiOutlineEye />
                            }
                        </span>
                    </div>

                    <button className='font-bold text-white w-full mt-5 p-2 rounded-md border bg-[#1c67bc]'>
                        Login
                    </button>
                </form>

                <h1 className='text-center mt-4'>Do not have an accout? <NavLink to='/register' className='text-[16px] font-bold'>Register</NavLink></h1>

            </div>

        </div>

    );
};

export default Login;