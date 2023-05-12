"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "../../components/Form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const CreatePrompt: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<{ prompt: string; tag: string }>({
    prompt: "",
    tag: "",
  });
  const router: AppRouterInstance = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) {
      router.push("/");
    }
  }, []);

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
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
      type="Create"
      submitting={submitting}
      handleSubmit={createPrompt}
      post={post}
      setPost={setPost}
    />
  );
};

export default CreatePrompt;
