"use client";

import React, { useState, useEffect } from "react";
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
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  const filterPrompts = (search: string) => {
    const regex = new RegExp(search, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (post) =>
        regex.test(post.userId.name) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const searchResult = filterPrompts(e.target.value);
    setSearchedResults(searchResult);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    const searchResult = filterPrompts(tag);
    setSearchedResults(searchResult);
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

      <PromptCardList
        data={searchText ? searchedResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
