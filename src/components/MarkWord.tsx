interface IMarkWord {
  name: string;
  keyword?: string;
}

export const MarkWord = ({ name, keyword }: IMarkWord) => {
  if (!keyword) {
    return <span>{name}</span>;
  }

  const wordAry = name.split(keyword); //把keyowrd去掉分割

  return (
    <>
      {wordAry.map((str, index) => {
        return (
          <span key={index}>
            {/* 非關鍵字的str */}
            {str}
            {/* 如果不是最後一個就補上keyword */}
            {index === wordAry.length - 1 ? null : (
              <span style={{ color: '#257AFD' }}>{keyword}</span>
            )}
          </span>
        );
      })}
    </>
  );
};
