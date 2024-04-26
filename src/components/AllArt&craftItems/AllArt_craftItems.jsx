import { useLoaderData } from "react-router-dom";
import Row from "../Row/Row";


const AllArt_craftItems = () => {

    const items = useLoaderData();


    return (
        <div className="overflow-x-auto px-32 h-[80vh] pb-32">

            <h1 className="text-4xl font-bold text-center py-12">All Art & Craft Item List</h1>

            <table className="table border-2">
                {/* head */}
                <thead>
                    <tr className="text-lg text-black">
                        <th>Image</th>
                        <th>Item Name</th>
                        <th>Subcategory Name</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    { items.map(item => <Row 
                    key={item._id}
                    item={item}></Row>)}

                </tbody>


            </table>

        </div>
    );
};

export default AllArt_craftItems;
