export const CalEquationFunc = (date) => {
  var currentDate = new Date();

  var specificDate = new Date(date);

  var timeDifferenceInMinutes = (currentDate - specificDate) / 60000;

  var equationOfTime = timeDifferenceInMinutes / 60;

  var checkDayIndex = equationOfTime / 24;

  var equationText = "";

  if (checkDayIndex < 1) {
    equationText = parseInt(equationOfTime) * 1 + 1 + " hours ago";
  } else if (checkDayIndex >= 1 && checkDayIndex <= 6) {
    equationText = parseInt(equationOfTime / 24) * 1 + 1 + " days ago";
  } else if (checkDayIndex > 6 && checkDayIndex <= 28) {
    equationText = parseInt(equationOfTime / 168) * 1 + 1 + " weeks ago";
  }

  const equation = {
    value: equationOfTime,
    text: equationText,
  };

  return equation;
};
