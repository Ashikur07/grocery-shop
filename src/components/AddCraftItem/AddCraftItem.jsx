import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { IoMdCube } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AddCraftItem = () => {

    useEffect(() => {
        document.title = 'Add Craft Item';
      }, []);

    const { user } = useContext(AuthContext);
    const uid = user?.uid;
    const user_name = user?.displayName;
    const user_email = user?.email;
    console.log(uid,user_email,user_name);

    const handleAddItem = e => {
        e.preventDefault();
        const item_name = e.target.item_name.value;
        const price = e.target.price.value;
        const image = e.target.image.value;
        const subcategory_name = e.target.subcategory_name.value;
        const rating = e.target.rating.value;
        const customization = e.target.customization.value;
        const processing_time = e.target.processing_time.value;
        const stockStatus = e.target.stockStatus.value;
        const short_description = e.target.short_description.value;
    

        const newItems = {
            item_name,
            price,
            image,
            subcategory_name,
            rating, customization,
            processing_time,
            stockStatus,
            short_description,
            user_name,
            user_email,
            uid
        }

        // send data to the server
        fetch('https://assignment-10-server-site-beta.vercel.app/items', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newItems)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    console.log('Add Item successfully')
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    e.target.reset();
                }
            })

    }


    return (
        <div className="pb-14">
            <form onSubmit={handleAddItem} className="mx-auto my-10 w-[800px] bg-gray-300 rounded-lg shadow-lg p-6">

                <h1 className="flex items-center gap-3 text-2xl pb-2 font-bold border-b border-[#958d8d]">
                    <IoMdCube /> <span>Product Information</span></h1>

                {/* Row 1 */}
                <div className="flex gap-5 mt-4">
                    <div className="w-full">
                        <p className="font-semibold pb-1">Item Name</p>
                        <input  name="item_name" type="text" placeholder="Enter item name" className="bg-white p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="font-semibold pb-1">Price</p>
                        <input name="price" type="text" placeholder="$0.00" className="bg-white p-1 w-full border input-info rounded-lg" />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-5 mt-4 border-b border-[#958d8d] pb-8">
                    <div className="w-full">
                        <p className="font-semibold pb-1">Photo URL</p>
                        <input name="image" type="text" placeholder="Enter image url" className="bg-white p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="font-semibold pb-1">Subcategory Name</p>
                        <select name="subcategory_name" className="bg-white p-1 w-full border input-info rounded-lg">
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
                        <select name="rating" className="bg-white p-1 w-full border input-info rounded-lg">
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
                        <select name="customization" className="bg-white p-1 w-full border input-info rounded-lg">
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
                        <select name="processing_time" className="bg-white p-1 w-full border input-info rounded-lg">
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
                        <select name="stockStatus" className="bg-white p-1 w-full border input-info rounded-lg">
                            <option disabled selected>Select Option</option>
                            <option>Yes</option>
                            <option>No</option>

                        </select>
                    </div>
                </div>

                {/* Row 5 */}
                <div className="mt-5">
                    <p className="font-semibold pb-2">Short description</p>
                    <textarea name="short_description" className="bg-white w-full border input-info rounded-lg" placeholder="Write here" rows="5"></textarea>
                </div>

        
                <div className="text-center mt-8 mb-4">
                    <input className="btn btn-success px-6 text-white" type="submit" name="" id="" value='Add Item' />
                </div>

            </form>
        </div>
    );
};

export default AddCraftItem;