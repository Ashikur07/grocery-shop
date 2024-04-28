import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";


const MyListCard = ({ item, items, setItems }) => {

    const { _id } = item;

    // delete item functionality
    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://assignment-10-server-site-beta.vercel.app/items/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Item has been deleted.',
                                'success'
                            )
                            const remaining = items.filter(item => item._id !== _id);
                            setItems(remaining);
                        }
                    })

            }
        })
    }



    return (
        <div className='lg:h-[300px] flex gap-6 card-style p-4 mx-52 mb-5 '>

            <div className=''>
                <img className="rounded-xl w-[350px] h-[270px]" src={item.image} alt="" />
            </div>


            <div className="rounded-xl flex-grow bg-slate-200 py-4 px-8">

                <h1 className='pb-4 font-bold text-2xl border-b-2 border-dashed border-[#988a8a]'>{item.item_name}</h1>
                <p className='text-xl font-medium pt-3 pb-2'>Price : ${item.price}</p>

                <div className="flex items-center gap-2 text-lg font-medium">
                    <p className=''>
                        Rating : {item.rating}
                    </p>
                    <FaStar />
                </div>


                <div className='py-2 flex flex-col lg:flex-row gap-4 lg:gap-10 text-lg font-medium'>

                    <p> Customization: {item.customization}</p>
                    <p> Stock Status: {item.stockStatus}</p>

                </div>


                <div className='flex flex-col lg:flex-row gap-4 mt-4 items-center'>

                    <button onClick={() => handleDelete(_id)} className='font-medium text-lg btn btn-warning text-white'>Delete</button>

                    <Link to={`/update/${item._id}`}>
                        <button className='view-details ml-16 lg:ml-0 mt-4 lg:mt-0'>Update</button>
                    </Link>
                </div>

            </div>

        </div>
    );
};

// MyListCard.prototype = {
//     item: PropTypes.object,
// }


export default MyListCard;