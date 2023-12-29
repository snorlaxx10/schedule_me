import "./feed.css";
import Post from "../post/Post";
import Share from "../share/Share";
import { useState, useEffect } from "react";
import { getPosts, getByPopular } from "../../apiCalls.js";
import React from "react";
import Select from "react-select";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [selector, setSelector] = useState(null);
  const options = [
    {
      isDisabled: true,
      value: "Please choose an option",
      label: "Please choose an option",
    },
    { value: "Most Popular", label: "Most Popular" },
    { value: "Newest", label: "Newest" },
  ];

  useEffect(() => {
    getPosts()
      .then((result) => {
        setPosts(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(selector);
    try {
      if (selector === "Most Popular") {
        getByPopular().then((result) => {
          setPosts(result);
        });
      } else {
        getPosts().then((result) => {
          setPosts(result);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [selector]);

  const handleChangeSelect = (event) => {
    console.log(event.currentTarget.value);
    setSelector(event.currentTarget.value);
  };

  const handleChange = (selectedOption) => {
    console.log(selectedOption["value"]);
    setSelector(selectedOption["value"]);
  };

  return (
    <>
      <div className="feedContainer">
        <div className="postControlContainer">
          <div className="majorSelection">
            <Select
              options={options}
              defaultValue={options[0]}
              onChange={handleChange}
            />
          </div>
          <div className="createPost">
            {" "}
            <Share />
          </div>
        </div>
        <div className="postContainer">
          {posts.length > 0
            ? posts.map((p) => {
                return <Post key={p._id} post={p}></Post>;
              })
            : " "}
          {/* {posts.length > 0
            ? posts.map((_, index) => {
                const p = posts[posts.length - 1 - index];
                // the index makes the most recent post pop up first?
                return <Post key={p._id} post={p}></Post>;
              })
            : " "} */}
        </div>
      </div>
    </>
  );
}
