const utils = require("./../utils/utils");

test("Properly rounds number by shares property", () => {

    const num = 5.4333552;
    expect(utils.roundShares(num)).toBe(5.43);
})