export const isNumber = (value: any): boolean => {
  return (
    value !== null &&
    value !== undefined &&
    !isNaN(parseFloat(value)) &&
    isFinite(value)
  );
};
