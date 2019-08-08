const isValidNumSet = (row) => {
  return JSON.stringify(row.sort()) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]);
};

const getArrayKey = (row, col) => {
  return `${Math.floor(row / 3)}${Math.floor(col / 3)}`;
};

const getArrayIndex = (row, col) => {
  return (row % 3) * 3 + (col % 3);
};

const validSolution = (solution) => {
  if (solution.length !== 9) {
    return false;
  }
  if (solution.some(row => row.length !== 9)) {
    return false;
  }

  if (solution.map(row => row.slice()).some(row => !isValidNumSet(row))) {
    return false;
  }

  const transposed = Object.keys(solution[0]).map(c => solution.map(r => r[c]));
  if (transposed.some(row => !isValidNumSet(row))) {
    return false;
  }
  const gridMap = {};
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gridMap[`${i}${j}`] = [];
    }
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      gridMap[getArrayKey(i, j)][getArrayIndex(i, j)] = solution[i][j];
    }
  }
  return !Object.keys(gridMap)
    .map(key => gridMap[key])
    .some(grid => !isValidNumSet(grid));
};

module.exports = { validSolution };
