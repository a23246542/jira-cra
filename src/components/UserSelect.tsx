import React, { useEffect } from 'react';
import { IdSelect } from './IdSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, selectUsers } from 'redux/entities/user.slice';

interface IUserSelect extends React.ComponentProps<typeof IdSelect> {}

export const UserSelect = (props: IUserSelect) => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);

  return (
    <div>
      <IdSelect options={users || []} {...props} />
    </div>
  );
};
