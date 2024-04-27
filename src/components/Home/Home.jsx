import Banner from "../Banner/Banner";
import BestSelling from "../BestSelling/BestSelling";
import CraftItemSection from "../CraftItemSection/CraftItemSection";

const Home = () => {

    return (
        <div className="bg-white">
            <Banner></Banner>
            <CraftItemSection></CraftItemSection>
            <BestSelling></BestSelling>
        </div>
    );
};

export default Home;