import { Namespace } from '../../consts';
import { State } from '../../types/state';

export const getComments = (state: Pick<State, Namespace.Comments>) => state[Namespace.Comments].comments;
