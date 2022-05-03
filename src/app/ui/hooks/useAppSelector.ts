import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'src/app/state/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
