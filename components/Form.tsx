import React from "react";
import Link from "next/link";

const Form: React.FC<{
  type: "Create" | "Edit";
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  post: { prompt: string; tag: string };
  setPost: React.Dispatch<
    React.SetStateAction<{
      prompt: string;
      tag: string;
    }>
  >;
}> = ({ type, submitting, handleSubmit, post, setPost }) => {
  return (
    <section className="w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        className="my-10 max-w-2xl w-full flex flex-col gap7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPost({ ...post, prompt: e.target.value })
            }
            value={post.prompt}
            placeholder="Write your prompt here..."
            className="form_textarea"
            required
          />
        </label>
        <label className="mt-6">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webDevelopment, #idea,...)
            </span>
          </span>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPost({ ...post, tag: e.target.value })
            }
            value={post.tag}
            placeholder="#tag"
            className="form_input"
            required
          />
        </label>
        <div className="self-end mx-3 my-3 gap-4">
          <Link href="/" className="text-sm text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="ml-3 px-5 py-1.5 tex-sm bg-primary-orange rounded-full text-white hover:bg-green-500"
          >
            {submitting ? `${type}...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
