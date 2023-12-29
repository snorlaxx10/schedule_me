import "./fakePage.css";
import Topbar from "../../components/topbar/Topbar";
import ScheduleDisplay from "../../components/scheduleDisplay/ScheduleDisplay";
import { useEffect } from "react";
import { getPosts } from "../../apiCalls.js";

//Serves as a placeholder for real pages
export default function FakePage() {
  useEffect(() => {
    getPosts()
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const schedule = {
    _id: "6359dc5fa0e78b0f48b03fb2",
    userId: "633ca6b7f3989b317e1b4fdc",
    scheduleName: "testupdate",
    major: "Computer Science",
    semesters: [
      {
        semesterID: "18b29bf1-0d3b-473f-a632-e21c2f31dd3e",
        semesterName: "easy semester",
        courses: [
          {
            courseID: "ca1a229a-409f-4e6f-b875-bae1da88017d",
            courseName: "CECS 343",
            courseUnits: "3",
            semesterID: "18b29bf1-0d3b-473f-a632-e21c2f31dd3e",
          },
          {
            courseID: "67844d9d-05ce-4235-8f85-a9498d006527",
            courseName: "CECS 225",
            courseUnits: "3",
            semesterID: "18b29bf1-0d3b-473f-a632-e21c2f31dd3e",
          },
          {
            courseID: "e9373491-f2ab-4522-9ca8-7e4c221522ae",
            courseName: "CECS 328",
            courseUnits: "3",
            semesterID: "18b29bf1-0d3b-473f-a632-e21c2f31dd3e",
          },
        ],
      },
      {
        semesterID: "aa5fbfe0-fcc6-43bc-9e16-c15f6e0aba47",
        semesterName: "ok semester",
        courses: [
          {
            courseID: "2e79f1d2-b7ee-491d-9c96-3e4d28e7aea8",
            courseName: "CECS 326",
            courseUnits: "3",
            semesterID: "aa5fbfe0-fcc6-43bc-9e16-c15f6e0aba47",
          },
          {
            courseID: "d97f941e-c93e-4f6a-bbda-7f063f84246f",
            courseName: "CECS 491",
            courseUnits: "a",
            semesterID: "aa5fbfe0-fcc6-43bc-9e16-c15f6e0aba47",
          },
        ],
      },
      {
        semesterID: "ee4c0929-a4bf-4a1a-8316-c43a74a6cf1c",
        semesterName: "pain semester",
        courses: [
          {
            courseID: "c59101f7-9625-4aa5-824a-aa2732fd9c66",
            courseName: "CECS 228",
            courseUnits: "3",
            semesterID: "ee4c0929-a4bf-4a1a-8316-c43a74a6cf1c",
          },
        ],
      },
    ],
    createdAt: "2022-10-27T01:18:23.483Z",
    updatedAt: "2022-10-27T23:59:13.202Z",
    __v: 0,
  };

  return (
    <>
      <Topbar />
      <div className="fakePageContainer">
        This is a placeholder page.
        <ScheduleDisplay schedule={schedule} />
      </div>
    </>
  );
}
