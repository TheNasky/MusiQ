import { Inter, Roboto } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
   weight: ['400', '700'],
   subsets: ['latin'],
});

export const metadata = {
   title: "MusiQ",
   description: "MusiQ, Comparte listas de musica online",
};

export default function RootLayout({ children }) {
   return (
      <html lang="es">
         <body className={roboto.className}>            
            {children}
         </body>
      </html>
   );
}
