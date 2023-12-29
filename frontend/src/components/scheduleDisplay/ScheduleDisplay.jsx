import "./scheduleDisplay.css";

export default function Schedule({ schedule }) {
  let semesterUnitsArray = [0];
  let totalUnitsArray = [0];

  return (
    <>
      {schedule ? (
        <div className="editScheduleContainer">
          <h1>{schedule.scheduleName}</h1>
          <h2>{"Major: " + schedule.major}</h2>
          <h4>{"Last updated: " + schedule.updatedAt} </h4>

          <div className="editSemesterContainer">
            {schedule.semesters.map((s) => {
              semesterUnitsArray = [0];
              return (
                <div key={s.semesterID} className="editSemester">
                  <h2 className="editSemesterName"> {s.semesterName}</h2>

                  {s.courses.map((c) => {
                    semesterUnitsArray.push(parseInt(c.courseUnits));
                    totalUnitsArray.push(parseInt(c.courseUnits));
                    return (
                      <div key={c.courseID} className="editCourse">
                        <span className="courseName">{c.courseName} </span>
                        <span className="courseUnits">
                          {"Units: " + c.courseUnits}
                        </span>
                      </div>
                    );
                  })}

                  <h3>
                    {semesterUnitsArray.reduce((x, y) => x + y) + " units"}
                  </h3>
                </div>
              );
            })}
          </div>

          <h2 className="totalUnits">
            {"Total units: " +
              totalUnitsArray.reduce((x, y) => x + y) +
              " units"}
          </h2>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
