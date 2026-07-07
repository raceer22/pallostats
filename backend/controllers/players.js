const playerRouter = require('express').Router()
const axios = require('axios')
const config = require('config')
const headers = require("../utils/headers")

const port = config.get("server.port")

playerRouter.get('/:id', async (req, res) => {
    const playerId = req.params.id
    const targetUrl = `https://spl.torneopal.net/taso/rest/getPlayer?player_id=${playerId}`

    try {
        const response = await axios.get(targetUrl, {
                headers: headers
        })
        res.json(response.data)
    } catch (error) {
        console.error('Error: ', error)
    }
})

module.exports = playerRouter