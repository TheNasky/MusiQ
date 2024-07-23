import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar.jsx";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "MusiQ",
   description: "MusiQ, Comparte listas de musica online",
};

export default function RootLayout({ children }) {
   return (
      <html lang="es">
         <body className={inter.className}>
            <Navbar />
            {children}
         </body>
      </html>
   );
}
