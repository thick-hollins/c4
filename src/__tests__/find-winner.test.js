import { makeCW, makeCCW, reverseCCW } from '../findLines'
import { findWinner } from '../winning'

describe('findWinner()', () => {
  it('no winner, false', () => {
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ];
    expect(findWinner(board)).toBe(false)
  })
  it('tokens but no winner, false', () => {
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, 'o', null, null, null, null],
      [null, null, 'x', null, null, null, null],
      [null, 'x', 'o', 'x', null, null, null],
      [null, 'x', 'o', 'x', null, null, null]
    ];
    expect(findWinner(board)).toBe(false)
  });
  it('vertical winner o', () => {
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, 'o', null, null, null, null],
      [null, null, 'o', null, null, null, null],
      [null, 'x', 'o', 'x', null, null, null],
      [null, 'x', 'o', 'x', null, null, null]
    ];
    expect(findWinner(board)).toBe('o')
  });
  it('horizontal sequence with a gap, false', () => {
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, 'x', null, null, null, null],
      [null, null, 'x', 'x', 'x', null, null],
      ['o', null, 'o', 'o', 'o', null, null]
    ];
    expect(findWinner(board)).toBe(false)
  });
  it('diagonal sequence with a gap, false', () => {
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, 'x', null, null],
      [null, null, null, null, null, null, null],
      [null, null, 'x', null, null, null, null],
      [null, 'x', null, null, null, null, null],
      ['x', null, null, null, null, null, null]
    ];
    expect(findWinner(board)).toBe(false)
  })
  it('horizontal winner o', () => {
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, 'x', null, null, null, null],
      [null, null, 'x', 'x', 'x', null, null],
      [null, null, 'o', 'o', 'o', 'o', null]
    ];
    expect(findWinner(board)).toBe('o')
  });
  it('diagonal winner x', () => {
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, 'x', null, null, null],
      [null, null, 'x', 'o', null, null, null],
      [null, 'x', 'o', 'x', null, null, null],
      ['x', 'x', 'o', 'o', null, null, 'o']
    ];
    expect(findWinner(board)).toBe('x')
  });
  it('diagonal winner o', () => {
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['o', null, null, 'o', null, null, null],
      ['o', 'o', 'x', 'o', null, null, null],
      ['o', 'x', 'o', 'x', null, null, 'x'],
      ['x', 'x', 'o', 'o', null, null, 'o']
    ];
    expect(findWinner(board)).toBe('o')
  });
})
describe('makeCW', () => {
  it('should ', () => {
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, 'x', null, null],
      [null, null, null, null, null, null, null],
      [null, null, 'x', null, null, null, null],
      [null, 'x', null, null, null, null, null],
      ['x', null, null, null, null, null, null]
    ]
    expect(makeCW(board)).toEqual([
      [null, null, null, null],
      [null, null, null, null, null],
      ["x", "x", "x", null, "x", null],
      [null, null, null, null, null, null],
      [null, null, null, null, null], 
      [null, null, null, null]
    ])
  });
});
describe('makeCCW', () => {
  it('should ', () => {
    const board = [
      [null, null, null, 'x', null, null, null],
      [null, null, null, null, 'x', null, null],
      [null, null, null, null, null, 'x', null],
      [null, null, null, null, null, null, 'x'],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]
    expect(makeCCW(board)).toEqual([
      ['x', 'x', 'x', 'x'],
      [null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null],
    ])
  });
  it('should ', () => {
    const board = [
      [null, null, null, 'x', null, null, null],
      [null, null, null, null, 'x', null, null],
      [null, null, 'o', null, null, 'x', null],
      [null, null, null, 'o', null, null, 'x'],
      [null, null, null, null, 'o', null, null],
      [null, null, null, null, null, 'o', null]
    ]
    expect(makeCCW(board)).toEqual([
      ['x', 'x', 'x', 'x'],
      [null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, 'o', 'o', 'o', 'o'],
      [null, null, null, null, null],
      [null, null, null, null],
    ])
  })
});
describe('reverseCCW', () => {
  it.only('should ', () => {
    const board = [
      ['x', 'x', 'x', 'x'],
      [null, null, null, null, null],
      ['z', null, null, null, null, null],
      [null, null, 'o', 'o', 'o', 'o'],
      ['y', null, null, null, null],
      [null, null, null, null],
    ]
    const board2 = [
      [null, null,  'x',  'x',  'x',  'x'],
      [null, null, null, null, null, null],
      [ 'z', null, null, null, null, null],
      [null, null,  'o',  'o',  'o',  'o'],
      [ 'y', null, null, null, null],
      [null, null, null, null],
    ]
    expect(reverseCCW(board)).toEqual([
      [null, 'z', null, 'x', null, null, null],
      ['y', null, null, null, 'x', null, null],
      [null, null, 'o', null, null, 'x', null],
      [null, null, null, 'o', null, null, 'x'],
      [null, null, null, null, 'o', null, null],
      [null, null, null, null, null, 'o', null]
    ])
  });
});
