import Course from "./Course";
// import html from "./assets/html.png";
// import reactLogo from "./assets/react.svg";

// import css from "./assets/css.png";
// import js from "./assets/js.png";
import { useState, useEffect } from "react";
function CourseList() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:3000/coursess")
        .then((response) => {
          if (!response.ok) {
            throw Error("couldn't retrive data");
          }
          console.log(response);
          return response.json();
        })
        .then(setCourses)
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
        });
    },1000);
  }, []);

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
      {!error && <p>loading...</p>}
        {error &&<img className="errorgif" src="../data/assets/Error-404.gif"></img>}
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
