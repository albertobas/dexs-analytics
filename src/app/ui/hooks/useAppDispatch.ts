import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/state/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
