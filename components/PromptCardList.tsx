import React from "react";
import { Post } from "./Feed";
import PromptCard from "./PromptCard";

const PromptCardList: React.FC<{
  data: Post[];
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => Promise<void>;
}> = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: Post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick && handleTagClick}
          handleEdit={handleEdit && handleEdit}
          handleDelete={handleDelete && handleDelete}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
