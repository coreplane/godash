import {Set, List} from 'immutable';
import {isPositiveInteger} from './utils';


/**
 * Returns a coordinate type compatible with the rest of godash.
 *
 * @param {number} x
 * @param {number} y
 * @returns {List} representing a possible coordinate on the board
 * @throws {TypeError} arguments are not integers greater than or equal to 0
 */
export function position(x, y) {
    const valid_x = x === 0 || isPositiveInteger(x);
    const valid_y = y === 0 || isPositiveInteger(y);

    if (!valid_x || !valid_y) {
        throw TypeError('Both passed arguments must be integers greater than or equal to 0');
    }

    return List.of(x, y);
}


/**
 * Validates a position with a board size.
 *
 * @returns {boolean}
 */
export function isValidPosition(position, board_size) {
    // TODO
}


/**
 * Returns a {@link Set} of positions compatible with areas of godash that need a collection
 * of positions.
 *
 * @param {*} raw_positions anything that is compatible with the constructor arguments for Set
 * @returns {Set}
 */
export function positions(raw_positions) {
    const position_set = Set(raw_positions);

    // TODO - check validity of each position

    return position_set;
}
