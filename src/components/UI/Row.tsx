import styled from '@emotion/styled';

export const Row = styled.div<{
  spacing?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.between ? 'space-between' : undefined};
  margin-bottom: ${(props) => props.marginBottom};
  > :not(:first-child) {
    margin-left: ${(props) =>
      typeof props.spacing === 'number'
        ? props.spacing + 'rem'
        : props.spacing
        ? '2rem'
        : undefined};
  }
  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
