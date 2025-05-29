import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
