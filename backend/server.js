const app = require('./app')
const port = process.config.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})