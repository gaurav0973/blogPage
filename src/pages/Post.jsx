import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-12">
      <Container>
        <div className="w-full flex justify-center mb-6 relative border rounded-xl p-4 bg-white dark:bg-gray-800 shadow-md border-gray-200 dark:border-gray-700">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl max-h-96 object-cover"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{post.title}</h1>
        </div>
        <div className="browser-css text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-inner">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
