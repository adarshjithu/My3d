'use client';
import Header from "@/Components/User/Header/Header";
import "./globals.css";

import Footer from "@/Components/User/Footer/Footer";
import StateProvider from "@/Components/User/ReduxProvider/StateProvider";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation"; // Import usePathname hook

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname(); // Get current pathname

    // Check if the current path starts with "/admin"
    const isAdminRoute = pathname?.startsWith('/admin');
    const isPersonalizeRoute = pathname?.startsWith('/personalize');

    return (
        <html  >
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha384-..." />
                <link
                    href="https://fonts.googleapis.com/css2?family=Grey+Qo&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
            </head>

            <body>
                <Toaster position="top-right" />
                <StateProvider>
                { (isPersonalizeRoute||isAdminRoute)?'':<Header />}
                    {/* { (!isAdminRoute)&&<Header />} */}
                    <div className="min-h-[500px]">{children}</div>
                   { (isPersonalizeRoute||isAdminRoute)?'':<Footer />}
                   {/* { (!isAdminRoute)&&<Footer />} */}
                </StateProvider>
            </body>
        </html>
    );
}
