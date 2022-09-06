/**
 *
 * @param {any} a is first value to compare
 * @param {any} b is ssecond value to compare
 * @returns {Boolean}
 */
module.exports.areEqual = (a, b) =>
  String(a).toLowerCase() === String(b).toLowerCase();

module.exports.getIcon = () =>
  "https://www.minetopia.io/assets/images/full_logo.png";

module.exports.getTimeString = () => {
  let newDate = new Date(Date.now());

  return new Date(newDate.getTime()).toUTCString();
};
