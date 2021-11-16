const randomNumber = require("../../utils/randomDigitNumber.js");

it("should return 4-digit random number", () => {
  const digitNumber1 = randomNumber.randomFourDigitNumber();
  const digitNumber2 = randomNumber.randomFourDigitNumber();

  expect(digitNumber1.toString()).toHaveLength(4);
  expect(digitNumber2.toString()).toHaveLength(4);
  expect(digitNumber1).not.toBe(digitNumber2);
});
