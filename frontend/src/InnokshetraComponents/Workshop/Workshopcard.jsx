import './Workshopcard.css'

function Workshopcard(props){

    return (
        <>
        <div className='main'>
            <div className='imgcard'>
                <img src={props.image} alt="no_image" />
                <div className='title-workshopcard'> <p> {props.name} </p> </div>
            </div>
            <div className='description'>
                <div>{props.description}</div>
            </div>
            <div>
                <img className='design' src="\src\assets\Copy of website-icell-1212121_20240723_160139_0000[1].png" alt="no_image" />
            </div>
        </div>
        </>
    )
}

export default Workshopcard