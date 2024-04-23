import React from 'react' ; 
import './EventCard.css' ; 
import Heading from '../Heading';
const EventCard = () => {
    return (
        <div className="horizontal_slider">
            <p className='title_text'>where ideas meet action </p>
            <div className="heading_container">
            <hr />
            <Heading title="Our Events" />
            </div>
            <div className='slider_container bg-black'>
                <div className="card-container">
                    <div className="card-content">
                        <div className="card-front card1"></div>
                        <div className="card-back">
                            <div className="content flex justify-center ">
                                <h3>Fintellect</h3>
                                <p>Fintellect is a fun and engaging quiz to test the financial intellect of the participants. The topic revolves around the complex financial world of stock market, trading and investing. 
                                </p>
                                <button>View More</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-container">
                    <div className="card-content">
                        <div className="card-front card2"></div>
                        <div className="card-back">
                            <div className="content">
                                <h3>CaseOnPoint</h3>
                                <p>Case on Point is a case based competitions where participants wear the hats of a master problem solver and solves real world complex problems. 
                                </p>
                                <button>View More</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-container">
                    <div className="card-content">
                        <div className="card-front card3"></div>
                        <div className="card-back">
                            <div className="content">
                                
                                <h3>Bidbizz</h3>
                                <p>Bidbizz is a team bidding event wherein participants are required to guess the valuation of a company through the financial information given to them.  
                                </p>
                                <button>View More</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-container">
                    <div className="card-content">
                        <div className="card-front card4"></div>
                        <div className="card-back">
                            <div className="content">
                                
                                <h3>Market It!</h3>
                                <p>Market It is a case based marketing competition wherein participants wear hats of a master marketer and design logos, creative and marketing strategies for a real world brand.  
                                </p>
                                <button >View More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard ;  