"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "../../../components/Profile";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Post } from "../../../components/Feed";

export interface User {
  name: string;
  email: string;
  image: string;
}

const UserProfile: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { data: session } = useSession();
  const router: AppRouterInstance = useRouter();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json();
      setUser(data);
    };
    fetchPost();
    fetchUser();
  }, []);

  return (
    <Profile
      name={user ? `${user.name}'s` : "No User"}
      desc={
        user
          ? `Welcome to ${user.name}'s personalized profile page. Explore ${user.name}'s exceptional prompts and be inspired by the power of their imagination`
          : ""
      }
      data={userPosts}
    />
  );
};

export default UserProfile;
