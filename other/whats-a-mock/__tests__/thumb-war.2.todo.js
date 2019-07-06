// improved assertions for mocks
import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  utils.getWinner = (...args) => {
    utils.getWinner.mock.calls.push(args)
    return args[1]
  }
  utils.getWinner.mock = {calls: []}

  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')
  expect(utils.getWinner.mock.calls).toHaveLength(2)

  utils.getWinner.mock.calls.forEach(args => {
    expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds'])
  })

  utils.getWinner = originalGetWinner
})

/*
Hints below:









































































Hint #1:

There's nothing too magical going on here, you just need some place to store the state for every time the function is
called. Something like this should do just fine (Sorry, this is the solution I have. I couldn't think of a way to hint
at it without totally giving it away or leading you astray):

utils.getWinner = (...args) => {
  utils.getWinner.mock.calls.push(args)
  return args[1]
}
utils.getWinner.mock = {calls: []}







Hint #2:
Depending on how you store the state of how many times it's been called, you might either do this:

expect(timesCalled).toBe(2)

Or you might do this:

expect(utils.getWinner.mock.calls).toHaveLength(2)

Either way is fine.






Hint #3:

You can have assertions within a forEach and that's not entirely uncommon. Depending on how you're storing the state
of the arguments its called with you might do this (#spoileralert this is the solution... sorry):

utils.getWinner.mock.calls.forEach(args => {
  expect(args).toEqual(['Ken Wheeler', 'Kent C. Dodds'])
})




 */
