export const cleanObject = (object: { [key in string]: unknown }) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) => {
      return !!value;
    }),
  );
};
