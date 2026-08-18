import Course from "./Course";
import useFetch from "./useFetch";
// import html from "./assets/html.png";
// import reactLogo from "./assets/react.svg";

// import css from "./assets/css.png";
// import js from "./assets/js.png";
// import { useState, useEffect } from "react";
function CourseList() {
  const [courses, error] = useFetch("http://localhost:3000/courses");

  function handleDelete(id) {
    console.log(handleDelete);
    const newCourses = courses.filter((course) => course.id != id);
    setCourses(newCourses);
  }

  // courses.sort((x, y) => x.price - y.price);
  // const vfmcourses=courses.filter((course)=>course.price<200)

  if (!courses) {
    return (
      <>
        {!error && (
          <img className="errorgif" src="../data/assets/loading-spinner.gif" />
        )}
        {error && (
          <img className="errorgif" src="../data/assets/Error-404.gif" />
        )}
      </>
    );
  }
  const coursesList = courses.map((course, id) => (
    <Course
      id={course.id}
      key={course.id}
      name={course.name}
      price={course.price}
      image={course.image}
      rating={course.rating}
      delete={handleDelete}
    />
  ));

  return <>{coursesList}</>;
}
export default CourseList;
// npx json-server --watch data/dummydata.json --port 3000 --static ./data
