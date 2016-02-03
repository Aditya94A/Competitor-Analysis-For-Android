var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    scraper = require('./scraper.js'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/competitor-analysis-json', function (req, res) {
    var jsonCallBack = function (packageData, identifier) {
        res.send(JSON.stringify(packageData));
    };
    getAppJSONData(req.query.packageNames, jsonCallBack, 'json');
});

//socket
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('join', function (GUID) {
        socket.join(GUID); // We are using room of socket io
    });

    socket.on('compare-apps', function (GUID, myPackage, enemyPackages) {
        var CompetitorAnalysisData = {
            myPackageData: "",
            enemyPackageData: []
        };
        console.log(enemyPackages);
        var numberOfApps = 1 + enemyPackages.length;
        console.log(numberOfApps + 'number');
        var numberOfAppsScraped = 0;
        var callback = function (packageData, identifier) {
            numberOfAppsScraped += 1;
            console.log("GOT DATA \n" + numberOfAppsScraped + "app name:" + packageData.title);
            if (identifier == 'myPackage') {
                CompetitorAnalysisData.myPackageData = packageData;
            }
            else if (identifier == 'enemyPackage')
                CompetitorAnalysisData.enemyPackageData.push(packageData);
            if (numberOfAppsScraped == numberOfApps) {
                io.sockets.in(GUID).emit('Done-Processing-Now-Display-Data', CompetitorAnalysisData);
                console.log('data sent to client' + JSON.stringify(CompetitorAnalysisData));
            }

        };
        console.log("requesting data");
        getAppJSONData(myPackage, callback, 'myPackage');
        for (var i = 0; i < enemyPackages.length; i++)
            getAppJSONData(enemyPackages[i], callback, 'enemyPackage');
        //    getAppJSONData(enemyPackages[1], callback, 'enemyPackage');
    });
});

http.listen(26000, function () {
    console.log('listening on *:26000');
});

function getAppJSONData(packageName, callback, identifier) {
    url = 'http://play.google.com/store/apps/details?id=' + packageName;
    request(url, function (error, response, html) {
        if (!error) {
            var appData = scraper.getAppData(cheerio.load(html));
            callback(appData, identifier);
        }
        else
            console.log(error);
    });
}


