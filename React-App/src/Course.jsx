import { useState } from "react";
// import css from "./assets/css.png";
function Course(props) {

  // let purchased= false;
  const [purchased,setPurchased] = useState(false);
  const [discount, setdiscount]= useState(false);

  function BuyCourse() {
    console.log(props.name, "puchased price of", props.price);
    setPurchased(true)
    console.log(purchased)
  }
  function ApplyDiscount(Applydiscount) {
    setdiscount(true);
    console.log(
      props.price,
      "puchased with",
      Applydiscount,
      "%discount of",
      (props.price * 20) / 100,
      "final price",
      props.price - (props.price * 20) / 100,
    );
  }
  return (
    props.name && (
      <div className="card">
        <img src={props.image} />
        <h3>{props.name}</h3>
        {/* <p>{props.price}</p> */}
        <p> {discount ? (props.price-(props.price*20)/100): props.price} </p>
        <span>{props.rating}</span><br />
        <button onClick={BuyCourse} className="buynowbutton">
          Buy now
        </button>
        <br />
        <button onClick={() => ApplyDiscount(20)} className="buynowbutton">
          apply discount
        </button>
        <p>{purchased? "already purchased":"get it now"}</p>
        <button onClick={()=>props.delete(props.id)}> Delete</button>
      </div>

    )
  );
}
export default Course;
