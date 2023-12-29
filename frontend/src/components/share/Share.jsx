import "./share.css";
import * as React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export function Error({ errors }) {
  return <div className={"shareError"}>{errors ? "Required" : " "}</div>;
}

export default function Share() {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState([]);

  const handleOpen = async () => {
    setOpen(true);
    await axios.get("/schedules/" + user._id).then((result) => {
      setList(result.data);
      console.log(result.data);
    });
    console.log(list);
  };
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const titleRef = useRef();
  const descRef = useRef();
  const scheduleNameRef = useRef();

  const onSubmit = async (data) => {
    const json = JSON.stringify(data, null, 4);
    const obj = JSON.parse(json);

    const newPost = {
      userId: user._id,
      title: obj.title,
      desc: obj.desc,
      scheduleName: obj.scheduleName,
      scheduleID: list.find((o) => o.scheduleName === obj.scheduleName),
    };

    try {
      if (newPost.scheduleName === "DEFAULT") {
        alert("You must choose a schedule for your post!");
      } else {
        alert("Post sucessfully created!");
        await axios.post("/posts", newPost);
        reset();
        setOpen(false);
        window.location.reload();
        console.log(data);
      }
    } catch (err) {}
  };

  return (
    <div>
      <button className="CreatePostButton" onClick={handleOpen}>
        Create Post
      </button>
      {/* <Button onClick={handleOpen}>Create Post</Button> */}
      <Modal open={open} onClose={handleClose}>
        <form className="shareForm" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="shareh1">Create Post</h1>
          <label className="shareLabel">Title</label>
          <input
            className="shareInput"
            {...register("title", { required: true })}
            inputref={titleRef}
          />
          <Error errors={errors.title} />

          <label className="shareLabel">Description</label>
          <input
            className="shareInput"
            {...register("desc", { required: true })}
            inputref={descRef}
          />
          <Error errors={errors.desc} />

          <label className="shareLabel">Schedule Name</label>
          <select
            id="schDropdown"
            className="shareInput"
            defaultValue={"DEFAULT"}
            {...register("scheduleName", { required: true })}
            selectref={scheduleNameRef}
          >
            <option value="DEFAULT" disabled>
              --Choose a schedule--
            </option>
            {list.map((schedule) => (
              <option key={schedule._id} value={schedule.scheduleName}>
                {schedule.scheduleName}
              </option>
            ))}
          </select>
          <Error errors={errors.scheduleName} />

          <input type="submit" className="shareSubmitButton" />
        </form>
      </Modal>
    </div>
  );
}
