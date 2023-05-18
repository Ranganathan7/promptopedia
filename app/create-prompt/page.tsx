"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "../../components/Form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";

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
    if (!post.tag || !post.prompt || !session || !session.user) return;
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session.user.id,
        }),
      });
      const data = await response.json();
      if (!data.error) {
        toast.success(data.message);
        router.push("/");
      } else {
        throw data.error;
      }
    } catch (err) {
      toast.error(JSON.stringify(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form
        type="Create"
        submitting={submitting}
        handleSubmit={createPrompt}
        post={post}
        setPost={setPost}
      />
      <Toast />
    </>
  );
};

export default CreatePrompt;
