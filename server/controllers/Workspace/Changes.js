const Diff = require('diff');

const one = 'my beep boop';
const other = 'beep boob blah';

const diff = Diff.diffChars(one, other);

const processDiff = (one, other) => {
  const diff = Diff.diffChars(one, other);
 return diff
};



module.exports = processDiff;

