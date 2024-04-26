import { useLoaderData } from "react-router-dom";
import { IoMdCube } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const Home = () => {

    const lodedUser = useLoaderData();
    console.log(lodedUser);


    return (
        <div>
            <form className="mx-auto my-10 w-[800px] bg-gray-300 rounded-lg shadow-lg p-6">

                <h1 className="flex items-center gap-3 text-2xl pb-2 font-bold border-b border-[#958d8d]">
                    <IoMdCube /> <span>Product Information</span></h1>

                {/* Row 1 */}
                <div className="flex gap-5 mt-4">
                    <div className="w-full">
                        <p className="font-semibold pb-1">Item Name</p>
                        <input type="text" placeholder="Enter item name" className="p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="font-semibold pb-1">Price</p>
                        <input type="text" placeholder="$0.00" className="p-1 w-full border input-info rounded-lg" />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-5 mt-4 border-b border-[#958d8d] pb-8">
                    <div className="w-full">
                        <p className="font-semibold pb-1">Photo URL</p>
                        <input type="text" placeholder="Enter image url" className="p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="font-semibold pb-1">Subcategory Name</p>
                        <select className="p-1 w-full border input-info rounded-lg">
                            <option disabled selected>Select subcategory_Name</option>
                            <option>Landscape Painting</option>
                            <option>Portrait Drawing</option>
                            <option>Watercolour Painting</option>
                            <option>Oil Painting</option>
                            <option>Charcoal Sketching</option>
                            <option>Cartoon Drawing</option>
                        </select>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="flex gap-5 pt-5">
                    <div className="w-full">
                        <p className="font-semibold pb-1">Rating</p>
                        <select className="p-1 w-full border input-info rounded-lg">
                            <option disabled selected>Select Rating</option>
                            <option>5</option>
                            <option>4</option>
                            <option>3</option>
                            <option>2</option>
                            <option>1</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <p className="font-semibold pb-1"> Customization</p>
                        <select className="p-1 w-full border input-info rounded-lg">
                            <option disabled selected>Select Option</option>
                            <option>Yes</option>
                            <option>No</option>

                        </select>
                    </div>
                </div>

                {/* Row 4 */}
                <div className="flex gap-5 pt-5 border-b border-[#958d8d] pb-8">
                    <div className="w-full">
                        <p className="font-semibold pb-1">Processing_time</p>
                        <select className="p-1 w-full border input-info rounded-lg">
                            <option disabled selected>Select time</option>
                            <option>1 days</option>
                            <option>2-7 days</option>
                            <option>8-12 days</option>
                            <option>13-30 days</option>
                            <option>Over 1 month</option>

                        </select>
                    </div>

                    <div className="w-full">
                        <p className="font-semibold pb-1"> Stock Status</p>
                        <select className="p-1 w-full border input-info rounded-lg">
                            <option disabled selected>Select Option</option>
                            <option>Yes</option>
                            <option>No</option>

                        </select>
                    </div>
                </div>

                {/* Row 5 */}
                <div className="mt-5">
                    <p className="font-semibold pb-2">Short description</p>
                    <textarea name="" className="w-full border input-info rounded-lg" placeholder="Write here" rows="5"></textarea>
                </div>

                <h1 className="flex mt-8 items-center gap-3 text-2xl pb-2 font-bold border-b border-[#958d8d]">
                <FaUserCircle /> <span>User Information</span></h1>

                 {/* Row 1,1*/}
                 <div className="flex gap-5 mt-4">
                    <div className="w-full">
                        <p className="font-semibold pb-1">User Name</p>
                        <input type="text" placeholder="Enter your name" className="p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="font-semibold pb-1">Email</p>
                        <input type="text" placeholder="Enter your Email" className="p-1 w-full border input-info rounded-lg" />
                    </div>
                </div>

                <div className="text-center mt-10 mb-4">
                    <input className="btn btn-success px-6" type="submit" name="" id="" value='Add Item'/>
                </div>




            </form>
        </div>
    );
};

export default Home;