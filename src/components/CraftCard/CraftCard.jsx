import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";


const CraftCard = ({ craft }) => {

    const { id, image, item_name, subcategory_Name, processing_time, rating, price } = craft;

    return (
        <div data-aos="zoom-in" data-aos-duration="1000" className="card bg-base-100 shadow-xl border border-[#d8c7c7]">
            <figure><img className="h-[350px] w-full" src={image} alt="Image comming" /></figure>
            <div className="card-body mr-4 lg:mr-0">
                <h2 className="text-2xl font-semibold">{item_name}</h2>
                <p className='text-base font-semibold'>{subcategory_Name}</p>

                <div className='pt-5 space-y-2'>
                    <p className="text-base"><span className="font-semibold">Process Time :</span> {processing_time}</p>
                    <p className='text-base font-bold flex items-center gap-1'><span>Rating : {rating}</span> <FaStar /></p>

                </div>

                <div className="flex items-center justify-between">
                    <h1 className='font-bold'>price: {price}</h1>
                    <Link to={`/details/${id}`} className="btn bg-cyan-800 text-white hover:bg-green-800">View Details</Link>
                </div>
            </div>
        </div>
    );
};


export default CraftCard;