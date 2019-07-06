import {isPasswordAllowed, userToJSON} from '../auth'

describe('isPasswordAllowed', () => {
  const allowedPasswords = ['Bu3BsM!9^U6ydF?k', '_4#mn4hAy', '6"vapqW']
  const disallowedPasswords = ['', '293841', 'alvxiv', '#.J@P']

  allowedPasswords.forEach(pwd => {
    it(`"${pwd}" expect to be allowed`, () => {
      expect(isPasswordAllowed(pwd)).toBe(true)
    })
  })

  disallowedPasswords.forEach(pwd => {
    it(`"${pwd}" expect to be disallowed`, () => {
      expect(isPasswordAllowed(pwd)).toBe(false)
    })
  })
})

test('userToJSON excludes secure properties', () => {
  // Here you'll need to create a test user object
  // pass that to the userToJSON function
  // and then assert that the test user object
  // doesn't have any of the properties it's not
  // supposed to.
  // Here's an example of a user object:
  // const user = {
  //   id: 'some-id',
  //   username: 'sarah',
  //   // ↑ above are properties which should
  //   // be present in the returned object
  //
  //   // ↓ below are properties which shouldn't
  //   // be present in the returned object
  //   exp: new Date(),
  //   iat: new Date(),
  //   hash: 'some really long string',
  //   salt: 'some shorter string',
  // }
  const user = {
    id: 'some-id',
    username: 'sarah',
    exp: new Date(),
    iat: new Date(),
    hash: 'some really long string',
    salt: 'some shorter string',
  }

  const schema = {
    id: expect.any(String),
    username: expect.any(String),
  }

  expect(userToJSON(user)).toEqual(schema)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=auth%20util&em=
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
