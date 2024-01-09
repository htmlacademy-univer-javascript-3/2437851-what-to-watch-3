import { useState } from 'react';
import { FilmDetails } from '../../types/film';
import Overview from './overview';
import Details from './details';
import Reviews from './reviews';
import cn from 'classnames';
import { Comment } from '../../types/comment';

type TabsProps = {
  film: FilmDetails;
  comments: Comment[];
}

function Tabs({film, comments}: TabsProps): JSX.Element {
  const tabs = {
    ['Overview']: <Overview film={film} />,
    ['Details']: <Details film={film} />,
    ['Reviews']: <Reviews comments={comments} />,
  };

  const [activeTab, setActiveTab] = useState<keyof typeof tabs>('Overview');

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            Object.keys(tabs)
              .map((tab) => (
                <li className={cn('film-nav__item', {'film-nav__item--active': activeTab === tab})} key={tab}>
                  <a className="film-nav__link" onClick={() => setActiveTab(tab as keyof typeof tabs)}>{tab}</a>
                </li>
              ))
          }
        </ul>
      </nav>

      {
        tabs[activeTab]
      }
    </div>
  );
}

export default Tabs;
