import React from "react";
import { useLoaderData } from "react-router-dom";
import { getPostData } from "../services/post.js";
import styled from "styled-components";

const StyledItemWrapper = styled.div`
  border: 1px solid blue;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
`;

export default function Post() {
  const { posts } = useLoaderData();
  return (
    <div>
      {posts.map((post) => (
        <StyledItemWrapper>
          <div>{post.title}</div>
          <div>{post.body}</div>
        </StyledItemWrapper>
      ))}
    </div>
  );
}

export async function postLoader() {
  const res = await getPostData();
  return {
    posts: res.data,
  };
}
