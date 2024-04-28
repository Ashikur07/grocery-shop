import { Link } from "react-router-dom";


const CategoriesCard = ({ item }) => {

    console.log(item);
    const routes = item.routesInfo;
    console.log(routes)

    return (
        <div>
            <div className="bg-white mt-5 card w-96 bg-base-100 shadow-2xl">
                <figure className="px-6 pt-6">
                    <img src={item.image} alt="Shoes" className="rounded-xl w-96 h-[350px]" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="text-3xl font-semibold mb-5">{item.subcategory_name}</h2>
                    <div className="card-actions">
                        <Link to={`/${routes}`}><button className="btn btn-primary">View More</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesCard;