import { describe, it } from 'vitest';
import { commentsProcess } from './comments-process';
import { makeFakeComment } from '../../utils/mocks';
import { fetchComments } from '../api-actions';

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

  it('should set comments with "fetchComments.fulfilled" action', () => {
    const initialState = { comments: [] };
    const expectedComments = Array.from({length: 5}).map(makeFakeComment);

    const result = commentsProcess.reducer(initialState, fetchComments.fulfilled(expectedComments, '', '', undefined));

    expect(result.comments).toBe(expectedComments);
  });
});
