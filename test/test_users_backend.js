process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

beforeEach(done => {
  Promise.all([
    knex('users').insert({id:1, user_type: 'business', email: 'pete@gmail.com', username: 'pete', password: '1234'}),
    knex('users').insert({id:2, user_type: 'customer', email: 'justin@gmail.com', username: 'justin', password: '5678'})
  ])
  .then(() => done())
  .catch((err)=>{
    console.log(err)
  })
});

// GET ALL
describe('GET /users', () => {
    it('responds with JSON', done => {
        request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('returns an array of all users objects when responding with JSON', done => {
    request(app)
      .get('/users')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{
          id: 1,
          user_type: 'business',
          email: 'pete@gmail.com',
          username: 'pete',
          password: '1234'
        }, {
          id: 2,
          user_type: 'customer',
          email: 'justin@gmail.com',
          username: 'justin',
          password: '5678'
        }]);
        done();
      });
  });
});

// GET ONE
describe('GET /users/:id', () => {
  it('responds with JSON', done => {
      request(app)
          .get('/users')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });

  it('the server returns data on the users with the given id', done => {
  request(app)
    .get('/users/1')
    .end((err, res) => {
      expect(res.body).to.deep.equal([{
        id: 1,
        user_type: 'business',
        email: 'pete@gmail.com',
        username: 'pete',
        password: '1234'
      }]);
      done();
    });
  });
});

afterEach((done) => {
  knex('users')
  .del()
  .then(() => {
    return done()
  })
  .catch((err) => {
    console.log(err)
  })
});

describe('POST /users', () => {

  let newUser = {
    user_type: 'business',
    email: 'colton@gmail.com',
    username: 'colton',
    password: '4444'
  }

  it('responds with JSON', done => {
    request(app)
      .post('/users')
      .type('form')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('adds the new user to the database', done => {
    request(app)
      .post('/user')
      .type('form')
      .send(newUser)
      .end((err, res) => {
        knex('users')
        .select()
        .then(users => {
          done();
        });
      });
  });
});

// update one
describe('PUT /users/:id', () => {

  var updatedUser = {
    user_type: 'business',
    email: 'pete@gmail.com',
    username: 'pete_pete',
    password: '1234'
  };

  it('responds with JSON', done => {
    request(app)
      .put('/users/1')
      .type('form')
      .send(updatedUser)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('updates the user in the database', done => {
    request(app)
      .put('/users/1')
      .type('form')
      .send(updatedUser)
      .end((err, res) => {
        knex('users').where('id', 1).first().then(user => {
          expect(user.user_type).to.equal(updatedUser.user_type);
          expect(user.email).to.equal(updatedUser.email);
          expect(user.username).to.equal(updatedUser.username);
          expect(user.password).to.equal(updatedUser.password);
          done();
        });
      });
  });
});

// delete one
describe('Delete /users/:id', () => {
  it('should return status 200 after DELETING given id', done => {
      request(app)
          .get('/users/1')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});
