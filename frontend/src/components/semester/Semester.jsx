import "./semester.css";
import Course from "../course/Course"

import AddCourse from "../addCourse/AddCourse";
import { useEffect,useState } from "react";

import {useDrop} from "react-dnd";

export default function Semester({schedule, semester, setSchedule}){
    const [courses, setCourses] = useState(semester.courses);
    
    //drag and drop hoook
    const [{isOver}, drop] = useDrop(() => ({
        accept: "course",
        drop: (item) => addCourseToSemester(item),
        canDrop: () => semester.courses.length < courseLimit
    }))

    function deleteSemester(){
        setSchedule( (prevSchedule) => {
            let filteredSemesters = prevSchedule.semesters.filter( (s) => { return s.semesterID !== semester.semesterID });
            return {
                ...prevSchedule,
                semesters: filteredSemesters
            }
        })
    }

    //this function was added for drag and drop, is messy
    function addCourseToSemester(course){
        console.log(semester.semesterName)
        setSchedule( (prevSchedule) => {
            //delete course
            let sIndex = prevSchedule.semesters.findIndex( s => s.semesterID === course.semesterID )
            prevSchedule.semesters[sIndex].courses = prevSchedule.semesters[sIndex].courses.filter( c => c.courseID !== course.courseID );

            //add course, chnage the schedule id of course before adding it
            course.semesterID = semester.semesterID;
            prevSchedule.semesters.find( s => s.semesterID === semester.semesterID).courses.push(course)
            return {
                ...prevSchedule
            }
        })
    }
    
    //adding use effect for drag and drop
    useEffect( ()=>{
        setCourses(semester.courses)
    }, [schedule])

    const courseLimit = 6;
    return(
        <div className = "editSemester" ref = {drop}>
            <div onClick = {deleteSemester} className = "semesterDeleteButton">x</div>
            <h2 className = "editSemesterName"> {semester.semesterName}</h2> 
            {semester.courses.map( (c) => {
                return (
                    <Course key = {c.courseID} semesterID = {semester.semesterID} course = {c} setSchedule = {setSchedule}/>
                )
            })}
            <AddCourse courseLimit = {courseLimit} courseLength = {semester.courses.length} semesterID = {semester.semesterID} setSchedule = {setSchedule}/>
        </div>
    )
}