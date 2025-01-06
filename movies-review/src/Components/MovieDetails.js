import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import mockData from "../mockData"; 

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.example.com/movies/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        const mockMovie = mockData.find((movie) => movie.id === parseInt(id));
        setMovie(mockMovie);
      });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img src={movie.poster} alt={movie.title} />
      <p>{movie.description}</p>
      <p>
        <strong>Release Date:</strong> {movie.releaseDate}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre.join(", ")}
      </p>
    </div>
  );
}

export default MovieDetails;
