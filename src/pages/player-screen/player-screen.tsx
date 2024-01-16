import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentFilm } from '../../store/films-process/selectors';
import NotFound from '../not-found-screen/not-found-screen';
import { AppRoute } from '../../consts';
import { useNavigate, useParams } from 'react-router-dom';
import { formatTimeLeft } from '../../utils/utils';
import { fetchFilm } from '../../store/api-actions';

function PlayerScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const film = useAppSelector(getCurrentFilm);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (videoRef.current !== null) {
      if (!isPlaying) {
        videoRef.current.load();
      }
    }
  }, [isPlaying]);

  if (!film) {
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
          <div className="player__time-value">{`-${formatTimeLeft(timeLeft)}`}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlay}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'} />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
