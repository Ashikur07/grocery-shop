

const LetestCollection = () => {
    return (
        <div>
            <h1 className="bg-white py-2 mx-auto max-w-xl text-center text-5xl font-medium mb-10 mt-20">Our Leatest Collection</h1>

            <div className=" border bg-img h-[700px] justify-between px-10">

                <div className="flex justify-between ">
                    <div className="flex gap-5">
                        <img className="-rotate-12 mt-10 border-[5px] border-blue-700 w-48 h-48" src="https://i.ibb.co/h9jV9ty/photo-1578926375605-eaf7559b1458-q-80-w-1963-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />

                        <img className="mt-32 border-[5px] border-blue-700 w-52 h-64" src="https://i.ibb.co/KVj91Fq/photo-1501786223405-6d024d7c3b8d-q-80-w-1887-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 h-[180px] mt-16">
                        <img className=" border-[5px] border-blue-700 w-40 h-40" src="https://i.ibb.co/vZCmX2m/photo-1616855997498-e0ad5f7721db-q-80-w-1974-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />

                        <img className="border-[5px] border-blue-700 w-40 h-40" src="https://i.ibb.co/BCn1rKt/photo-1413752362258-7af2a667b590-q-80-w-1776-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />

                        <img className=" border-[5px] border-blue-700 w-40 h-40" src="https://i.ibb.co/ykHtM6b/photo-1419064642531-e575728395f2-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />

                        <img className=" border-[5px] border-blue-700 w-40 h-40" src="https://i.ibb.co/jrHht64/photo-1597906379938-c1db1b85d3bd-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />

                    </div>

                    <div className="flex gap-5">
                        <img className="mt-32 border-[5px] border-blue-700 w-52 h-64" src="https://i.ibb.co/2ZWVFzr/photo-1668358526387-df6974f0da04-q-80-w-1890-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />

                        <img className="rotate-12 mt-10 border-[5px] border-blue-700 w-48 h-48" src="https://i.ibb.co/ySG52NY/photo-1579783901586-d88db74b4fe4-q-80-w-1948-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
                    </div>

                </div>

                <div className="mt-28 text-center">
                    <button className="btn px-6 btn-primary text-white">Order Now</button>
                </div>


            </div>
        </div>
    );
};

export default LetestCollection;