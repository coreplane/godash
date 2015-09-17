import {Map, List} from 'immutable';

import {isPositiveInteger} from './utils';
import {
    SIZE_KEY, allPossibleMoves, group, liberties, isLegalMove,
    BLACK, WHITE, EMPTY,
} from './analysis';
import {
    emptyBoard, addBlackMove, addWhiteMove, addMove, removeMoves,
} from './transforms';


function isValidBoardMap(board) {
    return Map.isMap(board) && isPositiveInteger(board.get(SIZE_KEY, 0));
}


/**
 * Represents a board state.
 * @example
 * var Immutable = require('immutable');
 *
 * var board1 = Board(19);
 * var board2_data = Immutable.Map().set('size', 19);
 * var board2 = Board(board2_data);
 *
 * assert(board1.equals(board2));
 */
export class Board {
    /**
     * @param {Map} board_data argument specifying either the backing Map or the size
     * @throws {TypeError} when board_data is neither a proper board Map or a positive integer
     */
    constructor(board_data) {
        if (isValidBoardMap(board_data)) {
            this._data = board_data;
        } else if (isPositiveInteger(board_data)) {
            this._data = emptyBoard(board_data);
        } else {
            throw TypeError('Instantiate a Board with a Map or a positive integer');
        }
    }

    /**
     * Underlying data structure for the Board.
     *
     * @returns {Map}
     */
    get data() {
        return this._data;
    }

    /**
     * Positive integer representing the size of the board.
     *
     * @returns {number}
     */
    get board_size() {
        return this.data.get(SIZE_KEY);
    }

    /**
     * Adds a black move at the specified position.  Follows the rules of go
     * which means dead stones will be removed.
     *
     * @param {List} position
     * @throws {string} when the move is not valid
     * @returns {Board}
     * @see {@link addMove}
     */
    addBlackMove(position) {
        return new Board(addBlackMove(this.data, position));
    }

    /**
     * Adds a white move at the specified position.  Follows the rules of go
     * which means dead stones will be removed.
     *
     * @param {List} position
     * @throws {string} when the move is not valid
     * @returns {Board}
     * @see {@link addMove}
     */
    addWhiteMove(position) {
        return new Board(addWhiteMove(this.data, position));
    }

    /**
     * Adds a move at the specified position.  Follows the rules of go
     * which means dead stones will be removed.
     *
     * @param {List} position
     * @param {string} color
     * @throws {string} when the move is not valid
     * @returns {Board}
     * @example
     * var board = Board(3);
     * var new_board = board.addBlackMove(position(1, 0));
     *
     * console.log(board.toPrettyString());
     * // +++
     * // +++
     * // +++
     * console.log(new_board.toPrettyString());
     * // +++
     * // O++
     * // +++
     *
     * @example
     * var board = Board(3)
     *     .addBlackMove(position(0, 1))
     *     .addBlackMove(position(2, 1))
     *     .addBlackMove(position(1, 2))
     *     .addWhiteMove(position(1, 1));
     * var new_board.addBlackMove(position(1, 0));
     *
     * console.log(board.toPrettyString());
     * // +O+
     * // +XO
     * // +O+
     * console.log(new_board.toPrettyString());
     * // +O+
     * // O+O
     * // +O+
     */
    addMove(position, color) {
        return new Board(addMove(this.data, position, color));
    }

    /**
     * Removes positions.  Positions that are not on the board are ignored.
     *
     * @param {Set} positions
     * @returns {Board}
     */
    removeMoves(positions) {
        return new Board(removeMoves(this.data, positions));
    }

    /**
     * A set of all possible moves on the board, even the occupied ones.
     *
     * @returns {Set} contains Lists (2-tuples)
     */
    allPossibleMoves() {
        return allPossibleMoves(this.board_size);
    }

    /**
     * Gets a set of positions of the logical group associated with the given position.
     *
     * @param {List} position
     * @returns {Set}
     */
    group(position) {
        return group(this.data, position);
    }

    /**
     * Check if a move is legal for black
     *
     * @param {List} position
     * @returns {boolean}
     */
    isLegalBlackMove(position) {
        return isLegalMove(this.data, position, BLACK);
    }

    /**
     * Check if a move is legal for white
     *
     * @param {List} position
     * @returns {boolean}
     */
    isLegalWhiteMove(position) {
        return isLegalMove(this.data, position, WHITE);
    }

    /**
     * Counts liberties for the stone at the given position.
     *
     * @param {List} position
     * @returns {number}
     */
    liberties(position) {
        return liberties(this.data, position);
    }

    /**
     * Compare with another board.
     *
     * @param {*} other_board Board or Board.data
     * @returns {boolean}
     */
    equals(other_board) {
        if (!other_board) {
            throw TypeError('Pass in another board to compare');
        }

        return this.data.equals(other_board.data || other_board);
    }

    /**
     * @returns {string} ASCII board
     */
    toPrettyString() {
        const size = this.board_size;
        let pretty_string = '';

        for (var i = 0; i < this.board_size; i++) {
            for (var j = 0; j < this.board_size; j++) {
                let color = this.data.get(List.of(i, j), EMPTY);
                switch(color) {
                    case BLACK:
                        pretty_string += 'O';
                        break;
                    case WHITE:
                        pretty_string += 'X';
                        break;
                    case EMPTY:
                        pretty_string += '+';
                        break;
                }
            }
            pretty_string += '\n';
        }
        return pretty_string;
    }
}