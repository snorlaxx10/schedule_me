import "./addSemester.css"
import * as React from 'react'
import {useForm} from "react-hook-form";
import Modal from '@mui/material/Modal'
import {useRef} from "react";
import {v4 as uuidv4} from "uuid"

export function Error({ errors }) {
  return <div className={"shareError"}>{errors ? "Required" : " "}</div>;
}

export default function AddSemester({setSchedule, semesterLimit, semesterLength}) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    if( semesterLength < semesterLimit ){
      setOpen(true);
    }
    else{
      alert("Semester limit reached");
    }
  }
  const handleClose = () => setOpen(false)
  const {register, handleSubmit, reset, formState: {errors}} = useForm();
  
  const semesterNameRef = useRef();

  const onSubmit = async (data) => {
     const newSemester = {
      semesterID: uuidv4(),
      semesterName: data.semesterName,
      courses: []
    }
    try {
      setSchedule( (prevSchedule) => {
        prevSchedule.semesters.push(newSemester)
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
      <button onClick={handleOpen} >Add Semester</button>
      <Modal open={open} onClose={handleClose}>
        <form className="shareForm" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="shareh1">Add Semester</h1>
          <label className="shareLabel">Semester Name</label>
          <input
            className="shareInput"
            {...register("semesterName", 
            { required: true })}
            inputref={semesterNameRef} />
          <Error errors={errors.semesterName} />
          <input type="submit" className="shareSubmitButton"/>
        </form>
      </Modal>
    </div>
  );
}
