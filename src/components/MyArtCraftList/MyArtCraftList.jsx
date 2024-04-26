import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const MyArtCraftList = () => {

    const {user} =useContext(AuthContext);
    const items = useLoaderData();
   
    const myItems = items.filter(item => item.uid === user?.uid);
    console.log(myItems);

    return (
        <div>
            
        </div>
    );
};

export default MyArtCraftList;