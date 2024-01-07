import { Namespace } from '../../consts';
import { State } from '../../types/state';

export const getAuthorizationDetails = (state: Pick<State, Namespace.User>) => state[Namespace.User].authorizationDetails;
