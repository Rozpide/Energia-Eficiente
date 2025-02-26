import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Slider from "react-slick";

export const Login = () => {
  const { store, actions } = useContext(Context);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,      // Aumentado de 1000 a 3000 para suavizar
    autoplaySpeed: 1000,  // Cambiado de 1000 a 0 para eliminar pausas
    cssEase: "linear",
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    pauseOnHover: false,
    centerMode: true,   // Añadido para evitar esperas
    //waitForAnimate: false //me hace un efecto raro de caida* 
  };

  const Carousel = ({ speed = 3000 }) => (
    <div className="row slider-container" style={{ overflow: "hidden" }}>
      <Slider {...{ ...settings, speed }}>
        <div className="py-2">
          <img src="https://wallpapers.com/images/hd/retro-sunset-qp7s0kw6e7ckwimn.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCEcfJmITBdHQQgMq-m7jMy0JPTNh_3CxcoTXwuH8gknUMfEi0gyNmoYD2-i8uLwvAmjOPJrMKDsBVqq7TGkkAJrvobhXsfV81rPDxLF3QScBdDMlRRYh9-6n2J8F8aaXh3tGn5Jsav0ed3GAOA6kKOzElmAKcrZpmBFy2tO0JkmVHkep131f90keUzw/w1600/4-k-pc-wallpaper-asian-street-retro-futuristic-style.webp" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://img.freepik.com/vector-gratis/fondo-onda-retro-abstracto_36662-1288.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAiX16qbLMm4keLLrT_an-X_L-R5T8te9JRCZvO3BWiC-JQicKSbvs6ow0wcDnB7qt9GM&usqp=CAU" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://c.stocksy.com/a/iMUL00/z9/5121616.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlMXZDO70saA0aHT6rAjrtA4AvDf8jKsyVkA&s" alt="image" className="slider-image" />
        </div>
      </Slider>
    </div>
  );


  return (
    <div className="container py-3">
          <div className="row">
            <div className="col-md-6 col-sm-8">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title2 text-center mt-2 mb-5">Iniciar Sesión</h3>
                  <form>
                    <div className="label mb-5">
                      <label htmlFor="inputEmail3" className="form-label">Email</label>
                      <input type="email" className="form-control" id="inputEmail3" required />
                    </div>
                    <div className="label mb-5">
                      <label htmlFor="inputPassword3" className="form-label">Contraseña</label>
                      <input type="password" className="form-control" id="inputPassword3" required />
                    </div>
                    <button type="submit" className="btn btn-danger mt-5 mb-5 w-100">
                      Inciar Sesión
                    </button>
                    <h6 className="registrarse text-white text-center"> ¿No tienes una cuenta? Registrate</h6>
                  </form>
                </div>
              </div>
            </div>
            <div className="registro col-md-6 col-sm-4">
              <div className="row">
                <div className="col-md-4 ">
                  <Carousel speed={3000} />
                </div>
                <div className="col-md-4">
                  <Carousel speed={4000} />
                </div>
                <div className="col-md-4">
                  <Carousel speed={5000} />
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Login;