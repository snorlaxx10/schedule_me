import "./scheduleEdit.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Semester from "../../components/semester/Semester";
import AddSemester from "../../components/addSemester/AddSemester";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";

export default function ScheduleEdit() {
  const [schedule, setSchedule] = useState();
  const params = useParams();
  const navigate = useNavigate();

  async function fetchSchedule() {
    try {
      const res = await axios.get("/schedules/scheduledata/" + params.id, {
        timeout: 10000,
      });
      return res.data[0];
    } catch (err) {
      console.log(err);
    }
  }

  async function updateSchedule() {
    try {
      await axios.put("/schedules/scheduledata/", schedule, { timeout: 10000 });
      alert("Changes Saved");
    } catch (err) {
      console.log(err);
    }
  }

  function goBacktoDashboard() {
    navigate("/dashboard");
  }

  useEffect(() => {
    fetchSchedule()
      .then((result) => {
        setSchedule(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const semesterLimit = 8;

  return !schedule ? (
    " "
  ) : (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="editScheduleContainer">
          <h1>{schedule.scheduleName}</h1>
          <h2>{"Major: " + schedule.major}</h2>
          <h4>{"Last updated: " + schedule.updatedAt} </h4>
          <div className="editToolContainer">
            <AddSemester
              semesterLimit={semesterLimit}
              semesterLength={schedule.semesters.length}
              setSchedule={setSchedule}
            />
            <button onClick={updateSchedule}>Save</button>
            <button onClick={goBacktoDashboard}>Go back to dashboard</button>
          </div>
          <div className="editSemesterContainer">
            {schedule.semesters.map((s) => {
              return (
                <Semester
                  key={s.semesterID}
                  schedule={schedule}
                  semester={s}
                  setSchedule={setSchedule}
                />
              );
            })}
          </div>
        </div>
      </DndProvider>
    </>
  );
}
