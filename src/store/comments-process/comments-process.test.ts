import { describe, it } from 'vitest';
import { commentsProcess, setComments } from './comments-process';
import { makeFakeComment } from '../../utils/mocks';

describe('CommentsProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { comments: [] };

    const result = commentsProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { comments: [] };

    const result = commentsProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should update authorization status with "setAuthorizationStatus" action', () => {
    const initialState = { comments: [] };
    const expectedComments = Array.from({length: 5}).map(makeFakeComment);

    const result = commentsProcess.reducer(initialState, setComments(expectedComments));

    expect(result.comments).toBe(expectedComments);
  });
});
