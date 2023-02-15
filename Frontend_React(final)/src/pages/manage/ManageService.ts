import axios from '../../utils/interceptors';

// api call to get all the movie
export function getMovie(){
    return axios.get('http://127.0.0.1:5000/movie')
    .then(response => response.data)
    // eslint-disable-next-line no-console
    .catch(err => console.log('Error: ', err));
}
//api call for getting the movie rating
export function getMovieRate(){
    return axios.get('http://127.0.0.1:5000/movies')
    .then(response => response.data)
    // eslint-disable-next-line no-console
    .catch(err => console.log('Error: ', err));
}
//api call to get all the genre
export function getGenre(){
    return axios.get('http://127.0.0.1:5000/genre')
    .then(response => response.data)
    // eslint-disable-next-line no-console
    .catch(err => console.log('Error:',err));
}
//api call to add all the movies
export function addMovie(movie:any){
    return axios.post('http://127.0.0.1:5000/movie' , {
        moviename:movie[0].value,
        moviegenre:movie[1].value,
        director:movie[2].value,
        language:movie[3].value
        })
    .then(response => response.data)
    // eslint-disable-next-line no-console
    .catch(err => console.log('Error: ', err));
}
// api call to update the movie
export function updateMovie(movie: any, movieid: any) {
    return axios.put(`http://127.0.0.1:5000/movie/${movieid}`, {
      moviename: movie.moviename,
      moviegenre: movie.moviegenre,
      director: movie.director,
      language: movie.language
    })
      .then(response => response.data)
      // eslint-disable-next-line no-console
      .catch(err => console.log('Error: ', err));
  }

// api call to delete the movie
export function deleteMovie(movieid: any) {
    return axios.delete(`http://127.0.0.1:5000/movie/${movieid}`, {
        method: 'Delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.data)
    // eslint-disable-next-line no-console
    .catch(err => console.log('Error: ', err));
}


//api for add rating
export function addRting(movie:any){
    return axios.post('http://127.0.0.1:5000/rating' , {
        userid:movie.userid,
        movieid:movie.movieid,
        rating:movie.rating
        })
    .then(response => response.data)
    // eslint-disable-next-line no-console
    .catch(err => console.log('Error: ', err));
}





