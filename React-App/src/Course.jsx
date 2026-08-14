import html from './assets/css.png'

export const course1="html"

function Course(Props){

  
    return(
        <div className="card">
            <img src={props.image} />
            <h3>{props.name}</h3>
            <p>{props.price}</p>
        </div>
    );
}
Course.defaultProps={
    name:"Mohan react ",
    price: "1999",
    image:css
}
export default Course;