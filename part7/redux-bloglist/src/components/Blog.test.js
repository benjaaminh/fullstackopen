import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author but not url or likes", () => {
  const blog = {
    title: "example title",
    author: "me",
    url: "example.com",
    likes: 1,
    user: {
      //example user
      id: 1234,
      username: "name",
    },
  };

  const { container } = render(<Blog blog={blog} />);

  //using css selector- container
  const div = container.querySelector(".hidden");
  expect(div).toHaveTextContent("example title me");
  expect(div).not.toHaveTextContent("example.com");
  expect(div).not.toHaveTextContent("1");
});

test("after clicking the button, likes and url are displayed", async () => {
  const blog = {
    title: "example title",
    author: "me",
    url: "example.com",
    likes: 1,
    user: {
      //example user
      id: 1234,
      username: "name",
    },
  };

  const { container } = render(<Blog blog={blog} user={blog.user} />);
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".visible");
  expect(div).toHaveTextContent("example.com");
  expect(div).toHaveTextContent("1");
});
test("if like button is clicked twice, event handler is called twice", async () => {
  const mockHandler = jest.fn();

  const blog = {
    title: "example title",
    author: "me",
    url: "example.com",
    likes: 1,
    user: {
      //example user
      id: 1234,
      username: "name",
    },
  };

  render(<Blog blog={blog} user={blog.user} updateLikes={mockHandler} />);
  const user = userEvent.setup();
  const expandButton = screen.getByText("view");
  await user.click(expandButton);

  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
