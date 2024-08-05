var WebSocketServer = require("ws").Server,
    express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app);
const mongoose = require('mongoose');
var cors = require('cors');

const restaurantList  = require('./restaurantInfo');
let uri = `mongodb+srv://Pooprav:8igvJKHVlWNlhk5g@poopravcluster0.clos40k.mongodb.net/rpesanddips?retryWrites=true&w=majority&appName=poopravCluster0`;
mongoose.connect(uri).then(() => {
  console.log("connected");
})

app.get("/restaurantList", async (req, res) => {
    restaurantList.find().then((data) => {
      console.log(data)
      res.send(data);
    });
  })
app.use(cors())
server.listen(8000);

const wss = new WebSocketServer({server: server, path: "/orderStatus" });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
    
        if (client !== ws && client.readyState === 1) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});