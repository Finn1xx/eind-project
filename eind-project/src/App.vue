<script>
import { useStore} from 'vuex';
export default {
  setup() {
    const store = useStore();
    let movies = store.getters.getMovies;
  
    function playvideo(){
      console.log("1");
      if(movies[0].image == active){
        console.log("s");
        movies[0].video
      }
      else if(movies[1].image === true){
        movies[1].video
      }
    }

    return{
      movies, playvideo
    }
  },
};
</script>

<template>
  <header>
    <nav class="navbar navigatiebalk navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid navigatiebalk">
        <a class="navbar-brand" href="#"
          ><img
            class="homepage_icon"
            src="../src/assets/homepage_icon.png"
            alt=""
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse navigatiebalk_ul" id="navbarNav">
          <ul class="navbar-nav navigatiebalk_ul_li">
            <li class="nav-item">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <body>
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button id="test"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="5"
          aria-label="Slide 6"
        ></button>
      </div>
      <div class="carousel-inner">

        <div @click="playvideo" v-for="movie in movies" :key="movie.id">          
          <div :class="(movie.id == 1) ? 'carousel-item banner_images_bigscreen' + movie.id + ' active' : 'carousel-item banner_images_bigscreen' + movie.id" :style="{'background-image': 'url(' + movie.image + ')'}">
            <div class="carousel-caption d-none d-md-block">
              <button class="button_watch_movie carousel-caption d-none d-md-block">Watch movie here</button>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="container-fluid background-color">
      <div class="row allcards">
        <div v-for="movie in movies" :key="movie.id" :class="'card card' + movie.id + ' col-4 col-lg-2 col-md-1 card_hover'" :style="{'background-image': 'linear-gradient( 185deg, rgba(0, 212, 255, 0.4) 13%, rgba(7, 7, 135, 0.8) 57%), url(' + movie.image + ')', 'width': '18rem'} " >
            <div class="card-body">
              <h5 class="card-title">{{movie.title}}</h5>
              <p class="card-text">
                  {{movie.text}}
              </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="videoplayer col-12">
          <video
            controls
            src= 1
          ></video>
        </div>
      </div>
    </div>
  </body>
  <footer>
    <p>©2023 FinnSiepers Netherlands, Inc. All rights reserved.</p>
    <ul>
      <li>
        <a href="">Privacy Policy</a>
      </li>
      <li>
        <a href="">Terms & Conditions</a>
      </li>
      <li>
        <a href="">Cookies Policy</a>
      </li>
      <li>
        <a href="">Return Policy</a>
      </li>
      <li>
        <a href="">Disclaimer</a>
      </li>
      <li>
        <a href="">EULA</a>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
* {
  font-family: "Oswald";
  scroll-behavior: smooth;
}

.allcards {
  transform: translateY(-150px);
}

.allcards a{
  text-decoration: none;
  color: antiquewhite;
}

.carousel-indicators {
  bottom: auto;
}

.card1 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-style: none;
  z-index: 5;
}

.card_hover .card-body{
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.card_hover:hover .card-body {
  opacity: 1;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
}
.card_hover:hover{
  transform: scale(1.1);
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1); 
}

.card_hover{
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.carousel-caption{
  bottom: auto;
}
.carousel-caption button{
font-family: 'Courier New', Courier, monospace;
transform: translateY(-20px);
font-weight: bold;
padding-top: 40px;
border-style: none;
font-size: 20px;
border-radius: 0px 0px 10px 10px;
background: rgb(0,212,255);
background: linear-gradient(315deg, rgba(0,212,255,1) 0%, rgba(7,7,135,1) 60%);
}

.carousel-control-prev, .carousel-control-next{
  z-index: 0;
}

.card2 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-style: none;
}
.card3 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-style: none;
}
.card4 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-style: none;
}
.card5 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-style: none;
}
.card6 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-style: none;
  z-index: 5;
}
.card {
  margin-left: 1.5rem;
  color: antiquewhite;
  text-align: center;
}

.card h5 {
  color: antiquewhite;
  font-weight: bold;
  font-style: italic;
}
.homepage_icon {
  height: 40px;
  margin-left: 10px;
}

.videoplayer video {
  height: 100vh;
}

.videoplayer {
  display: flex;
  justify-content: center;
  background-color: #070787;
}
.banner_images_bigscreen1 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.banner_images_bigscreen2 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.banner_images_bigscreen3 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.banner_images_bigscreen4 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.banner_images_bigscreen5 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.banner_images_bigscreen6 {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

footer {
  background: rgb(2, 0, 36);
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 212, 255, 1) 45%,
    rgba(7, 7, 135, 1) 90%
  );
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  font-weight: bold;
  color: white;
}

.navigatiebalk_ul {
  justify-content: end;
}
.background-color {
  background: rgb(7, 7, 135);
  background: linear-gradient(
    306deg,
    rgba(7, 7, 135, 1) 26%,
    rgba(0, 212, 255, 1) 55%,
    rgba(7, 7, 135, 1) 87%
  );
}
.banner_images_bigscreen {
  height: 100vh;
  width: 199.3193vh;
}
.navigatiebalk_ul_li {
  gap: 100px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  padding-bottom: 15px;
}

.nav-item {
  border-style: solid;
  border-radius: 4px;
}

.navigatiebalk {
  margin: 0px;
  padding: 0px;

  background: rgb(2, 0, 36);
  background: linear-gradient(
    48deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(7, 7, 135, 1) 44%,
    rgba(0, 212, 255, 1) 100%
  );
  color: aliceblue;
}

.navigatiebalk a {
  color: aliceblue;
}
</style>
