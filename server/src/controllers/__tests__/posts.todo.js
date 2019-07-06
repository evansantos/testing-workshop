import {initDb, generate} from 'til-server-test-utils'
import * as postsController from '../posts.todo'
import db from '../../utils/db'

// I'll give this one to you. You want the database to be fresh
// the initDb function will initialize the database with random users and posts
// you can rely on that fact in your tests if you want.
// (For example, getPosts should return all the posts in the DB)
beforeEach(() => initDb())
function setup() {
  const req = {
    body: {},
  }
  const res = {}
  Object.assign(res, {
    status: jest.fn(
      function status() {
        return this
      }.bind(res),
    ),
    json: jest.fn(
      function json() {
        return this
      }.bind(res),
    ),
    send: jest.fn(
      function send() {
        return this
      }.bind(res),
    ),
  })
  return {req, res}
}

test('getPosts returns all posts in the database', async () => {
  const { req, res } = setup();

  await postsController.getPosts(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const {posts} = firstArg
  expect(posts.length).toBeGreaterThan(0)
  const actualPosts = await db.getPosts()
  expect(posts).toEqual(actualPosts)
  // here you'll need to Arrange, Act, and Assert
  // Arrange: set up the req and res mock objects
  // Act: Call getPosts on the postsController with the req and res
  // Assert:
  //   - ensure that your mock object functions were called properly
  //   - BONUS: ensure that the posts returned are the ones in the database `await db.getPosts()`
})

test('getPost returns the specific post', async () => {
  // here you'll need to Arrange, Act, and Assert
  // Arrange:
  //   - create a test post and insert it into the database using `await db.insertPost(generate.postData())`
  //   - set up the req and res mock objects. Make sure the req.params has the test post ID
  // Act: Call getPost on the postsController with the req and res
  // Assert:
  //   - ensure that your mock object functions were called properly
  //   - BONUS: ensure that the post you got back is the same one in the db
  const testPost = await db.insertPost(generate.postData())
  const { req, res } = setup();
  req.params = { id: testPost.id }

  await postsController.getPost(req, res);
  expect(res.json).toHaveBeenCalledTimes(1);
  const firstCall = res.json.mock.calls[0];
  const firstArg = firstCall[0];
  const { post } = firstArg;
  expect(post).toEqual(testPost)
  
  const postFromDb = await db.getPost(post.id)
  expect(post).toEqual(postFromDb);

})

test('updatePost updates the post with the given changes', async () => {
  // BONUS: If you have extra time, try to implement this test as well!
  const testUserId = generate.id()
  const testPost = await db.insertPost(generate.postData({
    authorId: testUserId
  }))
  const { req, res } = setup();
  const title = generate.title()
  const updatedPost = { ...testPost,  title}
  
  req.user = { id: testUserId }
  req.params = { id: testPost.id }
  req.body = { title }

  await postsController.updatePost(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const { post } = firstArg
  expect(post).toEqual(updatedPost)

  const postFromDb = await db.getPost(post.id)
  expect(post).toEqual(postFromDb)

})

// Here's where you'll add your new `deletePost` tests!
// - Think more about use cases than code coverage and use those use cases to title your tests
// - Write the code and tests iteratively as little as necessary at a time.
// - Create and use a `setup` test object(s) factory to keep your tests focused

test('deletePost delete the post with the given chances', async () => {
  const testUserId = generate.id()
  const testPost = await db.insertPost(generate.postData({
    authorId: testUserId
  }))
  const { req, res } = setup();  
  req.user = { id: testUserId }
  req.params = { id: testPost.id }

  await postsController.deletePost(req, res)

  expect(res.json).toHaveBeenCalledTimes(1)
  const firstCall = res.json.mock.calls[0]
  const firstArg = firstCall[0]
  const { post } = firstArg
  expect(post).toEqual(testPost)

  const postFromDb = await db.getPost(post.id)
  expect(postFromDb).not.toBeDefined()
})

test('deletePost will 404 if made to a non-existing post', async () => {
  const { req, res } = setup();
  req.params = { id: generate.id()}

  await postsController.deletePost(req, res)
  expect(res.json).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(404)
  expect(res.send).toHaveBeenCalledTimes(1)
})

test('deletePost will 403 if not made by the author', async () => {
  const testPost = await db.insertPost(generate.postData())
  const { req, res } = setup();
  req.params = { id: testPost.id}

  await postsController.deletePost(req, res)

  expect(res.json).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.status).toHaveBeenCalledWith(403)
  expect(res.send).toHaveBeenCalledTimes(1)

  const postFromDb = await db.getPost(testPost.id)
  expect(postFromDb).toEqual(testPost)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=postsController&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
