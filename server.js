const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extened: true }))
app.use(express.static('./client'))

require('./routes/clientRoutes')(app)
require('./routes/apiRoutes')(app)

app.listen(PORT, () => {
  console.log('Listening on: https://localhost:' + PORT)
})
