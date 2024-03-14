const express = require('express')
const app = express()
const port = 3000
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

app.use(express.static("index.html"))
