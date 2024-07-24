import eventLine from "../assets/EventSection/event-timeline.png";
import dayImage from "../assets/EventSection/day-image.png";
import timeLineElement from "../assets/EventSection/timeline_element.mp4"
function EventHeading({ heading, time, addSpace }) {
    const marginClass = addSpace ? 'mb-14' : '';

    return (
        <div
            className={`flex flex-col items-center gap-2 p-1 mt-10 mb-14 ${marginClass}`}
            style={{ marginLeft: '11em' }}
        >
            <h1 className="text-xl text-black font-bold font-balgin bg-[#F56E8F] rounded-lg">
                {heading}
            </h1>
            <h1 className="text-md font-semibold font-balgin text-white">
                {time}
            </h1>
        </div>
    );
}

const eventHeadingsandTime = [
    { heading: "HACKOTHON (ROUND-2)", time: "9AM - 4PM", day: 1, addSpace: false },
    { heading: "WORKSHOP 1", time: "4AM - 6PM", day: 1, addSpace: false },
    { heading: "HACKOTHON (ROUND-3)", time: "9PM - 12AM", day: 1, addSpace: true },
    { heading: "HACKOTHON (ROUND-3)", time: "1AM - 10AM", day: 2, addSpace: false },
    { heading: "SPEAKER SESSION-1", time: "10AM - 1PM", day: 2, addSpace: false },
    { heading: "HACKATHON (ROUND-4)", time: "2PM - 5PM", day: 2, addSpace: true },
    { heading: "WORKSHOP 2", time: "9AM - 11AM", day: 3, addSpace: false },
    { heading: "SPEAKER SESSION 2", time: "11AM - 1PM", day: 3, addSpace: false },
    { heading: "VALEDICTORY", time: "3AM - 6PM", day: 3, addSpace: false },
];

const DaySection = ({ day }) => (
    <div>
        {day === 2 ? (
            <video
                width="100%"
                loop
                muted
                playsInline
                autoPlay
                style={{ display: 'block', height: "30em", width: "30em" }}
            >
                <source src={timeLineElement} type="video/mp4" />
            </video>
        ) : (
            <div className="flex flex-col items-center">
                <h1 className="text-6xl font-light font-balgin text-center text-[#F56E8F]">
                    DAY {day === 5 ? '2' : day}
                </h1>
                <img src={dayImage} alt={`Day ${day}`} />
                <div className="flex flex-col items-center font-bold text-white">
                    <h1 className="text-xl font-balgin text-center">10th</h1>
                    <h1 className="text-xl font-balgin text-center">SEPTEMBER, 2024</h1>
                </div>
            </div>)}
    </div>
);



export default function EventTimeline() {
    return (
        <div className="bg-black p-4 w-full">
            <h1 className="text-4xl font-light font-balgin text-center text-[#F56E8F]">
                EVENT TIMELINE
            </h1>
            <div className="flex justify-around mt-5">
                <div className="flex flex-col gap-[14em]">
                    {[1, 2, 3].map(day => (
                        <DaySection key={day} day={day} />
                    ))}
                </div>
                <div className="flex flex-col justify-start relative">
                    <img src={eventLine} className="absolute inset-0" alt="Event Line" />
                    {eventHeadingsandTime.map((eventDetails, index) => (
                        <EventHeading
                            key={index}
                            heading={eventDetails.heading}
                            time={eventDetails.time}
                            addSpace={eventDetails.addSpace}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-[10em]">
                    {[2, 5, 2].map(day => (
                        <DaySection key={day} day={day} />
                    ))}
                </div>
            </div>
        </div>
    );
}
