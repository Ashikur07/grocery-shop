import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css'
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {


    return (
        <div className='w-[100%] lg:h-[620px]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
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
                    <div className='relative'>
                        <img className='banner-img' src="https://i.ibb.co/KNtDvjZ/photo-1472791108553-c9405341e398-q-80-w-1874-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
                    </div>
                    <div className='space-y-4 absolute top-[30%] left-[12%] lg:left-[19%]  text-white'>
                        <h1 className='text-4xl lg:text-6xl font-semibold'>Choose Our <span className='text-yellow-300'>Painting and Drawing</span></h1>
                        <p className='pb-5 text-xl'>Choosing prints and drawings demands keen eye for style, subject, and aesthetic appeal, <br /> enriching our spaces with beauty.</p>
                        <button className='btn btn-primary'>Explore Now</button>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className=' '>
                        <div className='relative'>
                            <img className=' banner-img' src="https://i.ibb.co/8068rNG/photo-1511497584788-876760111969-q-80-w-1932-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
                        </div>
                        <div className='space-y-4 absolute top-[30%] left-[12%] lg:left-[19%]  text-white'>
                            <h1 className='text-4xl lg:text-6xl font-semibold'>Choose Our <span className='text-yellow-300'>Painting and Drawing</span></h1>
                            <p className='pb-5 text-xl'>Choosing prints and drawings demands keen eye for style, subject, and aesthetic appeal, <br /> enriching our spaces with beauty.</p>
                            <button className='btn btn-primary'>Explore Now</button>
                        </div>

                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='relative'>
                        <img className='banner-img' src="https://images.unsplash.com/photo-1480241352829-e1573ff2414e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className='space-y-4 absolute top-[30%] left-[12%] lg:left-[19%]  text-white'>
                        <h1 className='text-4xl lg:text-6xl font-semibold'>Choose Our <span className='text-yellow-300'>Painting and Drawing</span></h1>
                        <p className='pb-5 text-xl'>Choosing prints and drawings demands keen eye for style, subject, and aesthetic appeal, <br /> enriching our spaces with beauty.</p>
                        <button className='btn btn-primary'>Explore Now</button>
                    </div>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Banner;