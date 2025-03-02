import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/registro.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

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
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/the-dark-side-of-the-moon.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://www.efeeme.com/wp-content/uploads/2016/08/velvet-underground-03-08-16-k.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/animals-pink-floyd.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/led-zeppelin-led-zeppelin.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/abbey-road-the-beatles.jpg" alt="image" className="slider-image" />
        </div>        
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/aladin-sane-david-bowie.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/atom-heart-mother-pink-floyd.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/nevermind-nirvana.jpg" alt="image" className="slider-image" />
        </div>
        <div className="py-2">
          <img src="https://revistafervordebahiablanca.wordpress.com/wp-content/uploads/2015/09/ziggy-stardust-david-bowie.jpg" alt="image" className="slider-image" />
        </div>
      </Slider>
    </div>
  );

  return (
    <div className="container py-3">
          <div className="row">
            <div className="col-md-6 col-sm-8">
              <div className="cardshadow card">
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
                    <button type="submit" className="btn btn-danger mt-3 mb-5 w-100">
                      Inciar Sesión
                    </button>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                    <h6 className="registrarse text-white text-center"> ¿No tienes una cuenta? Registrate</h6>
                    </Link>
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