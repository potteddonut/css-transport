import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Bus Statistics",
    description: "",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
