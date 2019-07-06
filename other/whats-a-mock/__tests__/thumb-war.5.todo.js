// use the jest __mocks__ directory
import thumbWar from '../thumb-war'
import * as utilsMock from '../utils'

jest.mock('../utils')


test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C. Dodds')
  expect(winner).toBe('Kent C. Dodds')
  expect(utilsMock.getWinner).toHaveBeenCalledTimes(2)
  expect(utilsMock.getWinner).toHaveBeenCalledWith('Ken Wheeler', 'Kent C. Dodds')
})

/*
Hint below





















































Hint #1:

jest.mock(relativePathToModuleToMock)




 */
