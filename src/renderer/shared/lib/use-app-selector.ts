import { TypedUseSelectorHook, useSelector } from 'react-redux';

// eslint-disable-next-line no-undef
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
