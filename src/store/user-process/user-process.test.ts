import { describe, it } from 'vitest';
import { setAuthorizationStatus, userProcess } from './user-process';
import { AuthorizationStatus } from '../../consts';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Unknown };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should update authorization status with "setAuthorizationStatus" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Unknown };
    const expectedAuthorizationStatus = AuthorizationStatus.Auth;

    const result = userProcess.reducer(initialState, setAuthorizationStatus(expectedAuthorizationStatus));

    expect(result.authorizationStatus).toBe(expectedAuthorizationStatus);
  });
});
