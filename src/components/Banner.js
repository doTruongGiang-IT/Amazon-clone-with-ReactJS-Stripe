import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className="relative">
            <div className="absolute bottom-0 z-10 bg-gradient-to-t from-white to-transparent w-full h-32"></div>
            <Carousel autoPlay infiniteLoop showIndicators={false} showStatus={false} showThumbs={false} interval={5000}>
                <div>
                    <img loading="lazy" src="https://links.papareact.com/gi1" alt="image1" />
                </div>
                <div>
                    <img loading="lazy" src="https://links.papareact.com/6ff" alt="image2" />
                </div>
                <div>
                    <img loading="lazy" src="https://links.papareact.com/7ma" alt="image3" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner;
