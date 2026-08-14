import css from './assets/css.png'

export const course1="HTML";
function Course({ name="Mohan react ",price= "1999",image=css,rating="4.5"}) {

  
    return(
        <div className="card">
            <img src={image} />
            <h3>{name}</h3>
            <p>{price}</p>
            <p>{rating}</p>
        </div>
    );
}
// Course.defaultProps={
   
// }
export default Course;