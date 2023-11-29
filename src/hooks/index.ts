import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, State} from '../types/state';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
