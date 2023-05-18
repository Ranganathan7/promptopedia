import React from "react";
import { Post } from "./Feed";
import PromptCardList from "./PromptCardList";

const Profile: React.FC<{
  name: string;
  desc: string;
  data: Post[];
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => Promise<void>;
}> = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
        <h1 className="head_text text-left">
					<span className="blue_gradient">{name} Profile</span>
				</h1>
				<p className="desc text-left">{desc}</p>
				<PromptCardList 
					data={data} 
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
    </section>
  );
};

export default Profile;
