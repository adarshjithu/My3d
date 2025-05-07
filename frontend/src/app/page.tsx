
import Banner from "@/Components/User/Banner/Banner";
import ProductDetails from "@/Components/User/Details/Details";
import Products from "@/Components/User/Products/Products";


export default async function Home() {
    return (
        <div >
         
            <Banner />
            <Products />
            <ProductDetails/>
        </div>
    );
}
