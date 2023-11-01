import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { Film } from '../../types/film';
import PreviewPlayer from '../preview-player/preview-player';
import { useState } from 'react';

type FilmCardProps = {
  film: Film;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

function FilmCard({ film, onMouseEnter, onMouseLeave }: FilmCardProps): JSX.Element {
  const width = 280;
  const height = 175;

  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setTimer(setTimeout(() => setIsHovered(true), 1000));
    onMouseEnter(film.id);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setIsHovered(false);
    onMouseLeave();
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="small-film-card__image">
        {
          isHovered
            ? <PreviewPlayer videoLink={film.videoLink} poster={film.posterImage} width={width} height={height} />
            : <img src={film.posterImage} width={width} height={height} />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/${AppRoute.Films}/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
