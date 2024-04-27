import CraftCard from "../CraftCard/CraftCard";


const CraftItemSection = () => {

    const crafts = [
        {
            "id": "1",
            "image": "https://i.ibb.co/vvtKYZh/photo-1579783901586-d88db74b4fe4-q-80-w-1948-auto-format-fit-crop-ixlib-rb-4-0.jpg",
            "item_name": "Mountain View Canvas",
            "subcategory_Name": "Landscape Painting",
            "short_description": "Capture the serene beauty of mountains with this stunning canvas painting.",
            "price": "$100",
            "rating": "4.8",
            "customization": "Yes",
            "processing_time": "3-5 business days",
            "stockStatus": "In stock"
        },
        {
            "id": "2",
            "image": "https://i.ibb.co/vvtKYZh/photo-1579783901586-d88db74b4fe4-q-80-w-1948-auto-format-fit-crop-ixlib-rb-4-0.jpg",
            "item_name": "Pencil Sketch Portrait",
            "subcategory_Name": "Portrait Drawing",
            "short_description": "Get a lifelike portrait drawn in detailed pencil strokes.",
            "price": "$80",
            "rating": "4.9",
            "customization": "Yes",
            "processing_time": "2-4 business days",
            "stockStatus": "In stock"
        },
        {
            "id": "3",
            "image": "https://i.ibb.co/vvtKYZh/photo-1579783901586-d88db74b4fe4-q-80-w-1948-auto-format-fit-crop-ixlib-rb-4-0.jpg",
            "item_name": "Floral Watercolor Art",
            "subcategory_Name": "Watercolour Painting",
            "short_description": "Add a touch of nature's beauty to your space with this vibrant floral watercolor art.",
            "price": "$120",
            "rating": "4.7",
            "customization": "No",
            "processing_time": "5-7 business days",
            "stockStatus": "In stock"
        },
        {
            "id": "4",
            "image": "https://i.ibb.co/vvtKYZh/photo-1579783901586-d88db74b4fe4-q-80-w-1948-auto-format-fit-crop-ixlib-rb-4-0.jpg",
            "item_name": "Realistic Oil Portrait",
            "subcategory_Name": "Oil Painting",
            "short_description": "Experience the richness and depth of oil colors with this lifelike portrait painting.",
            "price": "$150",
            "rating": "4.8",
            "customization": "Yes",
            "processing_time": "4-6 business days",
            "stockStatus": "In stock"
        },
        {
            "id": "5",
            "image": "https://i.ibb.co/vvtKYZh/photo-1579783901586-d88db74b4fe4-q-80-w-1948-auto-format-fit-crop-ixlib-rb-4-0.jpg",
            "item_name": "Figure Charcoal Sketch",
            "subcategory_Name": "Charcoal Sketching",
            "short_description": "Capture the essence of figures with the bold strokes of charcoal in this sketch.",
            "price": "$90",
            "rating": "4.6",
            "customization": "Yes",
            "processing_time": "3-5 business days",
            "stockStatus": "In stock"
        },
        {
            "id": "6",
            "image": "https://i.ibb.co/vvtKYZh/photo-1579783901586-d88db74b4fe4-q-80-w-1948-auto-format-fit-crop-ixlib-rb-4-0.jpg",
            "item_name": "Comic Strip Drawing",
            "subcategory_Name": "Cartoon Drawing",
            "short_description": "Bring your stories to life with this fun and engaging comic strip drawing.",
            "price": "$70",
            "rating": "4.5",
            "customization": "Yes",
            "processing_time": "2-4 business days",
            "stockStatus": "In stock"
        }
    ]

    console.log(crafts);

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
                        key={craft.id}
                        craft={craft}>
                    </CraftCard>)

                }
            </div>
        </div>
    );
};

export default CraftItemSection;