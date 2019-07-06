// avoid monkey-patching with jest.mock
import thumbWar from '../thumb-war'
import * as utils from '../utils'

// add an inline mock with the jest.mock API
//
// jest.mock(
//   relativePathToModuleToMock,
//   functionThatReturnsMockObject
// )
//
// (Hint #1)
jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((player1, player2) => player2)
  }
})

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  expect(utils.getWinner).toHaveBeenCalledWith('Ken Wheeler', 'Kent C. Dodds')
})

/*
Hint below:














































jest.mock('../utils', () => {
  return {
    // ...
    // see answer in the solution file
  }
})

 */
