import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import api from "../../services/api";
import './filme-info.css';

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function LoadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "Chave da API",
          laguage: "pt-BR",
          
        }
      })
      .then((response) => {
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Filme não encontrado")
        navigate("/", { replace: true });
        return;
      })
    }

    LoadFilme();
    

    return () => {
      console.log("Componente desmontado")
    }
  }, [navigate, id]);

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@GG.flix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id);

    if(hasFilme){
      toast.warn("O filme já está na lista...")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@GG.flix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!")


  }


  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes do filme...</h1>
      </div>
    )
  }



  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-botao">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
          target="blank"
          rel="noreferrer"
          href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
          Treiler
          </a>
        </button>
      </div>


    </div>
  );
}

export default Filme;
