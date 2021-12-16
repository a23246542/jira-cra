import { Typography } from 'antd';
import { isError } from 'utils/isError';

interface IErrorBox {
  error: unknown;
}

export const ErrorBox = ({ error }: IErrorBox) => {
  if (isError(error)) {
    return (
      <div>
        <Typography.Text type="danger">
          {error?.message}
        </Typography.Text>
      </div>
    );
  }
  return null;
};
