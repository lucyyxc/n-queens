// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var board = this.rows();
      var row = board[rowIndex];
      var conflicts = 0;
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          conflicts++;
        }
      }
      return conflicts > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //access the whole board
      var board = this.rows();
      //figure out how many rows the board has
      var indexOfRows = board.length - 1;
      //use while loop to run hasRowConflictAt for each row
      while (indexOfRows >= 0) {
        //if true, return true
        if (this.hasRowConflictAt(indexOfRows)) {
          return true;
        }
        indexOfRows--;
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //access the whole board
      var board = this.rows();
      //find how many rows the board has
      var indexOfRows = board.length - 1;
      var conflicts = 0;
      //access this column
      while (indexOfRows >= 0) {
        if (board[indexOfRows][colIndex] === 1) {
          conflicts++;
        }
        indexOfRows--;
      }
      return conflicts > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      var indexOfColumns = board.length - 1;
      while (indexOfColumns >= 0) {
        if (this.hasColConflictAt(indexOfColumns)) {
          return true;
        }
        indexOfColumns--;
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //access the board
      var board = this.rows();
      var conflicts = 0;
      var indexOfRows = board.length - 1;
      var starterRow = 0;
      while (starterRow <= indexOfRows && majorDiagonalColumnIndexAtFirstRow <= indexOfRows) {
        if (board[starterRow][majorDiagonalColumnIndexAtFirstRow] === 1) {
          conflicts++;
        }
        starterRow++;
        majorDiagonalColumnIndexAtFirstRow++;
      }
      return conflicts > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      var conflicts = 0;
      //find out how many rows there are
      // var indexOfRows = board.length - 1;
      //Start at Top Corner
      for (var i = (-1 * (board.length - 1)); i < board.length; i++) {
        // Check all Columns
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      // Go back to Top Corner
      // Check all Rows
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var conflicts = 0;
      var indexOfRows = board.length - 1;
      var starterRow = 0;

      while (starterRow <= indexOfRows && minorDiagonalColumnIndexAtFirstRow >= 0) {
        if (board[starterRow][minorDiagonalColumnIndexAtFirstRow] === 1) {
          conflicts++;
        }
        starterRow++;
        minorDiagonalColumnIndexAtFirstRow--;
      }
      return conflicts > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      var conflicts = 0;
      var max = (board.length - 1) * 2;

      for (var i = max; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
