import React from "react";
import { useParams } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/carousel.css';

export function Carousel() {
  //const { decada } = useParams()

    const settings = {
      arrows: false,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 10,
      autoplay: true,
      speed: 15000,
      autoplaySpeed: 0,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 10,
            infinite: true,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 10,
            infinite: true,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 10,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 10
          }
        }
      ]
    };
    // relacionado para qu carge la imagen corrspondiente con el useParams <store.{decada}.rock.cover> o realizarun map de un img y ponerle un rango al map de 0-10(length) y asi crearia 10 divs de img
    return (
      <div className="slider-container-decadas">
        <Slider {...settings} className="bg-genre d-flex">
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>
          </div>
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>
          </div>
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>  
          </div>
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>
          </div>
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>
          </div>
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>
          </div>
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>
          </div>
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>
          </div>
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>
          </div>
          <div className="img-genre">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" className="img-thumbnail rounded-3 p-1" style={{ height: '150px', width: '150px' }} alt="..."/>
          </div>
        </Slider>
      </div>
    );
  };