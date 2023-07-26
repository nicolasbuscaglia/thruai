export const parseDigits = (id) => {
  let str = String(id);
  while (str.length < 4) str = "0" + str;
  return str;
};
