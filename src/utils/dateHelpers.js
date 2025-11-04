export const isToday = (someDate) => {
    const today = new Date();
    const dateToCompare = new Date(someDate);
    return dateToCompare.toDateString() === today.toDateString();
  };