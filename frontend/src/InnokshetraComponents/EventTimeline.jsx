import eventLine from "../assets/EventSection/event-timeline.png";
import dayImage from "../assets/EventSection/day-image.png";

function EventHeading({ heading, time, addSpace }) {
    const marginClass = addSpace ? 'mb-14' : '';

    return (
        <div
            className={`flex flex-col items-center gap-2 p-1 mt-10 mb-14 ${marginClass}`}
            style={{ marginLeft: '10em' }}
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
    { heading: "HACKOTHON (ROUND-2)", time: "9AM - 4PM", day: 1, addSpace: false },
    { heading: "HACKOTHON (ROUND-2)", time: "9AM - 4PM", day: 1, addSpace: true },
    { heading: "HACKOTHON (ROUND-2)", time: "9AM - 4PM", day: 2, addSpace: false },
    { heading: "HACKOTHON (ROUND-2)", time: "9AM - 4PM", day: 2, addSpace: false },
    { heading: "HACKOTHON (ROUND-2)", time: "9AM - 4PM", day: 2, addSpace: true },
    { heading: "HACKOTHON (ROUND-2)", time: "9AM - 4PM", day: 3, addSpace: false },
    { heading: "HACKOTHON (ROUND-2)", time: "9AM - 4PM", day: 3, addSpace: false },
    { heading: "HACKOTHON (ROUND-2)", time: "9AM - 4PM", day: 3, addSpace: false },
];

const DaySection = ({ day }) => (
    <div className="flex flex-col items-center">
        <h1 className="text-6xl font-light font-balgin text-center text-[#F56E8F]">
            DAY {day}
        </h1>
        <img src={dayImage} alt={`Day ${day}`} />
        <div className="flex flex-col items-center font-bold text-white">
            <h1 className="text-xl font-balgin text-center">10th</h1>
            <h1 className="text-xl font-balgin text-center">SEPTEMBER, 2024</h1>
        </div>
    </div>
);

export default function EventTimeline() {
    return (
        <div className="bg-black p-4 w-full">
            <h1 className="text-4xl font-light font-balgin text-center text-[#F56E8F]">
                EVENT TIMELINE
            </h1>
            <div className="flex justify-around mt-5">
                <div className="flex flex-col gap-[20em]">
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
                <div className="flex flex-col gap-[20em]">
                    {[1, 2, 3].map(day => (
                        <DaySection key={day} day={day} />
                    ))}
                </div>
            </div>
        </div>
    );
}
