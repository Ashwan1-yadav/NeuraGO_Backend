const http = require("http")
const app = require("./app")
const { initSocket } = require("./utilities/socket")

const server = http.createServer(app)
const port = process.env.PORT || 3000

initSocket(server);

server.listen(port,()=>{
    console.log(`Server started`)
})
