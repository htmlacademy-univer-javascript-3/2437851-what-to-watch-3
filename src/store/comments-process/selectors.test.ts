import { Namespace } from '../../consts';
import { makeFakeComment } from '../../utils/mocks';
import { getComments } from './selectors';

describe('CommentsProcess selectors', () => {
  it('should return comments from state', () => {
    const comments = Array.from({length: 5}).map(makeFakeComment);
    const state = { comments };

    const result = getComments({ [Namespace.Comments]: state });

    expect(result).toBe(comments);
  });
});
