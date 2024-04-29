import { useEffect } from "react";
import ArtCraftCategories from "../ArtCraftCategories/ArtCraftCategories";
import Banner from "../Banner/Banner";
import BestSelling from "../BestSelling/BestSelling";
import CraftItemSection from "../CraftItemSection/CraftItemSection";
import LetestCollection from "../LetestCollection/LetestCollection";

const Home = () => {

    useEffect(() => {
        document.title = 'Home';
      }, []);

    return (
        <div className="">
            <Banner></Banner>
            <LetestCollection></LetestCollection>
            <CraftItemSection></CraftItemSection>
            <BestSelling></BestSelling>
            <ArtCraftCategories></ArtCraftCategories>

        </div>
    );
};

export default Home;