const express = require("express");
const cors = require("cors");
const sequelize = require("./config");
const Fun = require('./model/fun')
const app = express();
app.use(cors());
app.use(express.json());
const port = 2756;


app.post('/api/SaveRequest', (req, res) => {
    console.log(req.body);
    try {
        const funData = req.body;
        const saveddata = Fun.create(funData);
        res.send(saveddata);

    } catch (error) {
     console.log(error)
    }
})


sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error syncing Sequelize models:", error);
    });
