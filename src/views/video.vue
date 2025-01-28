<script>
import { useStore} from 'vuex';
import { ref } from "vue";
export default {
  setup() {
    const store = useStore();
    let movies = store.getters.getMovies;
    let currentVideo = ref(null);

    const setVideo = (videoUrl) =>{
      store.commit('setVideo', videoUrl)
      currentVideo.value = store.getters.getCurrentVideo;
    }

    return{
      movies, setVideo, currentVideo
    }
  },
};
</script>

<template>
  <header>
    <nav class="navbar navigatiebalk neon-btn navbar-expand-lg bg-light">
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
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/liked">liked movies</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/register">register</RouterLink>
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
        <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="6"
        aria-label="Slide 7"
        ></button>
        <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="7"
        aria-label="Slide 8"
        ></button>
      </div>
      <div class="carousel-inner">

        <div @click="playvideo" v-for="movie in movies" :key="movie.id">          
          <div :class="(movie.id == 1) ? 'carousel-item banner_images_bigscreen' + movie.id + ' active' : 'carousel-item banner_images_bigscreen' + movie.id" :style="{'background-image': 'url(' + movie.image + ')'}">
            <div class="carousel-caption d-none d-md-block">
              <a href="#videoplr">
                <button ref="#" @click="setVideo(movie.video)"  class="button_watch_movie carousel-caption d-none d-md-block">Watch movie here</button>
              </a>
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
        <div id="videoplr" class="p-0 videoplayer col-12">     
          <video
            controls autoplay :src="currentVideo"
          ></video>
        </div>
        <div class="getupdiv">
            <a class="getup" href="#">click here to get Up</a>
          </div>
      </div>
    </div>
  </body>
  <footer>
    <div class="container">
      <div class="row text-center">
        <div class="col-12">
          <p>©2023 FinnSiepers Netherlands, Inc. All rights reserved.</p>

        </div>
        <div class="col-12 d-flex justify-content-center">
          <ul class="d-flex justify-content-center">
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
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>

.getupdiv{
  display: flex;
  justify-content: center;
  
}



.getup{
  color: aliceblue;
  text-decoration: none;
}



.allcards {
  transform: translateY(-125px);
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
  backdrop-filter: blur(100px);
  color: #ff0000;
  background: transparent;
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
  width: 100%;
}

.videoplayer {
  display: flex;
  justify-content: center;
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
  background: rgb(26,58,130);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  font-weight: bold;
  color: white;
}

.background-color {
  background: rgb(26,58,130);

}
.banner_images_bigscreen {
  height: 100vh;
  width: 199.3193vh;
}

</style>
