process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

beforeEach(done => {
  Promise.all([
    knex('users').insert({user_type: 'business', email: 'pete@gmail.com', username: 'pete', password: '1234'}),
    knex('users').insert({user_type: 'customer', email: 'justin@gmail.com', username: 'justin', password: '5678'})
  ])
  .then(() => done())
  .catch((err)=>{
    console.log(err)
  })
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
})

xdescribe('GET /users', () => {
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
          user_type: 'business',
          email: 'pete@gmail.com',
          username: 'pete',
          password: '1234'
        }, {
          user_type: '',
          email: '',
          username: '',
          password: ''
        }]);
        done();
      });
  });
});

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
        user_type: 'business',
        email: 'pete@gmail.com',
        username: 'pete',
        password: '1234'
      }]);
      done();
    });
});
});

xdescribe('POST /users', () => {
});

xdescribe('PUT /users/:id', () => {
});

xdescribe('DELETE /users/:id', () => {
});
