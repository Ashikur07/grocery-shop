//WatercolurPainting
import { useEffect, useState } from "react";
import SubCategoryItemCard from "../SubCategoryItemCard/SubCategoryItemCard";


const WatercolurPainting = () => {

    const [items , setItems ] = useState([]);

    useEffect(() =>{
        fetch('https://assignment-10-server-site-beta.vercel.app/subcategory')
        .then(res => res.json())
        .then(datas =>{
            const data = datas.filter(data => data.subcategory_name === "Watercolour Painting");
            // console.log(data);
            setItems(data);
        })

    },[])

    console.log(items);

    return (
        <div className="mt-12 mb-24">
            <h1 className="text-5xl mb-8 font-semibold text-center">Watercolour Painting</h1>
            <div className="grid grid-cols-2 max-w-4xl mx-auto gap-4 justify-center">
                {
                    items.map(item => <SubCategoryItemCard 
                    key={item._id}
                    item={item}></SubCategoryItemCard>)
                }
            </div>
        </div>
    );
};

export default WatercolurPainting;