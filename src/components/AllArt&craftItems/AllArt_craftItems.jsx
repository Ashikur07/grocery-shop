import { useState } from "react";

const AllArt_craftItems = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <details
            className="dropdown m-40"
            open={isOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <summary className="avatar" >
                <div className="drop cursor-pointer w-10 lg:w-12 rounded-full ring ring-[#FFB606]">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </summary>

                <div className="-left-16 top-14 menu dropdown-content z-[1]  bg-slate-600 rounded-lg text-white w-48 p-4 space-y-3">
                    <p>md ashikur Rahaman </p>
                    <div className="space-y-3">
                        <button className="bg-slate-800 py-2 px-3 rounded-md font-semibold w-full">Profile</button><br />
                        <button className="bg-slate-800 w-full py-2 px-3 rounded-md font-semibold">Logout</button>
                    </div>
                </div>

        </details>
    );
};

export default AllArt_craftItems;
