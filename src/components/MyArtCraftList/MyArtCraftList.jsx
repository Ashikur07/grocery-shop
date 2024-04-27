import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import MyListCard from "../MyListCard/MyListCard";


const MyArtCraftList = () => {

    const { user } = useContext(AuthContext);
    const lodedItems = useLoaderData();
    const [items, setItems] = useState(lodedItems);
    console.log(items.length);

    const myItems = items.filter(item => item.uid === user?.uid);
    console.log(myItems);

    return (
        <div className="h-[80vh]">
            <h1 className='bg-slate-300 my-8 text-center pt-4 lg:pt-7 h-[70px] lg:h-[100px] text-3xl font-bold'>
                My Art & Craft List</h1>

            { items.length > 1?
                <div className="mb-32">
                    {
                        myItems.map(item => <MyListCard
                            key={item._id}
                            item={item}
                            items={items}
                            setItems={setItems}
                        ></MyListCard>)
                    }
                </div>
                :
                <div className="mt-20 text-center bg-cyan-300 space-y-5 rounded-xl border py-10 w-[550px] mx-auto">
                    <h1 className="text-5xl font-semibold">No data found ...!!!</h1>
                    <p className="text-2xl font-medium">Please add an item</p>
                    <Link to='/addCraftItem'> <button className="text-white mt-5 text-lg btn btn-success">Add Now</button></Link>

                </div>
            }

        </div>
    );
};

export default MyArtCraftList;