import { useState } from 'react';
import { Film } from '../../types/film';
import Overview from './overview';
import Details from './details';
import Reviews from './reviews';
import cn from 'classnames';
import { Review } from '../../types/review';

type TabsProps = {
  film: Film;
  reviews: Review[];
}

function Tabs({film, reviews}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs: [string, (film: Film) => JSX.Element][] = [
    ['Overview', () => (<Overview film={film} />)],
    ['Details', () => (<Details film={film} />)],
    ['Reviews', () => (<Reviews reviews={reviews} />)],
  ];

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            tabs.map((tab) => (
              <li className={cn('film-nav__item', {'film-nav__item--active': activeTab === tab[0]})} key={tab[0]}>
                <a className="film-nav__link" onClick={() => setActiveTab(tab[0])}>{tab[0]}</a>
              </li>))
          }
        </ul>
      </nav>

      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        tabs.find((tab) => tab[0] === activeTab)![1](film)
      }
    </div>
  );
}

export default Tabs;
