const _ = require('lodash')
const express = require('express')
const app = express()

app.use(express.json())

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
}

app.listen(3000, () => console.log('Example app listening on port 3000'))