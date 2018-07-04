process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

beforeEach(done => {
  Promise.all([
    knex('events').insert({id:1, user_id:1, event_type: 'Party', event_name: 'Summer Solstice Party', event_date: '2018/07/01', event_time: '01:30', available_tickets: 15,description: 'test'}),
    knex('events').insert({id:2, user_id:2, event_type: 'Movie', event_name: 'Avangers III', event_date: '2018/07/01', event_time: '01:30', available_tickets: 5,description: 'test'}),
    knex('events').insert({id:3, user_id:1, event_type: 'Exhibition', event_name: 'Picasso', event_date: '2018/07/01', event_time: '06:30', available_tickets: 10,description: 'test'})
  ])
  .then(() => done())
  .catch((err)=>{
    console.log(err)
  })
});

// GET ALL
describe('GET /events', () => {
    it('responds with JSON', done => {
        request(app)
            .get('/events')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('returns an array of all events objects when responding with JSON', done => {
    request(app)
      .get('/events')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{
          id: 1,
          user_id: 1,
          event_type: 'Party',
          event_name: 'Summer Solstice Party',
          available_tickets: 15,
          description: 'test'
        }, {
          id: 2,
          user_id: 2,
          event_type: 'Movie',
          event_name: 'Avangers III',
          available_tickets: 5,
          description: 'test'
        }, {
          id: 3,
          user_id: 1,
          event_type: 'Exhibition',
          event_name: 'Picasso',
          available_tickets: 10,
          description: 'test'
        }]);
        done();
      });
  });
});

// GET ONE
describe('GET /events/:id', () => {
  it('responds with JSON', done => {
      request(app)
          .get('/events')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });

  it('the server returns data on the events with the given id', done => {
  request(app)
    .get('/events/1')
    .end((err, res) => {
      expect(res.body).to.deep.equal([{
        id: 1,
        user_id: 1,
        event_type: 'Party',
        event_name: 'Summer Solstice Party',
        available_tickets: 15,
        description: 'test'
      }]);
      done();
    });
  });
});

afterEach((done) => {
  knex('events')
  .del()
  .then(() => {
    return done()
  })
  .catch((err) => {
    console.log(err)
  })
});

describe('POST /events', () => {

  let newEvent = {
    user_id: 2,
    event_type: 'Party',
    event_name: 'Summer Solstice Party 2',
    available_tickets: 30,
    description: 'test test tetst test test test'
  }

  it('responds with JSON', done => {
    request(app)
      .post('/events')
      .type('form')
      .send(newEvent)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('adds the new event to the database', done => {
    request(app)
      .post('/user')
      .type('form')
      .send(newEvent)
      .end((err, res) => {
        knex('events')
        .select()
        .then(events => {
          done();
        });
      });
  });
});

// update one
describe('PUT /events/:id', () => {

  var updateEvent = {
    id: 2,
    user_id: 2,
    event_type: 'Movie',
    event_name: 'Avangers V',
    available_tickets: 50,
    description: 'test'
  };

  it('responds with JSON', done => {
    request(app)
      .put('/events/2')
      .type('form')
      .send(updateEvent)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('updates the event in the database', done => {
    request(app)
      .put('/events/2')
      .type('form')
      .send(updateEvent)
      .end((err, res) => {
        knex('events').where('id', 2).first().then(event => {
          expect(event.user_id).to.equal(updateEvent.user_id);
          expect(event.event_type).to.equal(updateEvent.event_type);
          expect(event.event_name).to.equal(updateEvent.event_name);
          expect(event.available_tickets).to.equal(updateEvent.available_tickets);
          expect(event.description).to.equal(updateEvent.description);
          done();
        });
      });
  });
});

// delete one
describe('Delete /events/:id', () => {
  it('should return status 200 after DELETING given id', done => {
      request(app)
          .get('/events/3')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});
