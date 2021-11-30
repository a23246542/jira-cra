import React from 'react';
import { Select } from 'antd';

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: string | number | undefined | null;
  onChange?: (value?: number) => void;
  options?: Array<{ name: string; id: number }>;
  defaultOptionName?: string;
}

export const IdSelect = ({ value, options, defaultOptionName, onChange }: IdSelectProps) => {
  return (
    <Select value={toNumber(value)} onChange={(value) => onChange?.(toNumber(value) || undefined)}>
      <Select.Option value={0}>{defaultOptionName}</Select.Option>
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown): number => (isNaN(Number(value)) ? 0 : Number(value));
