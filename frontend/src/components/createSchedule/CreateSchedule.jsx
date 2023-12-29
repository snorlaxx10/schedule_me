import "./createSchedule.css";
import * as React from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export function Error({ errors }) {
  return <div className={"shareError"}>{errors ? "Required" : " "}</div>;
}

export default function CreateSchedule({ setSchedules }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const majorRef = useRef();
  const scheduleNameRef = useRef();

  const onSubmit = async (data) => {
    const newSchedule = {
      userId: user._id,
      scheduleName: data.scheduleName,
      major: data.major,
      semesters: [],
    };

    try {
      const resultSchedule = await axios.post("/schedules", newSchedule);
      setSchedules((prev) => [...prev, resultSchedule.data]);
      alert("Schedule Created");
      reset();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div onClick={handleOpen} className="plus-button">
        +
      </div>
      <Modal open={open} onClose={handleClose}>
        <form className="shareForm" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="shareh1">Create a Schedule</h1>
          <label className="shareLabel">Schedule Name</label>
          <input
            className="shareInput"
            {...register("scheduleName", { required: true })}
            inputref={scheduleNameRef}
          />
          <Error errors={errors.scheduleName} />
          <label className="shareLabel">Major</label>
          <input
            className="shareInput"
            {...register("major", { required: true })}
            inputref={majorRef}
          />
          <Error errors={errors.major} />
          <input type="submit" className="shareSubmitButton" />
        </form>
      </Modal>
    </div>
  );
}
