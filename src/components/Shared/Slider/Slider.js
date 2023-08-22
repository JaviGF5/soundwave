import React from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import styles from './Slider.module.css';
import { playerIcon } from '../../../assets';
import { leftArrow, rightArrow } from '../../../assets';
import { usePlayer } from '../../../hooks';

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
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 4,
          slideShadows : false,
        }} 

        // loop={ true }
        // loopedSlides={2}

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
                to={ basePath !== 'blockRoute' ? `/${basePath }/${ item.id }` : null } 
                className={ styles.item } 
              > 
                <div className={ styles.image } style={ {backgroundImage: `url(${ item.image })`} } />
                <img 
                  src={ playerIcon } 
                  alt="Reproducir Música" 
                  className={ styles.playerIcon } 
                  onClick={ () => startPlay(item, item.image) }
                />   
                
              </Link>

              <h3 className={ styles.name }> { item.name } </h3> 

            </SwiperSlide>
          )
        })}

      </Swiper>       
   
      <button className={ styles.buttonLeft }>
        <img 
          src={ leftArrow } 
          alt="Ir a la izquierda" 
          className={ `arrow-left-slider ${ styles.icon }`} 
        />
      </button>
 
      <button className={ styles.buttonRight }>
        <img 
          src={ rightArrow } 
          alt="Ir a la derecha" 
          className={ `arrow-right-slider ${ styles.icon }` }
        />
      </button>  

    </>
  );
}



