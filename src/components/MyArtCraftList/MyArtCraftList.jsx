import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import MyListCard from "../MyListCard/MyListCard";


const MyArtCraftList = () => {

    useEffect(() => {
        document.title = 'My Art & Craft List';
      }, []);

    const { user } = useContext(AuthContext);
    const lodedItems = useLoaderData();
    const [items, setItems] = useState(lodedItems);

    const [getData, setgetData] = useState([]);
    const [lodedData, setLodedData] = useState([]);

    useEffect(() => {
        fetch('https://assignment-10-server-site-beta.vercel.app/items')
            .then(res => res.json())
            .then(data => {
                const filterData = data.filter(item => item.uid === user?.uid);
                setLodedData(filterData);
                setgetData(filterData);

            })
    }, [])


    const handleOnSubmit = e => {     
        const value = e.target.value;
        console.log(value);

        if (value === 'Yes') {
            setLodedData(getData);
           const newData = lodedData.filter(item => item.customization === 'Yes');
            setLodedData(newData);
            return;
        }
        else if (value === 'No') {
            setLodedData(getData);
            const newData = lodedData.filter(item => item.customization === 'No');
            setLodedData(newData);
            return;
        }
    }



    return (
        <div className="min-h-[80vh]">
            <h1 className='bg-slate-300 my-8 text-center pt-4 lg:pt-7 h-[70px] lg:h-[100px] text-3xl font-bold'>
                My Art & Craft List</h1>

            <h1></h1>

            <div className="text-center mb-10">
                <select onClick={handleOnSubmit} className="bg-white text-lg select select-info w-full max-w-[250px]">
                    <option disabled selected>Select Customization</option>
                    <option>Yes</option>
                    <option>No</option>
                </select>

            </div>

            {lodedData.length > 0 ?
                <div className="mb-32">
                    {
                        lodedData.map(item => <MyListCard
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