import "./dashboardItem.css";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import ScheduleDisplay from "../../components/scheduleDisplay/ScheduleDisplay";
import { useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../context/AuthContext";

export default function DashboardItem({ schedule, setSchedules }) {
  const navigate = useNavigate();

  function editOnClick() {
    navigate("/scheduleedit/" + schedule._id);
  }

  // Used to display schedule data.
  const [renderSchedule, setRender] = useState();

  // Schedule useSate.
  const [scheduleObj, setSchedule] = React.useState(false);
  const openSchedule = async () => {
    setSchedule(true);
    await axios
      .get("/schedules/scheduledata/" + schedule._id)
      .then((result) => {
        setRender(result.data[0]);
        // .data[0] removes square brackets
      });
  };
  const closeSchedule = () => setSchedule(false);

  // Delete schedule modal dialog.
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);

  const deleteSchedule = async () => {
    try {
      await axios.delete("/schedules/scheduledata/" + schedule._id);
      const res = await axios.get("/schedules/" + user._id, {
        timeout: 10000,
      });
      setSchedules(res.data);
      handleClose();
    } catch (err) {}
  };

  return (
    <>
      <div className="dashboardItemContainer">
        <div className="dashboardItemDeleteButton" onClick={handleOpen}>
          x
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Delete Schedule?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to want to delete this schedule?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteSchedule} autoFocus>
              Yes
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <span>{schedule.scheduleName}</span>

        <div>
          <button onClick={openSchedule}>View Schedule</button>
          <Modal open={scheduleObj} onClose={closeSchedule}>
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
          </Modal>
        </div>

        <button onClick={editOnClick}>Edit Schedule</button>
      </div>
    </>
  );
}
