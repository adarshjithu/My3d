import Banner from "@/Components/User/Banner/Banner";
import ProductDetails from "@/Components/User/Details/Details";
import Products from "@/Components/User/Products/Products";
import ProductsGrid from "@/Components/User/Products/ProductsGrid";
import Image from "next/image";

export default async function Home() {
    return (
        <div >
         
            <Banner />
            <Products />
            <ProductDetails/>
        </div>
    );
}
