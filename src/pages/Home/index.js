import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import './home.css';

//https://api.themoviedb.org/3/authentication

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      //ele esta esperando a resposta da api para depois executar o que esta dentro do then
    async function loadFilmes() {
      const response = await api.get("/movie/now_playing", {
        params:{
          api_key: "dea02329103ee9ec2d73350bf644cb2f",
          language: "pt-BR",
          page: 1,
        }
      })

      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
      setFilmes(response.data.results.slice(0, 10))

    }

    loadFilmes();
  } , []);

  if(loading) {
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return(
            <article Key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={'https://image.tmdb.org/t/p/original' + filme.poster_path} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  );
}

export default Home;