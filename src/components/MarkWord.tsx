interface IMarkWord {
  name: string;
  keyword?: string;
}

export const MarkWord = ({ name, keyword }: IMarkWord) => {
  if (!keyword) {
    return <span>{name}</span>;
  }
  console.log('name', name);

  const wordAry = name.split(keyword);
  console.log('wordAry', wordAry, 'name', name, 'keyword', keyword);

  return (
    <>
      {wordAry.map((notKeywordStr, index) => {
        console.log('str', notKeywordStr);

        // if (notKeywordStr === '') {
        //   return (
        //     <span key={index} style={{ color: '#257AFD' }}>
        //       {keyword}
        //     </span>
        //   );
        // }

        // return <span key={index}>{notKeywordStr}</span>;

        return (
          <span key={index}>
            {notKeywordStr}
            {index === wordAry.length - 1 ? null : (
              <span style={{ color: '#257AFD' }}>{keyword}</span>
            )}
          </span>
        );
      })}
    </>
  );
};
