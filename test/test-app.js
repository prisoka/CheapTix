process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

// beforeEach(done => {
//   Promise.all([
//     knex('users').insert({user_type: 'business', email: 'pete@gmail.com', username: 'pete', password: '1234'}),
//     knex('users').insert({user_type: 'customer', email: 'justin@gmail.com', username: 'justin', password: '5678'})
//   ])
//   .then(() => done())
//   .catch((err)=>{
//     console.log(err)
//   })
// });
//
// afterEach((done) => {
//   knex('users')
//   .del()
//   .then(() => {
//     return done()
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

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
        expect(res.body).to.equal([{
          id: 1,
          user_type: 'business',
          email: 'pete@gmail.com',
          username: 'pete',
          password: '1234'
          //created_at: 2018-07-03 20:02:52.276169-07,
          //updated_at: '2018-07-03 20:02:52.276169-07'
        }, {
          id: 2,
          user_type: 'customer',
          email: 'justin@gmail.com',
          username: 'justin',
          password: '5678',
          //create_at: '2018-07-03 20:02:52.276169-07',
          //updated_at:'2018-07-03 20:02:52.276169-07'
        }]);
        done();
      });
  });
});

xdescribe('GET /users/:id', () => {
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

  var newUser = {
    user: {
      user_type: 'business',
      email: 'colton@gmail.com',
      username: 'colton',
      password: '4444'
    }
  };

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
        knex('users').select().then(users => {
          //expect(users).to.have.lengthOf(4);
          //expect(users).to.deep.include(new.user);
          done();
        });
      });
  });

});

xdescribe('PUT /users/:id', () => {
});

xdescribe('DELETE /users/:id', () => {
});
