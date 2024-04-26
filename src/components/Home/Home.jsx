import { useLoaderData } from "react-router-dom";
import Row from "../Row/Row";


const Home = () => {

    const lodedUser = useLoaderData();
    console.log(lodedUser);


    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Email</th>  
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                   {
                    lodedUser.map(user => <Row 
                    key={user._id}
                    user={user}
                    ></Row>)
                   }
                </tbody>
             

            </table>
        </div>
    );
};

export default Home;