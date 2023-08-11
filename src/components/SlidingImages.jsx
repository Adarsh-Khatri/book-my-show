import React from 'react'

function SlidingImages() {

  const FIRST_IMG = "https://i.ibb.co/ZGsJ3dh/jio-mami-21st-mumbai-film-festival-with-star-2019-02-09-2019-10-58-45-992.png";
  const SECOND_IMG = "https://i.ibb.co/wRr7W1P/hustlers-01-10-2019-05-09-55-486.png";
  const THIRD_IMG = "https://i.ibb.co/qFWPRpF/laal-kaptaan-16-10-2019-12-48-06-721.jpg";

  return (
    <div className="container">
      <div className="row mt-3 justify-content-center">
        <div id="carouselExampleIndicators" className="carousel slide slider-grand-container">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner slider-container">
            <div className="carousel-item slider-img-container active ">
              <img src={FIRST_IMG} className="slider-img" alt="First corousel" />
            </div>
            <div className="carousel-item slider-img-container ">
              <img src={SECOND_IMG} className="slider-img" alt="Second corousel" />
            </div>
            <div className="carousel-item slider-img-container ">
              <img src={THIRD_IMG} className="slider-img" alt="Third corousel" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon fw-bold" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon fw-bold" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SlidingImages