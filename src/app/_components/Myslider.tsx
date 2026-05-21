"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';

interface MysliderPropsType {
    listOfImages: any[],
    spaceBetween?: number,
    slidesPerView?: number
}

export default function Myslider({
    listOfImages,
    spaceBetween = 50,
    slidesPerView = 1
}: MysliderPropsType) {

    return (
        <div className="w-full h-72 mb-20 ">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                navigation

            >
                {listOfImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image.src}
                            className="w-full h-[300px] object-cover "
                            alt="slide"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}