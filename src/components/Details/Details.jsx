import { useLoaderData } from "react-router-dom";

const Details = () => {

    const item = useLoaderData();
    console.log(item);
    
    return (
        <div>
            This is Details page
        </div>
    );
};

export default Details;