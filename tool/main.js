const MockData = require("./lib/puppeteer");

async function main() {
    const express = require("express");
    const cors = require("cors");
    const ReadConfig = require("./config");
    /************************************************************/
    const config = await ReadConfig();
    console.log(config);
    const app = express();
    app.use(express.json());
    app.use(cors());
    /************************************************************/
    await MockData(config.link);

    app.listen(config.server.port, () => {
        console.log("server listen on " + config.server.port);
    })
}

main().catch(err => console.log(err));