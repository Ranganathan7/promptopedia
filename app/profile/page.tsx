"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "../../components/Profile";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Post } from "../../components/Feed";

const MyProfile: React.FC = () => {
  const { data: session } = useSession();
  const router: AppRouterInstance = useRouter();
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };
    if (!session || !session.user) {
      router.push("/");
    } else {
      fetchPost();
    }
  }, []);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        const filteredPosts = myPosts.filter(
          (myPost) => myPost._id !== post._id
        );
        setMyPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
