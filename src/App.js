import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    //바뀌는 변수
    isLoading: true,
    movies: []
  };
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movies => {
              return (
                <Movie
                  key={movies.id}
                  id={movies.id}
                  year={movies.year}
                  title={movies.title}
                  summary={movies.summary}
                  poster={movies.medium_cover_image}
                  genres={movies.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }

  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }
}

export default App;
