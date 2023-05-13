"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../../components/Form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const UpdatePrompt: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<{ prompt: string; tag: string }>({
    prompt: "",
    tag: "",
  });
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    if (!session || !session.user) {
      router.push("/");
    }
    if (!promptId) {
      router.push("/profile");
    }
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`api/prompt/${promptId}`);
        const { prompt, tag } = await response.json();
        setPost({ prompt: prompt, tag: tag });
      } catch (err) {
        console.log(err);
      }
    };
    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      submitting={submitting}
      handleSubmit={updatePrompt}
      post={post}
      setPost={setPost}
    />
  );
};

export default UpdatePrompt;
