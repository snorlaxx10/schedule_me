import "./commentPost.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import ScheduleDisplay from "../../components/scheduleDisplay/ScheduleDisplay";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CommentPost({ post }) {
  const [like, setLike] = useState(post.likes.length || 0);
  const { user: currentUser } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Used to display schedule data.
  const [renderSchedule, setRender] = useState();

  // Schedule useSate.
  const [schedule, setSchedule] = React.useState(false);
  const openSchedule = async () => {
    setSchedule(true);
    await axios
      .get("/schedules/scheduledata/" + post.scheduleID)
      .then((result) => {
        setRender(result.data[0]);
        // .data[0] removes square brackets
      });
  };
  const closeSchedule = () => setSchedule(false);
  const navigate = useNavigate();

  //Add FILLER
  const onPostPfpLink = () => {
    if (currentUser._id === post.user_info._id) {
      navigate("/profile");
    } else navigate("/profile/" + post.user_info._id);
  };

  async function onLikeButtonClick() {
    try {
      let res = await axios.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
      setLike(res.data.total);
    } catch (err) {}
  }

  return (
    <>
      <div className="post">
        {/* Pfp and name above the text here */}

        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <input
                className="pfpScaler"
                type="image"
                name="pfpButton"
                src="assets/default_pfp.jpeg"
                alt=""
                onClick={onPostPfpLink}
              ></input>
              <span className="poster" onClick={onPostPfpLink}>
                {post.user_info.name}
              </span>
            </div>

            {/*View Schedule button*/}
            <div>
              <Button onClick={openSchedule}>View Schedule</Button>
              <Modal open={schedule} onClose={closeSchedule}>
                <div className="schModalBox">
                  <div className="schModalHeader">
                    <div className="schHeaderName">Show Schedule:</div>
                  </div>
                  <hr className="schHeaderLine" />

                  <div>
                    <ScheduleDisplay schedule={renderSchedule} />
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div>
            <div className="postCenter">
              <span className="postTitle">
                <h2>{post.title}</h2>
              </span>
              <div className="postTextContent">{post.desc}</div>
            </div>
          </div>

          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src={`assets/like.png`}
                alt=""
                onClick={onLikeButtonClick}
              />
              <span className="postLikeCounter">{like}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
