test('test commom matcher', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
});

test('test to be true or false', () => {
  expect(0).toBeFalsy();
  expect(1).toBeTruthy();
});

test('test number', () => {
  expect(4).toBeGreaterThan(2);
  expect(1).toBeLessThan(2);
});
