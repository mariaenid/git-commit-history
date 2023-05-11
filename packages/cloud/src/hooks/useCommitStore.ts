import { useSelector, useDispatch } from 'react-redux';
import { onLoadError, onLoadCommits } from '../store/auth/commitSlice';
import { useContext } from 'react';
import AlertContext from '../components/notification-provider/NotificationProvider';

export const useCommitStore = () => {
  const alert = useContext(AlertContext);
  const { commits } = useSelector((state: any) => state.commits);
  const dispatch = useDispatch();

  const onSaveCommitsToStore = async (payload: unknown) => {
    if (payload instanceof Error) {
      dispatch(onLoadError(payload.message));
      alert.error(payload.message)
      return;
    }

    dispatch(onLoadCommits(payload));

  }

  return {
    commits: commits,
    onSaveCommitsToStore,
  }
}
