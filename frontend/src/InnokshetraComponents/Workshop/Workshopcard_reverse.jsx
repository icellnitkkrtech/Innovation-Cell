import './Workshopcard.css'

function Workshopcard_reverse(props){

    return (
        <div className='main_reverse'>
            <div className='imgcard'>
                <div className='title-workshopcard'> <p> {props.name} </p> </div>
            </div>
            <div className='description_reverse' >
                {props.description}
            </div>
        </div>
    )
}

export default Workshopcard_reverse