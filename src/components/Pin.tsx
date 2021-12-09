import React from 'react';
import { Rate } from 'antd';

interface IPin extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckChange?: (checked: boolean) => void;
}

export const Pin = ({
  checked,
  onCheckChange,
  ...restProps
}: IPin) => {
  return (
    <div>
      <Rate
        count={1}
        value={checked ? 1 : 0}
        onChange={(num: number) => onCheckChange?.(!!num)}
        {...restProps}
      />
    </div>
  );
};
