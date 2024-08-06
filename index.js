var WebSocketServer = require("ws").Server,
    express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app);
const mongoose = require('mongoose');
var cors = require('cors');

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const restaurantList = require('./restaurantInfo');
const orderList = require('./orderTabel');
let uri = `mongodb+srv://Pooprav:8igvJKHVlWNlhk5g@poopravcluster0.clos40k.mongodb.net/rpesanddips?retryWrites=true&w=majority&appName=poopravCluster0`;
mongoose.connect(uri).then(() => {
    console.log("connected");
})

const updateMasterData = async (order, res) => {
    await orderList.exists({ orderId: order['orderId'] }).then((isExists) => {
        if (isExists === null) {
            orderList.create(order).then((data) => {
                res.send(data);
            });
        } else {
            orderList.updateMany({ "orderId": order[orderId] }, order).then((data) => {
                res.send(data);
            });
        }
    })
}
app.post('/orderupdate', async function (req, res) {
    console.log(req)
    let { order } = req.body;
    await updateMasterData(order, res);
    //res.end();
});

app.get("/restaurantList", async (req, res) => {
    restaurantList.find().then((data) => {
        console.log(data)
        res.send(data);
    });
})
app.get("/currentOrders", async (req, res) => {
    orderList.find().then((data) => {
        console.log(data)
        res.send(data);
    });
})
app.use(cors())
server.listen(8000);

const wss = new WebSocketServer({ server: server, path: "/orderStatus" });

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