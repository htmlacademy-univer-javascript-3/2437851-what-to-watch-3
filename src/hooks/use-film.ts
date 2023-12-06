import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { fetchFilm } from '../store/api-actions';
import { useEffect } from 'react';

export const useFilm = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
    }
  }, [dispatch, id]);

  return useAppSelector((state) => state.currentFilm);
};
