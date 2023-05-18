"use client";

import React, { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";
import { toast } from "react-toastify";
import Toast from "./Toast";

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
  const [allPosts, setAllPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        if (!data.error) {
          setPosts(data.prompts);
          setAllPosts(data.prompts);
        } else {
          throw data.error;
        }
      } catch (err) {
        toast.error(JSON.stringify(err));
      }
    };
    fetchPost();
  }, []);

  const filterPrompts = (search: string) => {
    const regex = new RegExp(search, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (post) =>
        regex.test(post.userId.name) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const searchResult = filterPrompts(e.target.value);
    setPosts(searchResult);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    const searchResult = filterPrompts(tag);
    setPosts(searchResult);
  };

  return (
    <>
      <section className="feed">
        <form className="relative flex justify-center items-center w-full">
          <input
            type="text"
            className="search_input peer"
            placeholder="Search for a tag or a prompt or an username"
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchChange(e)
            }
            required
          />
        </form>

        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      </section>
      <Toast />
    </>
  );
};

export default Feed;
