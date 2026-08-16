import css from './assets/css.png'
function Course(props) {
  function BuyCourse(discount,e){
    console.log(props.name,"puchased with", discount,"%discount");
    console.log(e)
  }
    return(
            props.name && <div className="card">
                <img src={props.image} />
                <h3>{props.name}</h3>
                <p>{props.price}</p>
                <span>{props.rating}</span>
                <button onClick={(event)=>BuyCourse(20,event)} className="buynowbutton">Buy now</button>
            </div>
            );
}
export default Course;