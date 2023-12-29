import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useContext, useRef } from "react";

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //related to error handling page
  const { register, handleSubmit } = useForm();
  const { user, dispatch } = useContext(AuthContext);
  const urlDir = "/users/" + user._id;

  const bioRef = useRef();
  const [bio, setBio] = React.useState(user.bioDescription);

  const handleChangeBio = (event) => {
    console.log(event.currentTarget.value);
    setBio(event.currentTarget.value);
  };

  const onConfirm = async (data) => {
    const json = JSON.stringify(data, null, 2);
    const obj = JSON.parse(json);
    const newBio = {
      userId: user._id,
      bioDescription: obj.updateBio,
    };
    try {
      if (await axios.put(urlDir, newBio)) {
        alert("success!");
      }
      dispatch({
        //everything in the curly brace is a single object and 1 argument
        type: "UPDATE_BIO",
        payload: newBio.bioDescription,
      });
      handleClose();
    } catch (err) {}
  };

  return (
    <>
      <Topbar />

      <div className="profilePage">
        <div className="profileContentBox">
          <img className="profileImg" src="assets/default_pfp.jpeg" alt="" />
          <h4 className="profileName">{user.name}</h4>

          <div className="bioInfoBox" id="bio" disabled="disabled">
            {bio}
          </div>

          <Button onClick={handleOpen}>Edit Bio</Button>
          <Modal open={open} onClose={handleClose}>
            <form className="bioForm" onSubmit={handleSubmit(onConfirm)}>
              <h1 className="bioh1">Bio Edit</h1>
              <input
                className="inputBio"
                {...register("updateBio", { required: true })}
                onChange={handleChangeBio}
                inputRef={bioRef}
              />
              <input type="submit" className="confirmButton" />
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}
