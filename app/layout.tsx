import React from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Provider from "../components/Provider";
import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "Promptopedia",
  description: "Create, Discover and Share AI prompts.",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
        <Toast />
      </body>
    </html>
  );
};

export default RootLayout;
