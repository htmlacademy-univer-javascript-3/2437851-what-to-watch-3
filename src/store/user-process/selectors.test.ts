import { Namespace } from '../../consts';
import { getAuthorizationDetails } from './selectors';

describe('UserProcess selectors', () => {
  it('should return authorizationDetails from state', () => {
    const authorizationDetails = {
      name: '',
      avatarUrl: '',
      email: '',
      token: ''
    };
    const state = { authorizationDetails };

    const result = getAuthorizationDetails({ [Namespace.User]: state });

    expect(result).toBe(authorizationDetails);
  });
});
