import "./MovieCard.css"

function MovieCard({movie}) {

  return (
    <div className="movie-card">
      <img 
        src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
        alt={movie.title} 
      />
      <h2>{movie.title}</h2>
      <h3>{movie.vote}</h3>
    </div>
  )

}

export default MovieCard