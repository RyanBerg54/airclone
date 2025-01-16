import type { Metadata } from "next";
import { Geist, Geist_Mono,Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import  getCurrentUser  from "./actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import ClientOnly from "@/components/ClientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const nunito = Nunito({
  
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser= await getCurrentUser() 
  return (
    <html lang="en">
      <body
        className={nunito.className}
      >
        <ToasterProvider/>
        <RegisterModal/>
        <RentModal/>
        <LoginModal/>
        <ClientOnly><Navbar currentUser={currentUser}/></ClientOnly>
        <div className="pb-20 pt-28">
        {children}
        </div>
      </body>
    </html>
  );
}
