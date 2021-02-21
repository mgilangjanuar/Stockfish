const express = require('express')
const { Stockfish } = require('./service/stockfish')

const app = express()

app.get('/ping', (_, res) => res.send({ pong: 1 }))

app.get('/api/bestmove', (req, res) => {
  if (!req.query.fen) {
    return res.send({
      error: 'Bad Request',
      code: 400
    })
  }
  return new Stockfish().run(req.query.fen, (bestmove, ponder) => {
    res.send({ bestmove, ponder })
  })
})

app.listen('8080', console.log('start at :8080...'))