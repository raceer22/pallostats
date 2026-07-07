const app = require('./app')
const config = require('config')

const port = config.get("server.port")

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})