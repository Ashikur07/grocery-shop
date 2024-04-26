import { Link } from "react-router-dom";

const Row = ({ item }) => {

    console.log(item);

    return (

        <tr>
            <td>
                <img className="w-32 h-32" src={item.image
                } alt="Avatar Tailwind CSS Component" />
            </td>

            <td className="text-base font-semibold">
                {item.item_name}
            </td>

            <td>{item.subcategory_name}</td>

            <td className="font-bold">$ {item.price}</td>

            <td className="font-bold">{item.rating}</td>

            <td>
                <Link to={`/details/${item._id}`} className="btn btn-success text-white px-6">details</Link>
            </td>
        </tr >
    );
};

export default Row;