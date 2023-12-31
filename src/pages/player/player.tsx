import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getCurrentFilm } from '../../store/films-process/selectors';
import NotFound from '../not-found/not-found';
import { AppRoute } from '../../consts';
import { useNavigate } from 'react-router-dom';

function Player(): JSX.Element {
  const navigate = useNavigate();
  const film = useAppSelector(getCurrentFilm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current !== null) {
      if (!isPlaying) {
        videoRef.current.load();
      }
    }
  }, [isPlaying]);

  if (film === undefined) {
    return (<NotFound />);
  }

  const handleFullScreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  const handleUpdateProgress = () => {
    if (videoRef.current?.duration) {
      setTimeLeft(Math.round(videoRef.current.duration - videoRef.current?.currentTime));
      setProgress((videoRef.current.currentTime * 100) / videoRef.current?.duration);
    }
  };

  return (
    <div className="player">
      <video src={film.videoLink} className="player__video" poster={film.posterImage} ref={videoRef} onDoubleClick={handleFullScreen} onTimeUpdate={handleUpdateProgress}/>

      <button type="button" className="player__exit" onClick={() => navigate(`/${AppRoute.Films}/${film.id}`)}>
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{'left': `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlay}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'} />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
