"use client";
import React, { useState } from "react";
import { Home, Users, Settings, ShoppingCart,Menu, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="w-6 h-6" />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Home className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </button>
              <button
                onClick={() => router.push("admin/users")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Users className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Users</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => setProductMenuOpen(!productMenuOpen)}
              >
                <ShoppingCart className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">Product Management</span>
                {productMenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {productMenuOpen && (
                <ul className="py-2 space-y-2">
                  <li>
                    <button
                      onClick={() => router.push("/admin/products/1")}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      All Products
                    </button>
                  </li>
                  
                  <li>
                    <button
                      onClick={() => router.push("/admin/products/size")}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Size 
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/admin/products/base")}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Base 
                    </button>
                    <button
                      onClick={() => router.push("/admin/products/category")}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Category
                    </button>
                    <button
                      onClick={() => router.push("/admin/products/frames")}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Frames
                    </button>
                  </li>
                </ul>
              )}
            </li>
            <li>
             
              <button
                onClick={() => router.push("/admin/banner")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Users className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Banner</span>
              </button>
            </li>
            <li>
             
              <button
                onClick={() => router.push("admin/banner")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Users className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Orders</span>
              </button>
            </li>
            <li>
             
              <button
                onClick={() => router.push("admin/banner")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Users className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Page Management</span>
              </button>
            </li>
            <li>
             
              <button
                onClick={() => router.push("admin/banner")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Users className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Offers</span>
              </button>
            </li>
            <li>
             
              <button
                onClick={() => router.push("admin/banner")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Users className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Manage Admin</span>
              </button>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
