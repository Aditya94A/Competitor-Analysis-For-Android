var socket = io(); //initialize socket

//Todo Redo socket logic - This could be a lot simpler.
//It is unneccesary to create GUID manually. Just use socket.id at the server to uniquely identify a client.
var GUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

//Create a unique 'room' for this client. The server and client will interact in the room identified by GUID
socket.emit('join', GUID);

//Called by the input form submit button to begin competitor-analysis
function emitCompareEvent(myPackage, enemyPackages) {
    socket.emit('compare-apps', GUID, myPackage, enemyPackages);
}

//All is well, display the table.
socket.on('Done-Processing-Now-Display-Data', function (CompetitorAnalysisData) {
    //console.log(JSON.stringify(CompetitorAnalysisData.myPackageData) + 'recieved on client' +
    //    JSON.stringify(CompetitorAnalysisData.enemyPackageData[0]));
    var dataForTable = [CompetitorAnalysisData.myPackageData];
    for (var i = 0; i < CompetitorAnalysisData.enemyPackageData.length; i++) {
        dataForTable[i + 1] = CompetitorAnalysisData.enemyPackageData[i];
    }
    drawTable(dataForTable);
});
























