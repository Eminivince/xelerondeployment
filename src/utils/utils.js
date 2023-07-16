export function formatNumber(numStr) {
  let num = parseFloat(numStr);

  if (num === 0) {
    return 0;
  }
  if (Number.isInteger(+numStr)) {
    return num;
  }

  let d = Math.ceil(Math.log10(num < 0 ? -num : num));
  let power = 2 - d;

  let magnitude = Math.pow(10, power);
  let shifted = Math.round(num * magnitude);
  return shifted / magnitude;
}
