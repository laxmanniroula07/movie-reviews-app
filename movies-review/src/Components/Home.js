import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mockData from "../mockData"; // Import mock data

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    
    fetch("https://api.example.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => {
        console.error("Error fetching movies, using mock data:", error);
        setMovies(mockData); 
      });
  }, []);

  return (
    <div className="home">
      <h1>Featured Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
