import './Workshopcard.css';

function Workshopcard(props) {
  return (
    <div className='main'>
      <div className='imgcard'>
        <img src={props.image} alt={props.name} />
        <div className='title-workshopcard'> 
          <p>{props.name}</p> 
        </div>
      </div>
      <div className='description'>
        <div>{props.description}</div>
      </div>
    </div>
  );
}

export default Workshopcard;
