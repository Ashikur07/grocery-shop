import { IoMdCube } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const UpdateItem = () => {

    const { user } = useContext(AuthContext);
    const uid = user?.uid;
    const user_name = user?.displayName;
    const user_email = user?.email;
  
    const items = useLoaderData();
    const {
        _id,
        item_name,
        price,
        image,
        subcategory_name,
        rating, customization,
        processing_time,
        stockStatus,
        short_description,
    } = items;

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
        const user_name = e.target.user_name.value;
        const user_email = e.target.user_email.value;

        const updatedItem = {
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
        fetch(`https://assignment-10-server-site-beta.vercel.app/items/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })

    }



    return (
        <div>
            <h1 className="bg-white  text-4xl font-bold my-8 py-2 max-w-lg mx-auto text-center">Item Update Now</h1>

            <form onSubmit={handleAddItem} className="mx-auto mb-28 w-[800px] bg-gray-300 rounded-lg shadow-lg p-6">

                <h1 className="flex items-center gap-3 text-2xl pb-2 font-bold border-b border-[#958d8d]">
                    <IoMdCube /> <span>Product Information</span></h1>

                {/* Row 1 */}
                <div className="flex gap-5 mt-4">
                    <div className="w-full">
                        <p className="font-semibold pb-1">Item Name</p>
                        <input name="item_name" type="text" placeholder={item_name} className="bg-white p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="font-semibold pb-1">Price</p>
                        <input name="price" type="text" placeholder={price} className="bg-white p-1 w-full border input-info rounded-lg" />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-5 mt-4 border-b border-[#958d8d] pb-8">
                    <div className="w-full">
                        <p className="font-semibold pb-1">Photo URL</p>
                        <input name="image" type="text" placeholder={image} className="bg-white p-1 w-full border input-info rounded-lg" />
                    </div>
                    <div className="w-full">
                        <p className="font-semibold pb-1">Subcategory Name</p>
                        <select name="subcategory_name" defaultValue={subcategory_name} className="bg-white p-1 w-full border input-info rounded-lg">
                            <option disabled>Select subcategory_Name</option>
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
                        <select defaultValue={rating} name="rating" className="bg-white p-1 w-full border input-info rounded-lg">
                            <option disabled>Select Rating</option>
                            <option>5</option>
                            <option>4</option>
                            <option>3</option>
                            <option>2</option>
                            <option>1</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <p className="font-semibold pb-1"> Customization</p>
                        <select defaultValue={customization} name="customization" className="bg-white p-1 w-full border input-info rounded-lg">
                            <option disabled>Select Option</option>
                            <option>Yes</option>
                            <option>No</option>

                        </select>
                    </div>
                </div>

                {/* Row 4 */}
                <div className="flex gap-5 pt-5 border-b border-[#958d8d] pb-8">
                    <div className="w-full">
                        <p className="font-semibold pb-1">Processing_time</p>
                        <select defaultValue={processing_time} name="processing_time" className="bg-white p-1 w-full border input-info rounded-lg">
                            <option disabled>Select time</option>
                            <option>1 days</option>
                            <option>2-7 days</option>
                            <option>8-12 days</option>
                            <option>13-30 days</option>
                            <option>Over 1 month</option>

                        </select>
                    </div>

                    <div className="w-full">
                        <p className="font-semibold pb-1"> Stock Status</p>
                        <select defaultValue={stockStatus} name="stockStatus" className="bg-white p-1 w-full border input-info rounded-lg">
                            <option disabled>Select Option</option>
                            <option>Yes</option>
                            <option>No</option>

                        </select>
                    </div>
                </div>

                {/* Row 5 */}
                <div className="mt-5">
                    <p className="font-semibold pb-2">Short description</p>
                    <textarea name="short_description" className="bg-white w-full border input-info rounded-lg" placeholder={short_description} rows="5"></textarea>
                </div>

               
        
                <div className="text-center mt-8 mb-4 ">
                    <input className="btn text-white btn-success px-6" type="submit" name="" id="" value='Update Now' />
                </div>

            </form>

        </div>
    );
};

export default UpdateItem;