import { useEffect, useState } from "react";
import CraftCard from "../CraftCard/CraftCard";


const CraftItemSection = () => {

    const [crafts, setCraft] = useState([]);
    console.log(crafts);

    useEffect(() =>{
        fetch('https://assignment-10-server-site-beta.vercel.app/craftItems')
        .then(res => res.json())
        .then(data => setCraft(data))
    },[])
    
    // console.log(crafts);

    return (
        <div className="my-20">
            <div className="text-center space-y-2 mb-8">
                <h1 className='text-4xl font-semibold '>
                    Craft Items</h1>
                <p className="text-lg">Discover our artisanal creations, each a unique masterpiece, inviting you <br /> to explore and find  the perfect treasure trove.</p>
            </div>

            <div className="mx-auto gap-6 grid grid-cols-3 max-w-7xl">
                {
                    crafts.map(craft => <CraftCard
                        key={craft._id}
                        craft={craft}>
                    </CraftCard>)
                }
            </div>

        </div>
    );
};

export default CraftItemSection;