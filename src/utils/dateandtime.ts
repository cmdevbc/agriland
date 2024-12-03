export const getDoubleDigit = (num: number) => (num < 10 ? `0${num}` : num);

export const showTimeLabel = (epochTime: number) => {
  const date = new Date(epochTime * 1000);

  return `${getDoubleDigit(date.getHours())}:${getDoubleDigit(
    date.getMinutes()
  )}`;
};

export const showDateLabel = (epochTime: number) => {
  const date = new Date(epochTime * 1000);
  return `${getDoubleDigit(date.getMonth() + 1)}/${getDoubleDigit(
    date.getDate()
  )}`;
};

export const convertToTime = (epochTime: number) => {
  const date = new Date(epochTime * 1000);
  return `${date.getFullYear()}/${getDoubleDigit(
    date.getMonth() + 1
  )}/${getDoubleDigit(date.getDate())} ${getDoubleDigit(
    date.getHours()
  )}:${getDoubleDigit(date.getMinutes())}:${getDoubleDigit(date.getSeconds())}`;
};
