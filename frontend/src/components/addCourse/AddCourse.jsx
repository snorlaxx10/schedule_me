import "./addCourse.css"
import * as React from 'react'
import {useForm} from "react-hook-form";
import Modal from '@mui/material/Modal'
import {useRef} from "react";
import {v4 as uuidv4} from "uuid"

export function Error({ errors }) {
  return <div className={"shareError"}>{errors ? "Required" : " "}</div>;
}

export default function AddCourse({semesterID, setSchedule, courseLength, courseLimit}) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    if(courseLength < courseLimit){
      setOpen(true)
    }
    else{
      alert("Course limit reached")
    }
  }
  const handleClose = () => setOpen(false)
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  
  const courseNameRef = useRef();
  const courseUnitsRef = useRef();


  const onSubmit = async (data) => {
     const newCourse = {
      courseID: uuidv4(),
      courseName: data.courseName,
      courseUnits: data.courseUnits,
      semesterID: semesterID
    }
    try {
      setSchedule( (prevSchedule) => {
        prevSchedule.semesters.find( s => s.semesterID === semesterID).courses.push(newCourse)
        return {
            ...prevSchedule
        }
      })
      reset()
      setOpen(false)
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className = "course-plus-button" onClick={handleOpen} >+</div>
      <Modal open={open} onClose={handleClose}>
        <form className="shareForm" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="shareh1">Add Course</h1>
          <label className="shareLabel">Course Name</label>
          <input
            className="shareInput"
            {...register("courseName", 
            { required: true })}
            inputref={courseNameRef} />
          <Error errors={errors.courseName} />
          <label className="shareLabel">Course Units</label>
          <input
            className="shareInput"
            type = "number"
            {...register("courseUnits", 
            { required: true,
              valueAsNumber: true, 
              max: 5,
              min: 1})}
            inputref={courseUnitsRef} />
          <Error errors={errors.courseUnits} />
          <input type="submit" className="shareSubmitButton"/>
        </form>
      </Modal>
    </div>
  );
}
