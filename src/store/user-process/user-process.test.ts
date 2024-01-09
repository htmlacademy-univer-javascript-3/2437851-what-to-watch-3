import { describe, it } from 'vitest';
import { userProcess } from './user-process';
import { checkAuth, login, logout } from '../api-actions';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationDetails: {
      name: '',
      avatarUrl: '',
      email: '',
      token: ''
    }};

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationDetails: undefined };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationDetails with "checkAuth.fulfilled" action', () => {
    const initialState = { authorizationDetails: undefined };
    const authorizationDetails = {
      name: '',
      avatarUrl: '',
      email: '',
      token: ''
    };
    const expectedState = { authorizationDetails };

    const result = userProcess.reducer(initialState, checkAuth.fulfilled(authorizationDetails, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationDetails to undefined with "checkAuth.rejected" action', () => {
    const initialState = { authorizationDetails: {
      name: '',
      avatarUrl: '',
      email: '',
      token: ''
    }};
    const expectedState = { authorizationDetails: undefined };

    const result = userProcess.reducer(initialState, checkAuth.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationDetails with "login.fulfilled" action', () => {
    const initialState = { authorizationDetails: undefined };
    const authorizationDetails = {
      name: '',
      avatarUrl: '',
      email: '',
      token: ''
    };
    const expectedState = { authorizationDetails };

    const result = userProcess.reducer(initialState, login.fulfilled(authorizationDetails, '', {email: '', password: ''}));

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationDetails to undefined with "login.rejected" action', () => {
    const initialState = { authorizationDetails: {
      name: '',
      avatarUrl: '',
      email: '',
      token: ''
    }};
    const expectedState = { authorizationDetails: undefined };

    const result = userProcess.reducer(initialState, login.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set authorizationDetails to undefined, with "logout.fulfilled" action', () => {
    const initialState = { authorizationDetails: {
      name: '',
      avatarUrl: '',
      email: '',
      token: ''
    }};
    const expectedState = { authorizationDetails: undefined };

    const result = userProcess.reducer(initialState, logout.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
