import React from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { usePlayer } from '../../../hooks';
import styles from './Slider.module.css';
import { playerIcon, leftArrow, rightArrow } from '../../../assets';

// Library Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import 'swiper/css/effect-coverflow';
import "swiper/css/pagination";
import "swiper/css/navigation";


export function Slider(props) {

  const { data, basePath } = props;

  const { startPlay } = usePlayer();


  return (
    <>
      <Swiper
        modules={ [EffectCoverflow, Pagination, Navigation, Autoplay] } 
        slidesPerView={'auto'}
        spaceBetween={10}
        grabCursor={ true }
        centeredSlides={ true }
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows : false,
        }} 
        pagination={{ 
          clickable: true 
        }}
        navigation={{
          nextEl: ".arrow-right-slider", 
          prevEl: ".arrow-left-slider",
          clickable: true,
        }}
        style={{
          "--swiper-pagination-color": "var(--basic-three)",
          "--swiper-pagination-bullet-inactive-color": "var(--basic-three)",
          "--swiper-pagination-bullet-inactive-opacity": "0.3",
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-pagination-bullet-horizontal-gap": "2px",
          "--swiper-pagination-bullet-padding": "30px",
          "--swiper-pagination-bullet-height": "4px",
          "--swiper-pagination-bullet-width": "20px",
          "--swiper-pagination-bullet-border-radius": "0px",    
        }}
        autoplay={{
          delay: 3000,
        }}
      >
        
        {map(data, (item) => {
          return (                 
            <SwiperSlide key={ item.id } className={ styles.slide }>
              
              <Link 
                to={ basePath !== 'blockRoute' ? `/${ basePath }/${ item.id }` : null } 
                className={ styles.item } 
              > 
                <div className={ styles.image } style={{ backgroundImage: `url(${ item.image })` }} />
                <img 
                  className={ styles.playerIcon } 
                  src={ playerIcon } 
                  alt="Reproducir Música" 
                  onClick={ () => startPlay(item, item.image) }
                />   
                
              </Link>

              <h3 className={ styles.name }> { item.name } </h3> 

            </SwiperSlide>
          )
        })}

      </Swiper>       
   
      <button className={ styles.navigation }>
        <img 
          className={ `arrow-left-slider ${ styles.icon }` } 
          src={ leftArrow } 
          alt="Ir a la izquierda" 
        />
      </button>
 
      <button className={ styles.navigation }>
        <img 
          className={ `arrow-right-slider ${ styles.icon }` }
          src={ rightArrow } 
          alt="Ir a la derecha" 
        />
      </button> 

    </>
  );
}