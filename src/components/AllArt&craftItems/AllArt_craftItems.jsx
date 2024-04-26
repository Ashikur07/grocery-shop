import { useLoaderData } from "react-router-dom";


const AllArt_craftItems = () => {

    const items = useLoaderData();
    // console.log(items);
    // const item = items.filter(item => item._id == "662b3d1027d7580d0f7d1917");
    // console.log(item);

    //
    const datas = [
        {id: '1', name: 'raj', email: 'ashik.ict454@gmail.com'},
        {id: '1', name: 'Ashik', email: 'ashik.ict454@gmail.com'},
        {id: '1', name: 'burhan', email: 'ashik.ict454@gmail.com'},
        {id: '2', name: 'hemayet', email: 'ashik.ict454@gmail.com'},
        {id: '3', name: 'miad', email: 'ashik.ict454@gmail.com'}
    ]

    console.log(datas);
    const data = datas.filter(item => item.id == "1");
    console.log(data);


    return (
        <div>
           total item : {items.length}
        </div>
    );
};

export default AllArt_craftItems;
