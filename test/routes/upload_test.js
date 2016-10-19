import _ from 'lodash'
import chai from 'chai'
let expect = chai.expect

chai.use(require('sinon-chai'))
import request from 'request-promise'

process.env.TEST = 1
process.env.MONGODB_URI = 'mongodb://localhost:27017/test'
const db = require('monk')(process.env.MONGODB_URI)
const games = db.get('games')

describe('POST /upload', function () {
  var server = require('../../server')
  var baseUrl = 'http://localhost:3001'
  var url = `${baseUrl}/upload`

  var game1 = {
    week: 1,
    teams: {
      'Team1': [
        'Jill',
        'Bob'
      ],
      'Team2': [
        'Mike',
        'Jane'
      ]
    },
    events: [
      'Pull\tMike',
      'Direction\t>>>>>>',
      'Direction\t<<<<<<\tDrop\tJill\tPass\tBob',
      'Direction\t>>>>>>\tPOINT\tMike\tPass\tJane',
      'O-\tJill\tD+\tMike',
      'O-\tBob\tD+\tJane'
    ]
  }

  var game2 = {
    week: 1,
    teams: {
      Team1: [
        'Meg',
        'Bill'
      ],
      Team2: [
        'Joe'
      ]
    },
    events: [
      'Pull\tJoe',
      'Direction\t>>>>>>',
      'Direction\t<<<<<<\tDrop\tMeg\tPass\tBill',
      'Direction\t>>>>>>\tPOINT\tJoe\tPass\tJulie',
      'O-\tMeg\tD+\tJoe',
      'O-\tBill\tD+\tJulie'
    ]
  }

  before(function () {
    server.listen(3001)
  })

  afterEach(function () {
    games.drop()
  })

  after(function () {
    server.close()
  })

  it('returns status code 201', async function () {
    let response = await request.post({
      url: url,
      body: game1,
      json: true,
      resolveWithFullResponse: true
    })

    expect(response.statusCode).to.equal(201)
  })

  it('calculates the stats', async function () {
    let game = await request.post({url: url, json: true, body: game1})
    let stats = game.stats

    expect(stats['Mike']['Pulls']).to.equal(1)
    expect(stats['Mike']['Goals']).to.equal(1)
    expect(stats['Jill']['Drops']).to.equal(1)
  })

  it('calculates salary change', async function () {
    let game = await request.post({url: url, json: true, body: game1})
    let stats = game.stats

    expect(stats['Mike']['SalaryDelta']).to.equal(11000)
    expect(stats['Jill']['SalaryDelta']).to.equal(-5000)
  })

  it('adds the team to the stats', async function () {
    let game = await request.post({url: url, json: true, body: game1})
    let stats = game.stats

    expect(stats['Mike']['Team']).to.equal('Team2')
    expect(stats['Jill']['Team']).to.equal('Team1')
  })

  it('players not on the roster are given Substitute as their team', async function () {
    let game = await request.post({url: url, json: true, body: game2})
    let stats = game.stats

    expect(stats['Joe']['Team']).to.equal('Team2')
    expect(stats['Julie']['Team']).to.equal('Substitute')
  })

  it('saves the game to mongodb', async function () {
    await request.post({url: url, json: true, body: game1})

    let game = await games.findOne()
    let stats = game.stats

    expect(_.keys(stats).length).to.equal(4)
    expect(stats['Mike']['Pulls']).to.equal(1)
    expect(stats['Mike']['Goals']).to.equal(1)
    expect(stats['Jill']['Drops']).to.equal(1)
  })

  it('salary adds week to week', async function () {
    await request.post({url: url, json: true, body: game1})
    game1.week = 2
    await request.post({url: url, json: true, body: game1})

    let w1 = await request.get(`${baseUrl}/weeks/1`, { json: true })
    let w2 = await request.get(`${baseUrl}/weeks/2`, { json: true })

    expect(w1['stats']['Mike']['Salary']).to.equal(511000)
    expect(w2['stats']['Mike']['Salary']).to.equal(522000)
  })
})