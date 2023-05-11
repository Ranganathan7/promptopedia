import React from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Provider from "../components/Provider";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";

export const metadata = {
  title: "Promptopedia",
  description: "Create, Discover and Share AI prompts.",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* <Provider> */}
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Navbar />
          {children}
        </main>
        {/* </Provider> */}
      </body>
    </html>
  );
};

export default RootLayout;
