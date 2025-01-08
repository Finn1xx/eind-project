import {createStore} from'vuex';
export const store = createStore({
    state(){
        return { movies:[{
    id: "1",
      title: "Star wars: Revenge of the sith",
      text: 'Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.',
      image: "../src/assets/starwars.jpg",
      video: "../src/assets/Star Wars： Revenge of The Sith - MODERN TRAILER.mp4"
    }, 
      
    {
      id: "2",
      title: "Oppenheimer",
      text: "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
      image: "../src/assets/oppenheimer.jpeg",
      video: "../src/assets/Oppenheimer ｜ New Trailer.mp4"
    }, 
    {
      id: "3",
      title: "Hacksaw Ridge",
      text: "World War II American Army Medic Desmond T. Doss, serving during the Battle of Okinawa, refuses to kill people and becomes the first man in American history to receive the Medal of Honor without firing a shot.",
      image: "../src/assets/hacksawridge.jpeg",
      video: "../src/assets/Hacksaw Ridge (2016) Official Trailer – “Believe” - Andrew Garfield.mp4"
    },

    {
      id: "4",
      title: "Interstellar",
      text: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
      image: "../src/assets/interstellar.jpg",
      video: "../src/assets/Interstellar - Trailer - Official Warner Bros. UK.mp4"
    }, 
    
    {
      id: "5",
      title: "Annabelle: Creation",
      text: "Twelve years after the tragic death of their little girl, a doll-maker and his wife welcome a nun and several girls from a shuttered orphanage into their home, where they become the target of the doll-maker's possessed creation, Annabelle.",
      image: "../src/assets/annabelle.jpg",
      video: "../src/assets/ANNABELLE： CREATION - Official Trailer.mp4"
    }, 
    
    {
      id: "6",
      title: "Spider-Man: Far from Home",
      text: "Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.",
      image: "../src/assets/spiderman.jpg",
      video: "../src/assets/SPIDER-MAN： FAR FROM HOME - Official Trailer.mp4"
    }]
        }
    },
    
    getters: {
        getMovies:state =>{
           return state.movies;
        }
    } 
})