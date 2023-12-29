import "./course.css";
import {useDrag} from "react-dnd";

export default function Course({semesterID, course, setSchedule}){
    
    const [{isDragging}, drag] = useDrag(()=> ({
        type: "course",
        item: course,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    function deleteCourse(){
        setSchedule( (prevSchedule) => {
            let sIndex = prevSchedule.semesters.findIndex( s => s.semesterID === semesterID )
            prevSchedule.semesters[sIndex].courses = prevSchedule.semesters[sIndex].courses.filter( c => c.courseID !== course.courseID );
            return {
                ...prevSchedule
            }
        })
    }

    return(
        <div ref ={drag} className = "editCourse"> 
            <div onClick = {deleteCourse} className = "courseDeleteButton">x</div>
            <span className = "courseName">{course.courseName} </span>
            <span className = "courseUnits">{ "Units: " + course.courseUnits}</span>
        </div>
    )
}

