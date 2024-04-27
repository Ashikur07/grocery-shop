import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css'
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {


    return (
        <div className='mb-10 w-[100%] lg:h-[600px]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 40000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <div className=''>
                        <div className='relative'>
                            <img className=' banner-img' src="https://i.ibb.co/0DwK0M1/photo-1611273651216-29b4f282d36b-q-80-w-1974-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
                        </div>
                        <div className='absolute top-[35%] left-[35%] lg:left-[45%] text-8xl text-white'>
                            text
                        </div>

                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='relative'>
                        <img className='banner-img' src="https://i.ibb.co/dkpKBNC/photo-1520250497591-112f2f40a3f4-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />

                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='relative'>
                        <img className='banner-img' src="https://i.ibb.co/pKYNbdG/photo-1584132967334-10e028bd69f7-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />

                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;