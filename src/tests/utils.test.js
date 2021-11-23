const utils = require("./../utils/utils");
const formulas = require("./../utils/formulas");


// checkIfNumOrReturnCero
test("checkIfNumOrReturnCero -> Normal input of number", () => {
    const num = 5.4333552;
    expect(utils.checkIfNumOrReturnCero(num)).toBe(5.4333552);
})
test("checkIfNumOrReturnCero -> Normal input of string of number", () => {
    const num = "5.4333552";
    expect(utils.checkIfNumOrReturnCero(num)).toBe(5.4333552);
})
test("checkIfNumOrReturnCero -> invalid input of string of number", () => {
    const num = "hi";
    expect(utils.checkIfNumOrReturnCero(num)).toBe(0);
})
test("checkIfNumOrReturnCero -> invalid boolean type", () => {
    const num = "true";
    expect(utils.checkIfNumOrReturnCero(num)).toBe(0);
})
test("checkIfNumOrReturnCero -> invalid object type", () => {
    const num = { data: 45, value: "some value" };
    expect(utils.checkIfNumOrReturnCero(num)).toBe(0);
})
//roundShares
test("roundShares -> Properly rounds number by shares property", () => {
    const num = 5.4333552;
    expect(utils.roundShares(num)).toBe(5.43);
})
test("roundShares -> Properly rounds number by shares property with negative number", () => {
    const num = -42566.888882;
    expect(utils.roundShares(num)).toBe(-42566.89);
})
test("roundShares -> Properly rounds number by shares property with non number passed", () => {
    const num = "-32.111882";
    expect(utils.roundShares(num)).toBe(-32.11);
})
test("roundShares -> Properly rounds number by shares property with boolean passed", () => {
    const num = true;
    expect(utils.roundShares(num)).toBe(0);
})
//roundPrice
test("roundShares -> Properly rounds number by shares property", () => {
    const num = 5.4333552;
    expect(utils.roundPrice(num)).toBe(5.433);
})
test("roundShares -> Properly rounds number by shares property with negative number", () => {
    const num = -42566.888882;
    expect(utils.roundPrice(num)).toBe(-42566.889);
})
test("roundShares -> Properly rounds number by shares property with non number passed", () => {
    const num = "-32.111882";
    expect(utils.roundPrice(num)).toBe(-32.112);
})
test("roundShares -> Properly rounds number by shares property with boolean passed", () => {
    const num = true;
    expect(utils.roundPrice(num)).toBe(0);
})
//roundPercent
test("roundShares -> Properly rounds number by shares property", () => {
    const num = 5.4333552;
    expect(utils.roundPercent(num)).toBe(5.4);
})
test("roundShares -> Properly rounds number by shares property with negative number", () => {
    const num = -42566.888882;
    expect(utils.roundPercent(num)).toBe(-42566.9);
})
test("roundShares -> Properly rounds number by shares property with non number passed", () => {
    const num = "-32.111882";
    expect(utils.roundPercent(num)).toBe(-32.1);
})
test("roundShares -> Properly rounds number by shares property with boolean passed", () => {
    const num = true;
    expect(utils.roundPercent(num)).toBe(0);
})
//roundRR
test("roundShares -> Properly rounds number by shares property", () => {
    const num = 5.4333552;
    expect(utils.roundRR(5.4333552)).toBe(5.4);
})
test("roundShares -> Properly rounds number by shares property with negative number", () => {
    const num = -42566.888882;
    expect(utils.roundRR(num)).toBe(-42566.9);
})
test("roundShares -> Properly rounds number by shares property with non number passed", () => {
    const num = "-32.111882";
    expect(utils.roundRR(num)).toBe(-32.1);
})
test("roundShares -> Properly rounds number by shares property with boolean passed", () => {
    const num = true;
    expect(utils.roundRR(num)).toBe(0);
})
//abs
test("abs -> having a positive number", () => {
    const num = 5.4333552;
    expect(utils.abs(5.4333552)).toBe(5.4333552);
})
test("abs -> a negative one", () => {
    const num = -42566.888882;
    expect(utils.abs(num)).toBe(42566.888882);
})
test("abs -> a negative but type string", () => {
    const num = "-32.111882";
    expect(utils.abs(num)).toBe(32.111882);
})
test("abs -> passing something wrong", () => {
    const num = true;
    expect(utils.abs(num)).toBe(0);
})
// checkIfHaveValidPositiveNumber
test("checkIfHaveValidPositiveNumber -> passing a positive number", () => {
    const num = 5.4333552;
    expect(utils.checkIfHaveValidPositiveNumber(5.4333552)).toBe(true);
})
test("checkIfHaveValidPositiveNumber -> passing a negative one", () => {
    const num = -42566.888882;
    expect(utils.checkIfHaveValidPositiveNumber(num)).toBe(false);
})
test("checkIfHaveValidPositiveNumber -> Negative of type string", () => {
    const num = "-32.111882";
    expect(utils.checkIfHaveValidPositiveNumber(num)).toBe(false);
})
test("checkIfHaveValidPositiveNumber -> something wrong", () => {
    const num = true;
    expect(utils.checkIfHaveValidPositiveNumber(num)).toBe(false);
})