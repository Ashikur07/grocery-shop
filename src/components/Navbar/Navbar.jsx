import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import swal from "sweetalert";
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [theme, setTheme] = useState('light');

    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }



    const handleLogOut = () => {
        logOut()
            .then(() => {
                swal({
                    title: "Logout Successfull..!",
                    icon: "success",
                    timer: 2000,
                });
            })
            .catch();
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const [isOpen, setIsOpen] = useState(false);
    const handleMouseEnter = () => {
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        setIsOpen(false);
    };


    const links = (
        <>
            <li className="z-[10] font-semibold">
                <NavLink to="/" onClick={closeDropdown}>
                    <a data-tooltip-id="my-tooltip" data-tooltip-content="Home">Home</a>
                    <Tooltip id="my-tooltip" />
                </NavLink>
            </li>
            <li className="z-[10] font-semibold">
                <NavLink to="/allArt&craftItems" onClick={closeDropdown}>
                    <a data-tooltip-id="my-tooltip" data-tooltip-content="All Art & Craft Items">All Art & Craft Items</a>
                    <Tooltip id="my-tooltip" />
                </NavLink>
            </li>

            {user && (
                <>
                    <li className="z-[10] font-semibold">
                        <NavLink to="/addCraftItem" onClick={closeDropdown}>
                            <a data-tooltip-id="my-tooltip" data-tooltip-content="Add Craft Item">Add Craft Item</a>
                            <Tooltip id="my-tooltip" />
                        </NavLink>
                    </li>
                    <li className="z-[10] font-semibold">
                        <NavLink to="/myArt&craftList" onClick={closeDropdown}>
                            <a data-tooltip-id="my-tooltip" data-tooltip-content="My Art&Craft List">My Art&Craft List</a>
                            <Tooltip id="my-tooltip" />
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="bg-[#f6f4f2] navbar md:px-4 lg:px-28 shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={handleDropdownToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    {isDropdownOpen && (
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-slate-700 rounded-box w-52">
                            {links}
                        </ul>
                    )}
                </div>
                <Link to="/" className="" onClick={closeDropdown}>
                    <div className="flex items-center gap-2">
                        <img className="w-16" src="https://img.freepik.com/premium-photo/creative-logo-with-pencil-surrounded-by-bright-feathers_780672-39.jpg?w=2000" alt="" />
                    <h1 className="text-lg lg:text-3xl font-bold">Craft Haven</h1>
                    </div>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end space-x-5">

                {user ? (

                    <div className="flex gap-4">

                        <details
                            className="dropdown"
                            open={isOpen}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <summary className="avatar mt-1" >
                                <div className="drop cursor-pointer w-10 lg:w-12 rounded-full ring ring-blue-400">
                                    <img src={user.photoURL} />
                                </div>
                            </summary>

                            <div className=" -left-16 top-[62px] menu dropdown-content z-[10]  bg-slate-600 rounded-lg text-white w-48 p-4 space-y-3">
                                <p>md ashikur Rahaman </p>
                                <div className="space-y-3">
                                    <button className="bg-slate-800 py-2 px-3 rounded-md font-semibold w-full"><Link to='/profile'>Profile</Link></button><br />
                                    <button onClick={handleLogOut} className="bg-slate-800 w-full py-2 px-3 rounded-md font-semibold">Logout</button>
                                </div>
                            </div>

                        </details>

                        <button onClick={handleLogOut} className="mr-3 lg:mr-0 lg:text-lg font-bold nav-btn px-3 lg:px-4  rounded-xl hover:bg-blue-900 hover:text-white">Logout</button>

                    </div>

                ) : (
                    <div className="space-x-3">
                        <NavLink to="/login" onClick={closeDropdown}>
                            <button className="mr-3 lg:mr-0 lg:text-lg font-bold nav-btn px-3 lg:px-4 py-2 rounded-xl hover:bg-blue-900 hover:text-white">Login</button>
                        </NavLink>

                        <NavLink to="/register" onClick={closeDropdown}>
                            <button className="mr-3 lg:mr-0 lg:text-lg font-bold nav-btn px-3 lg:px-4 py-2 rounded-xl hover:bg-blue-900 hover:text-white">Register</button>
                        </NavLink>
                    </div>
                )}

                {/* theme added */}
                <label className=" cursor-pointer grid place-items-center">
                    <input onChange={handleToggle} type="checkbox" value={theme} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;