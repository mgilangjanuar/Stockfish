const { spawn } = require('child_process')

class Stockfish {
  run(fen, cb) {
    const sf = spawn(`${__dirname}/../../src/stockfish`,[])
    sf.stdout.setEncoding('utf8')
    sf.stdout.on('data', function(data) {
      console.log(data)
      const bestmove = data.split('\n').find(line => line && line.indexOf('bestmove') === 0)
      if (bestmove) {
        const [_, best, __, ponder] = bestmove.split(' ')
        cb(best, ponder)
        sf.kill()
      }
    })

    sf.stdin.write(`position fen ${fen}\n`)
    sf.stdin.write('go depth 15\n')
  }
}

module.exports = { Stockfish }