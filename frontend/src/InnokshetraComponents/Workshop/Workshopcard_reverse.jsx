import './Workshopcard.css'

function Workshopcard_reverse(props){

    return (
        <>
        <div className='main_reverse'>
            <div className='imgcard'>
                <img src={props.image} alt="no_image" />
                <div className='title-workshopcard'> <p> {props.name} </p> </div>
            </div>
            <div className='description_reverse' >
                {props.description}
            </div>
            <div>
                <img className='design' src="\src\assets\Copy of website-icell-1212121_20240723_160139_0000[1].png" alt="no_image" />
            </div>
        </div>
        </>
    )
}

export default Workshopcard_reverse