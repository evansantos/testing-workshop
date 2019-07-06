// using jest utilities
import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('returns winner', () => {
  // replace these lines with a call to jest.spyOn and
  // call to mockImplementation on the mocked function (See hint #1)
  // const originalGetWinner = utils.getWinner
  // utils.getWinner = (p1, p2) => p2
  jest.spyOn(utils, 'getWinner');
  utils.getWinner.mockImplementation((player1, player2) => player2)

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(utils.getWinner).toBeCalledTimes(2)
  expect(utils.getWinner).toHaveBeenCalledWith('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')

  // replace the next two lines with a restoration of the original function
  // (See hint #2)
  // utils.getWinner = originalGetWinner
  utils.getWinner.mockRestore();
})

/*
Hints below









































































Hint #1:

Here's an example of those APIs:

const myObject = {foo: () => 'bar'}
jest.spyOn(myObject, 'foo')
myObject.foo.mockImplementation(() => 'not-bar')
myObject.foo() === 'not-bar' // true


See the solution file for the solution









Hint #2:

If we wanted to restore the mocked `myObject.foo` function
to its original implementation, we could do:
myObject.foo.mockRestore()

And then the original implementation will be called.
myObject.foo() === 'bar' // true


 */
