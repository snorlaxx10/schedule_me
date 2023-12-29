import "./post.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Modal from "@mui/material/Modal";
import axios from "axios";
import ScheduleDisplay from "../../components/scheduleDisplay/ScheduleDisplay";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
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

  const removePost = async () => {
    try {
      await axios.delete("/posts/" + post._id, {
        data: { userId: currentUser._id },
      });
      window.location.reload();
      alert("Post successfully deleted!");
    } catch (err) {}
  };

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

  const navigateComment = () => {
    navigate("/comment", {state: {post}});
  };

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
              <Dialog maxWidth = "xl" open={schedule} onClose={closeSchedule}>
                <div className="schModalBox">
                  <div className="schModalHeader">
                    <div className="schHeaderName">Show Schedule:</div>
                    <Button onClick={closeSchedule}>X</Button>
                  </div>
                  <hr className="schHeaderLine" />

                  <div>
                    <ScheduleDisplay schedule={renderSchedule} />
                  </div>
                </div>
              </Dialog>
            </div>

            {/*Delete post button*/}
            <div>
              {post.userId === currentUser._id && (
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  className="postDeleteButton"
                  color="error"
                >
                  X
                </Button>
              )}

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Delete Post?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to want to delete this post?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={removePost} autoFocus>
                    Yes
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
              </Dialog>
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
              <img
                className="commentIcon"
                src={`assets/comment.png`}
                onClick={navigateComment}
              ></img>
              <Button onClick={navigateComment}>Comment</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
