module.exports = (obj, arr) => {
  arr.forEach(e => delete obj[e]);
  return obj;
}