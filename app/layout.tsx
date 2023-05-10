import React from "react";
import "../styles/globals.css";

export const metadata = {
    title: "Promptopedia",
    description: "Create, Discover and Share AI prompts.",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
