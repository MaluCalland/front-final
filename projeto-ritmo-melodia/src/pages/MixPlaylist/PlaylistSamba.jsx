import { useRef, useState } from 'react';
import '../../css/DesignPlaylist.css';
import YouTube from 'react-youtube';

import cantor1 from '../../assets/images/playlist-samba/raca-negra.jpg';
import cantor2 from '../../assets/images/playlist-samba/seu-jorge.webp';
import cantor3 from '../../assets/images/playlist-samba/Zeca Pagodinho.webp';
import cantor4 from '../../assets/images/playlist-samba/adorianbarbosa.jpg';
import cantor5 from '../../assets/images/playlist-samba/alcione.jpeg';
import cantor6 from '../../assets/images/playlist-samba/arlindooo.jpg';
import cantor7 from '../../assets/images/playlist-samba/beth.png';
import cantor8 from '../../assets/images/playlist-samba/diogo.avif';
import cantor9 from '../../assets/images/playlist-samba/elza.webp';
import cantor10 from '../../assets/images/playlist-samba/jorge-aragão.jpeg';
import cantor11 from '../../assets/images/playlist-samba/martinho.jpeg';
import cantor12 from '../../assets/images/playlist-samba/pauilinho.avif';

function PlaylistSamba () {
  // Estado para controlar o estado de reprodução de cada música
  const [isAudioPlaying, setIsAudioPlaying] = useState([false]); 
  const playerRefs = useRef([]); // Ref para os players do YouTube

  const avatarClass = ['objectFitCover', 'objectFitContain', 'none'];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);

  // Função para controlar a reprodução
  const handleAudioPlay = (index) => {
    const newIsPlaying = [...isAudioPlaying];

    // Se a música que está sendo clicada já está tocando
    if (newIsPlaying[index]) {
      // Pausa a música
      if (playerRefs.current[index] && playerRefs.current[index].internalPlayer) {
        playerRefs.current[index].internalPlayer.pauseVideo();
      }
      newIsPlaying[index] = false;
    } else {
      // Se a música não está tocando, pausa todas as outras e toca a música atual
      playerRefs.current.forEach((player, i) => {
        if (i !== index && player && player.internalPlayer) {
          player.internalPlayer.pauseVideo(); // Pausa outras músicas
          newIsPlaying[i] = false; // Atualiza o estado das outras músicas
        }
      });

      // Certificando que o player existe antes de tocar
      if (playerRefs.current[index] && playerRefs.current[index].internalPlayer) {
        playerRefs.current[index].internalPlayer.playVideo();
      }
      newIsPlaying[index] = true;
    }

    // Atualiza o estado
    setIsAudioPlaying(newIsPlaying);
  };

  // Configurações do YouTube Player
  const opts = {
    height: '0', // Não exibe o vídeo
    width: '0',  // Não exibe o vídeo
    playerVars: {
      autoplay: 0, // Não começa automaticamente
      controls: 0, // Não exibe controles
      mute: 0, // Não muda o áudio
      modestbranding: 1, // Remove a marca do YouTube
      showinfo: 0, // Não mostra informações do vídeo
    },
  };

 const songs = [
  { id: ' uJz0F36TGoc', title: 'Cheia de Manias', artist: 'Raça Negra', image: cantor1 },
  { id: ' prNwKbJNL2g', title: 'Amiga da minha mulher', artist: 'Seu Jorge', image: cantor2 },
  { id: 'oTREAvZbmME', title: 'Deixa A Vida Me Levar', artist: 'Zeca Pagodinho', image: cantor3 },
  { id: 'RkkGVgOqPuM', title: "Trem Das Onze", artist: 'Adoniran Barbosa', image: cantor4 },
  { id: ' 6d6fIM54Vkk', title: 'Não Deixe o Samba Morrer', artist: 'Alcione', image: cantor5 },
  { id: ' -HAbOWi5rD8', title: 'Será Que É Amor', artist: 'Arlindo Cruz', image: cantor6 },
  { id: 'KmUe9VYxJYQ', title: 'Vou Festejar', artist: 'Beth Carvalho', image: cantor7 },
  { id: ' h8PQQvNn6aI', title: 'Pé Na Areia', artist: 'Diogo Nogueira', image: cantor8 },
  { id: 'dX1-YA90Ffw', title: 'Saltei De Banda', artist: 'Elza Soares', image: cantor9 },
  { id: 'ouG68U6YTS4', title: 'Partido alto', artist: 'Jorge Aragão', image: cantor10 },
  { id: 'hqWWiGZfay8', title: 'Disritmia', artist: 'Martinho Da Vila', image: cantor11 },
  { id: 'hGIv3B6IrdY', title: 'Pecado capital', artist: 'Paulinho Da Viola', image: cantor12 },
];

  return (
    <div className="body-playlist">
      {songs.map((song, index) => (
        <div className="container" key={index}>
          <div className="music-Container">
            <p className="music-Head-Name">{song.title}</p>
            <p className="music-Artist-Name">{song.artist}</p>
            <img src={song.image} className={avatarClass[avatarClassIndex]} alt="song Avatar" id="songAvatar" />
            <div className="musicControlers">
              <i className="fa fa-backward musicControler"></i>
              <i
                className={`fa ${isAudioPlaying[index] ? 'fa-pause-circle' : 'fa-play-circle'} playBtn`}
                onClick={() => handleAudioPlay(index)} // Passa o índice para controlar a música específica
              ></i>
              <i className="fa fa-forward musicControler"></i>
            </div>

            {/* Componente YouTube (ocultando o vídeo) */}
            <YouTube
              videoId={song.videoId} // Usando o ID do vídeo da música
              opts={opts}
              ref={(el) => (playerRefs.current[index] = el)} // Ref para cada player
            />
          </div>
        </div>
      ))}
    </div>
  );  }
  
  export default PlaylistSamba;  