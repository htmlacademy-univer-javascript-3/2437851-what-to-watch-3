import {name, datatype, lorem} from 'faker';
import { Comment } from '../types/comment';

export const makeFakeComment = (): Comment => ({
  id: datatype.uuid(),
  date: datatype.datetime().toISOString(),
  user: name.title(),
  comment: lorem.paragraph(),
  rating: datatype.number()
});
