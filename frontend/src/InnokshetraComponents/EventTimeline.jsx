import eventLine from "../assets/EventSection/event-timeline.png";
import dayImage from "../assets/EventSection/day-image.png";
import timeLineElement from "../assets/EventSection/timeline_element.mp4";

function EventHeading({ heading, time, addSpace }) {
    const marginClass = addSpace ? 'mb-14' : '';

    return (
        <div className={`flex flex-col items-center gap-2 p-1 mt-10 mb-14 ${marginClass} lg:ml-44`}>
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
    { heading: "HACKATHON (ROUND-2)", time: "9AM - 4PM", day: 1, addSpace: false },
    { heading: "WORKSHOP 1", time: "4PM - 6PM", day: 1, addSpace: false },
    { heading: "HACKATHON (ROUND-3)", time: "9PM - 12AM", day: 1, addSpace: true },
    { heading: "HACKATHON (ROUND-3)", time: "1AM - 10AM", day: 2, addSpace: false },
    { heading: "SPEAKER SESSION-1", time: "10AM - 1PM", day: 2, addSpace: false },
    { heading: "HACKATHON (ROUND-4)", time: "2PM - 5PM", day: 2, addSpace: true },
    { heading: "WORKSHOP 2", time: "9AM - 11AM", day: 3, addSpace: false },
    { heading: "SPEAKER SESSION 2", time: "11AM - 1PM", day: 3, addSpace: false },
    { heading: "VALEDICTORY", time: "3PM - 6PM", day: 3, addSpace: false },
];

const DaySection = ({ day }) => (
    <div className="flex flex-col items-center mb-10">
        {day !== 2 ? (
            <div className="flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-light font-balgin text-center text-[#F56E8F]">
                    DAY {day}
                </h1>
                <img src={dayImage} alt={`Day ${day}`} className="w-full h-auto md:w-1/2" />
                <div className="flex flex-col items-center font-bold text-white">
                    <h1 className="text-xl font-balgin text-center">
                        {day === 1 ? '14' : day === 2 ? '15' : '16'} th
                    </h1>
                    <h1 className="text-xl font-balgin text-center">SEPTEMBER, 2024</h1>
                </div>
            </div>
        ) : (
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
        )}
    </div>
);

const MobileEventHeading = ({ heading, time }) => (
    <div className="flex flex-col items-start p-4 my-4 border-l-4 border-[#F56E8F] bg-white rounded-lg shadow-lg w-full">
        <h1 className="text-lg text-white font-bold bg-[#F56E8F] rounded-lg px-4 py-2 w-full text-center">
            {heading}
        </h1>
        <h1 className="text-md font-semibold text-gray-700 mt-2 px-4">
            {time}
        </h1>
    </div>
);

const MobileDaySection = ({ day }) => (
    <div className="flex flex-col items-center my-8">
        <h1 className="text-3xl font-bold text-center text-[#F56E8F]">
            DAY {day}
        </h1>
        <img src={dayImage} alt={`Day ${day}`} className="w-24 h-24 my-4" />
        <div className="flex flex-col items-center font-bold text-white">
            <h1 className="text-xl text-center">
                {day === 1 ? '14' : day === 2 ? '15' : '16'}<sup>th</sup>
            </h1>
            <h1 className="text-xl text-center">SEPTEMBER, 2024</h1>
        </div>
    </div>
);

export default function EventTimeline() {
    const days = [1, 2, 3];
    return (
        <div className="bg-black p-4 w-full" id="timeline">
            <h1 className="text-4xl font-light font-balgin text-center text-[#F56E8F]">
                EVENT TIMELINE
            </h1>
            <div className="lg:hidden flex flex-col mt-5 space-y-12">
                {days.map(day => (
                    <div key={day} className="space-y-6">
                        <MobileDaySection day={day} />
                        {eventHeadingsandTime
                            .filter(event => event.day === day)
                            .map((eventDetails, index) => (
                                <MobileEventHeading
                                    key={index}
                                    heading={eventDetails.heading}
                                    time={eventDetails.time}
                                />
                            ))}
                    </div>
                ))}
            </div>
            <div className="hidden lg:flex justify-around mt-5">
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
                    {[2,5,2].map((day) => (
                        <DaySection key={day} day={day} />
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}
