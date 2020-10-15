/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//var newBoard = new Board({n:n});

window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});
  //choose starting position to place rook
  // solution.togglePiece(0, 0);
  //iterate over each row and column
  var matrix = solution.rows();
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      solution.togglePiece(i, j);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
      }
    }
  }

  //if the row and column helper functions both return false
  //use solution.set(row)(column) to set the value there at 1
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  var solutionCount = 0;
  var resultsArr = [];
  var solution = new Board({'n': n});
  var matrix = solution.rows();
  var counter = 0;

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      solution.togglePiece(i, j);
      counter++;
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
        counter--;
      }
    }
  }
  resultsArr.push(JSON.stringify(solution.rows()));
  if (!solution.hasAnyRooksConflicts() && counter === n) {
    solutionCount++;
  }

  solution = new Board({'n': n});
  matrix = solution.rows();
  counter = 0;
  for (var i = 0; i < matrix.length; i++) {
    for (var j = matrix[i].length - 1; j >= 0; j--) {
      solution.togglePiece(i, j);
      counter++;
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
        counter--;
      }
    }
  }
  if (!solution.hasAnyRooksConflicts() && !resultsArr.includes(JSON.stringify(solution.rows())) && counter === n) {
    solutionCount++;
    resultsArr.push(JSON.stringify(solution.rows()));
  }

  solution = new Board({'n': n});
  matrix = solution.rows();
  counter = 0;
  solution.togglePiece(0, 1);
  counter++;
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (i === 0 && j === 1) {
        continue;
      }
      solution.togglePiece(i, j);
      counter++;
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
        counter--;
      }
    }
  }
  if (!solution.hasAnyRooksConflicts() && counter === n && !resultsArr.includes(JSON.stringify(solution.rows()))) {
    solutionCount++;
    resultsArr.push(JSON.stringify(solution.rows()));
  }

  solution = new Board({'n': n});
  matrix = solution.rows();
  counter = 0;
  solution.togglePiece(0, 1);
  counter++;
  for (var i = 0; i < matrix.length; i++) {
    for (var j = matrix[i].length - 1; j >= 0; j--) {
      if (i === 0 && j === 1) {
        continue;
      }
      solution.togglePiece(i, j);
      counter++;
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
        counter--;
      }
    }
  }
  if (!solution.hasAnyRooksConflicts() && counter === n && !resultsArr.includes(JSON.stringify(solution.rows()))) {
    solutionCount++;
    resultsArr.push(JSON.stringify(solution.rows()));
  }

  solution = new Board({'n': n});
  matrix = solution.rows();
  counter = 0;
  solution.togglePiece(0, 0);
  counter++;
  for (var i = 0; i < matrix.length; i++) {
    for (var j = matrix[i].length - 1; j >= 0; j--) {
      if (i === 0 && j === 0) {
        continue;
      }
      solution.togglePiece(i, j);
      counter++;
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
        counter--;
      }
    }
  }
  if (!solution.hasAnyRooksConflicts() && counter === n && !resultsArr.includes(JSON.stringify(solution.rows()))) {
    solutionCount++;
    resultsArr.push(JSON.stringify(solution.rows()));
  }

  solution = new Board({'n': n});
  matrix = solution.rows();
  counter = 0;
  if (solution._isInBounds(0, 2)) {
    solution.togglePiece(0, 2);
    counter++;

    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (i === 0 && j === 2) {
          continue;
        }
        solution.togglePiece(i, j);
        counter++;
        if (solution.hasAnyRooksConflicts()) {
          solution.togglePiece(i, j);
          counter--;
        }
      }
    }
    if (!solution.hasAnyRooksConflicts() && counter === n && !resultsArr.includes(JSON.stringify(solution.rows()))) {
      solutionCount++;
      resultsArr.push(JSON.stringify(solution.rows()));
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 2 || n === 3) {
    return 0;
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  var solution = new Board({'n': n});
  var matrix = solution.rows();
  solution.togglePiece(0, 1);

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      solution.togglePiece(i, j);
      if (solution.hasAnyQueensConflicts()) {
        solution.togglePiece(i, j);
      }
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
