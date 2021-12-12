import React from 'react';
import { IdSelect } from './IdSelect';

interface IEpicSelect extends React.ComponentProps<typeof IdSelect> {}

export const EpicSelect = (props: IEpicSelect) => {
  return (
    <div>
      <IdSelect {...props} />
    </div>
  );
};
