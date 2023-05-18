import Feed from "../components/Feed";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <section className="w-full flex flex-col justify-center items-center">
        <h1 className="head_text text-center">
          Create, Discover & Share
          <br />
          <span className="orange_gradient text-center">
            AI Powered Prompts
          </span>
        </h1>
        <p className="desc text-center">
          Promptopedia is an open-source AI prompting tool for modern world to
          create, discover and share creative prompts.
        </p>

        <Feed />
      </section>
    </>
  );
};

export default Home;
