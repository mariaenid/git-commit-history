import { useSelector, useDispatch } from 'react-redux';
import { onLoadError, onLoadCommits } from '../store/auth/commitSlice';

export const useCommitStore = () => {
  const { status } = useSelector((state: any) => state.commits);
  const dispatch = useDispatch();

  const onSaveCommitsToStore = async (payload: any) => {

    if (payload instanceof Error) {
      dispatch(onLoadError(payload.message));
      return;
    }

    dispatch(onLoadCommits(payload));

  }


  return {
    status,
    onSaveCommitsToStore,
  }
}
