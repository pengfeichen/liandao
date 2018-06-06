const WebSocket = require('ws');

//Load Ticker model
const Ticker = require('./models/Ticker');

const ws = new WebSocket('wss://ws-feed.gdax.com');

const sendData = {
  type: "subscribe",
  product_ids: [
      "BTC-USD"
  ],
  channels: [
      "ticker"
  ]
}

ws.on('open', function open() {
  console.log(JSON.stringify(sendData))
  ws.send(JSON.stringify(sendData));
})

module.exports = getTicker = ws.on('message', function incoming(rawData) {
  const data = JSON.parse(rawData)
  if(data.type === 'ticker' && data.trade_id) {
    const { sequence, product_id, price, open_24h, volume_24h, low_24h, high_24h, volume_30d, best_bid, best_ask, side, time, trade_id, last_size} = data
    console.log(time)
    console.log(Date.parse(time))
    const newTicker = new Ticker({
      sequence,
      product_id,
      price: Number(price),
      open_24h: Number(open_24h),
      volume_24h: Number(volume_24h),
      low_24h: Number(low_24h),
      high_24h: Number(high_24h),
      volume_30d: Number(volume_30d),
      best_bid: Number(best_bid),
      best_ask: Number(best_ask),
      side,
      time: Date.parse(time),
      trade_id,
      last_size: Number(last_size)
    })
    newTicker.save().then(ticker => {
      console.log(`SAVED: TICKER_TRADE_ID ${trade_id}`)
    })
    .catch(e => console.log(e));
  }
});





