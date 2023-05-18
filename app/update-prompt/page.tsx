"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../../components/Form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { toast } from "react-toastify";

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
  const [previousPost, setPreviousPost] = useState<{
    prompt: string;
    tag: string;
  }>();

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
        const data = await response.json();
        const { prompt, tag } = data.prompt;
        if (!data.error) {
          setPreviousPost({ prompt: prompt, tag: tag });
          setPost({ prompt: prompt, tag: tag });
        } else {
          throw data.error;
        }
      } catch (err) {
        toast.error(JSON.stringify(err));
      }
    };
    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (
        previousPost &&
        previousPost.prompt === post.prompt &&
        previousPost.tag === post.tag
      ) {
        throw "Make changes to update!";
      }
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
      const data = await response.json();
      if (!data.error) {
        toast.success(data.message);
        router.push("/profile");
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
        type="Update"
        submitting={submitting}
        handleSubmit={updatePrompt}
        post={post}
        setPost={setPost}
      />
    </>
  );
};

export default UpdatePrompt;
