import React from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Provider from "../components/Provider";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promptopedia",
  description: "Create, Discover and Share AI prompts.",
};

const RootLayout: React.FC<{ children: React.ReactNode; session: Session }> = ({
  children,
  session,
}) => {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
