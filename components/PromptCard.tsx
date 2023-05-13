"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Post } from "./Feed";

const PromptCard: React.FC<{
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => Promise<void>;
}> = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    if (copied) return;
    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={() => {
            session?.user?.id === post.userId._id
              ? router.push("/profile")
              : router.push(`/profile/${post.userId._id}`);
          }}
        >
          <Image
            src={post.userId.image}
            alt="creator-image"
            height={40}
            width={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.userId.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.userId.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied ? "/icons/tick.svg" : "/icons/copy.svg"}
            alt={copied ? "tick-icon" : "copy-icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user?.id === post.userId._id && pathname === "/profile" && (
        <div className="flex justify-center items-center mt-5 gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
