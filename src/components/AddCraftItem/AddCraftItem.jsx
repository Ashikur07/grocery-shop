import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddCraftItem = () => {

    const {user} = useContext(AuthContext);
    const uid = user?.uid;
    console.log(uid);

    const handleAddItem = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const name = e.target.name.value;
        const newItems = { name, email , uid}

         // send data to the server
                fetch('http://localhost:5000/items', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newItems)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.insertedId) {
                           console.log('Add Item successfully')
                        }
                    })

    
    }


    return (
        <div>
            <form onSubmit={handleAddItem} className="flex flex-col space-y-2 ml-40">
                <input type="text" placeholder="1" className="input input-bordered input-primary w-full max-w-xs" name='name' />

                <input type="text" placeholder="2" className="input input-bordered input-primary w-full max-w-xs" name='email'/>

                <input className="btn btn-primary" type="submit" value='submit'/>
            
            </form>
        </div>
    );
};

export default AddCraftItem;