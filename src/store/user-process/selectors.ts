import { Namespace } from '../../consts';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: Pick<State, Namespace.User>) => state[Namespace.User].authorizationStatus;
