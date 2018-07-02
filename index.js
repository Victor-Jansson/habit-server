const _ = require('lodash')
const express = require('express')
const app = express()
const morgan = require('morgan')
const fs = require('fs');
const log = require('simple-node-logger').createSimpleLogger();
const cors = require('cors')

app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

app.get('/track', (req, res) => {
    res.send(store)
})
app.post('/track', (req, res) => {
    const cookieId = _.get(req, 'body.cookieId', null)
    const type = _.get(req ,'body.type', null)

    if (cookieId && type) {
        saveTracking(cookieId, type)
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }

})

const store = {}
function saveTracking(cookieId, type) {
    key = store[cookieId]

    if (_.isArray(key)) {
        key.push({type: type, timestamp: new Date()})
    } else {
        key = [{type: type, timestamp: new Date()}]
        store[cookieId] = key
    }
    var json = JSON.stringify(store);
    try {
        fs.writeFile('store.json', json, 'utf8', ()=> {
            log.info('store.json updated')
        });
    } catch(error) {
        log.error(error)
    }
}

app.listen(3000, () => log.info('Example app listening on port 3000'))