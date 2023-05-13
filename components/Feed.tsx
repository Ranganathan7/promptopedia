"use client";

import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";

export interface Post {
  prompt: string;
  tag: string;
  _id: string;
  userId: {
    _id: string;
    image: string;
    name: string;
    email: string;
  };
}

const Feed: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search: string = e.target.value;
    setSearchText(search);
  };

  return (
    <section className="feed">
      <form className="relative flex justify-center items-center w-full">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for a tag or an username"
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearchChange(e)
          }
          required
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
