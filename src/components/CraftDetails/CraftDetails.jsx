import { Link, useLoaderData } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const CraftDetails = () => {

    const item = useLoaderData();
    console.log(item);
    const {
        item_name,
        price,
        image,
        subcategory_name,
        rating,
        customization,
        processing_time,
        stockStatus,
        short_description,
    } = item;


    return (
        <div className="border rounded mx-20 mt-10 mb-32 p-8 bg-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-8">

            <section className=" lg:h-[670px]  w-full rounded-2xl ">
                <img className="w-full h-full rounded-md" src={image} alt="" />
            </section>

            <section className="bg-white rounded-md px-12 pt-10">

                <h1 className="text-4xl font-bold">{item_name}</h1>
                <p className="text-xl font-medium py-4">Category : {subcategory_name}</p>

                <div className="text-xl font-medium pb-6 pt-3 border-y-2 space-y-3">
                    <p className='pt-2'>Price : ${price}</p>
                    <div className="flex items-center gap-2 ">
                        <p className=''>
                            Rating : {rating}
                        </p>
                        <FaStar />
                    </div>
                    <p> Customization: {customization}</p>
                    <p> Stock Status: {stockStatus}</p>
                    <p>Processing Time : {processing_time}</p>
                </div>

                <div className="py-6 text-lg">
                    <p className="text-xl font-bold pb-2">Description :</p>
                    {short_description}</div>


                <Link to='/'>
                    <button className="btn mt-4 btn-success text-white">Back to Home Page</button>
                </Link>


            </section>
        </div>
    );
};

export default CraftDetails;