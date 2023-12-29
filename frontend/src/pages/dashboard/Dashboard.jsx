import "./dashboard.css";
import Topbar from "../../components/topbar/Topbar";
import CreateSchedule from "../../components/createSchedule/CreateSchedule";
import DashboardItem from "../../components/dashboardItem/DashboardItem";

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const [schedules, setSchedules] = useState([]);
  const { user } = useContext(AuthContext);

  //runs twice due to strict mode
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const res = await axios.get("/schedules/" + user._id, {
          timeout: 10000,
        });
        return res.data;
      } catch (err) {
        return err;
      }
    };
    getSchedules()
      .then((result) => {
        setSchedules(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <>
      <Topbar></Topbar>
      <div className="dashboardContainer">
        {/*
                <div className = "dashboardControl">
                </div>

                */}
        <h1>My Schedules</h1>
        <div className="scheduleContainer">
          {schedules.length > 0 ? (
            schedules.map((s) => {
              return (
                <DashboardItem
                  key={s._id}
                  setSchedules={setSchedules}
                  schedule={s}
                ></DashboardItem>
              );
            })
          ) : (
            <div>Create a Schedule</div>
          )}
          <div className="createScheduleButton">
            <CreateSchedule setSchedules={setSchedules} />
          </div>
        </div>
      </div>
    </>
  );
}
