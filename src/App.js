import './App.css';
import {useEffect, useState} from 'react'
import MovieList from "./components/MovieList"
import Loading from './components/Loading';
import SearchInput from './components/SearchInput';

const API_KEY = '90db55b9dcc02761d6a6051a96002649'

function App() {

  const[movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const[searchMode, setSearchMode] = useState(false);

  useEffect( () => {
    if(loading || searchMode) return
    loadMovies()
  },[page])

  useEffect(() => {
    // console.log('test')
    if(page === 1) {
      document.addEventListener('scroll', (e) => {

        const el = e.target.documentElement
        // scroll is at the bottom of the page
        console.log(el.scrollTop + el.clientHeight, el.scrollHeight)

        if(el.scrollTop + el.clientHeight === el.scrollHeight) {
          setPage(prevVal => prevVal + 1)
          console.log('ajunge',page)

          
        }
      })
    }
    
  },[page]) 

  function loadMovies() {
    setLoading(true)

    const apiURL = 'https://api.themoviedb.org/3/discover/movie'

    fetch(`${apiURL}?page=${page}&api_key=${API_KEY }`)
      .then(res => res.json())
      .then(response =>{
        // console.log('response',response)
        const movies = response.results.map(movie => ({
          id: movie.id,
          title : movie.title,
          overview: movie.overview,
          vote: movie.vote_average,
          poster: movie.poster_path,
          
        }))

        setLoading(false)
        setMovieList(prevMovies => [...prevMovies, ...movies])
      })
  }

  function searchMovies(query) {
    setMovieList([])
    setSearchMode(true)
    setLoading(true)
    const apiURL = 'https://api.themoviedb.org/3/search/movie'

    fetch(`${apiURL}?query=${query}&api_key=${API_KEY}`)
      .then(res => res.json())
      .then(response =>{
        const movies = response.results.map(movie => ({
          id: movie.id,
          title : movie.title,
          overview: movie.overview,
          vote: movie.vote_average,
          poster: movie.poster_path,
          
        }))

        setLoading(false)
        setMovieList(movies)
      })
  }

  function handleReset() {
    setMovieList([]);
    setSearchMode(false);

    if(page === 1) {
      loadMovies()
    } else{
      setPage(1)
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchInput 
          handleSearch={searchMovies}
          handleReset={handleReset}
        />
      </header>

        <main>
        <MovieList movies={movieList}/> 
        {loading && <Loading/>}
        </main>
    </div>
  );
}

export default App;
