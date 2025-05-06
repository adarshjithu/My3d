"use client";
import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { useRouter } from "next/navigation";
import ForgetPasswordModal from "../ForgetPassword/page";
import { getCategories } from "@/Services/userServices";
import { ICategory } from "@/Interfaces/ICategory";

export default function Header() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const user = useSelector((data: IRootState) => data?.auth?.userData);
    const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
    const router = useRouter();
    const [categories, setCategories] = useState<ICategory[]>([]);

    // State for managing visibility of dropdown
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleLoginModal = () => {
        setIsLoginModalVisible(!isLoginModalVisible);
    };

    // Toggle dropdown visibility when "OUR PRODUCTS" is clicked
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await getCategories();
            setCategories(res?.data?.data);
        };
        fetchData();
    }, []);

    return (
        <>
            <header className="bg-[#0C3661] text-white text-xs">
                <div className="flex items-center justify-between px-6 py-5 md:px-12">
                    {/* Logo */}
                    <div className="text-lg font-bold">
                        <a href="/" className="text-white hover:text-gray-400">
                            <img className="w-[70px]" src={'https://crystalcorp.com/my3dpic/wp-content/uploads/2023/12/logo.png'} alt="" />
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex space-x-4 text-xs font-medium relative">
                        <div
                            className="group relative"
                            onClick={toggleDropdown} // Toggle dropdown visibility on click
                        >
                            <a className="hover:text-gray-400 cursor-pointer ml-6">OUR PRODUCTS</a>
                            {/* Dropdown Menu */}
                            <div
                                className={`absolute left-0 top-full bg-[#141414] text-white text-lg shadow-md rounded-lg w-96 h-auto z-[9999] ${
                                    isDropdownVisible ? "block" : "hidden"
                                }`}
                                style={{ marginTop: "2rem" }} // Adjusted marginTop to prevent dropdown shift
                            >
                                <ul>
                                    {categories?.map((obj: ICategory,id:number) => {
                                        return (
                                            <li key={id} className="px-8 py-3 hover:bg-gray-800">
                                                <button  onClick={()=>router.push(`/category/${obj?.name}`)}> {obj?.name}</button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        <a href="/products" className="hover:text-gray-400 ml-6">
                            ABOUT US
                        </a>
                        <a href="/reviews" className="hover:text-gray-400 ml-6">
                            CONTACTS
                        </a>
                        <a href="/faq" className="hover:text-gray-400 ml-6">
                            FAQ
                        </a>
                        <a href="/contact" className="hover:text-gray-400 ml-6">
                            CONTACT
                        </a>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-5">
                        {/* Search Icon */}
                        <button className="hover:text-gray-400 ml-3">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>

                        {/* Profile Icon */}
                        {user ? (
                            <button className="hover:text-gray-400 ml-3" onClick={() => router.push("/profile")}>
                                <i className="fas fa-user"></i>
                            </button>
                        ) : (
                            <button className="hover:text-gray-400 ml-3" onClick={toggleLoginModal}>
                                <i className="fas fa-user"></i>
                            </button>
                        )}

                        {/* Cart Icon */}
                        <button className="hover:text-gray-400 relative ml-3">
                            🛒
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1">2</span>
                        </button>

                        {/* Hamburger Menu for Mobile */}
                        <button className="block md:hidden hover:text-gray-400" onClick={toggleSidebar}>
                            ☰
                        </button>
                    </div>
                </div>
            </header>

            {/* Sidebar for Mobile */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#141414] text-white transform ${
                    isSidebarVisible ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                {/* Close Button */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={toggleSidebar}>
                    ✕
                </button>

                {/* Sidebar Links */}
                <nav className="mt-16 flex flex-col space-y-4 px-6 text-xs font-medium">
                    <a href="/specials" className="hover:text-gray-400">
                        OUR PRODUCTS
                    </a>
                    <a href="/products" className="hover:text-gray-400">
                        ABOUT US
                    </a>
                    <a href="/reviews" className="hover:text-gray-400">
                        CONTACTS
                    </a>
                    <a href="/faq" className="hover:text-gray-400">
                        FAQ
                    </a>
                    <a href="/contact" className="hover:text-gray-400">
                        CONTACT
                    </a>
                </nav>
            </div>

            {isSidebarVisible && <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={toggleSidebar}></div>}
            {forgetPasswordModal && <ForgetPasswordModal forgetPasswordModal={forgetPasswordModal} setForgetPasswordModal={setForgetPasswordModal} />}
            {/* Login Modal */}
            {signupModal && <Signup setSignupModal={setSignupModal} setIsLoginModalVisible={setIsLoginModalVisible} />}

            {isLoginModalVisible && (
                <Login
                    forgetPasswordModal={forgetPasswordModal}
                    setForgetPasswordModal={setForgetPasswordModal}
                    setSignupModal={setSignupModal}
                    setIsLoginModalVisible={setIsLoginModalVisible}
                />
            )}
        </>
    );
}
