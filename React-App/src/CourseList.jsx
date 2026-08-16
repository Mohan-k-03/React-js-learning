import Course from "./Course";
import html from "./assets/html.png";
import reactLogo from "./assets/react.svg";

import css from "./assets/css.png";
import js from "./assets/js.png";
import {useState, useEffect} from 'react';
function CourseList() {
  const [courses, setCouses] = useState([
    { id: 1, name: "HTml ", price: 99, image: html, rating: 4.5 },
    { id: 2, name: "css ", price: 999, image: css, rating: 4.5 },
    { id: 3, name: "js ", price: 999, image: js, rating: 4.5 },
    { id: 4, name: "react", price: 123, image: reactLogo, rating: 5 },
    { id: 5, name: "Python", price: 3432, image: css, rating: 4 },
  ]);
  useEffect(()=>{
    console.log('use effect called');
    console.log('use effect called')
  },[]);

  function handleDelete(id){
    console.log(handleDelete)
    const newCourses=courses.filter((course)=>course.id != id)
    setCouses(newCourses);
  };

  courses.sort((x, y) => x.price - y.price);
  // const vfmcourses=courses.filter((course)=>course.price<200)
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
