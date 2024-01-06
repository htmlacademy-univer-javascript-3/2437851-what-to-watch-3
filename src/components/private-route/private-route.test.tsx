import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(`/${AppRoute.MyList}`);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Root}>
          <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
          />
        </Route>
      </Routes>,
      mockHistory
    );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Root}>
          <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
          />
        </Route>
      </Routes>,
      mockHistory
    );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({USER: { authorizationStatus: AuthorizationStatus.NoAuth }}));

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
