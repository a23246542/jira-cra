export const cleanObject = (object: { [key in string]: unknown }) => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, value]) => {
      return !!value;
    }),
  );
};
