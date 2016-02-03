$("#login-button").click(function (event) {
    event.preventDefault();

    $('form').fadeOut(500);
    $('.wrapper').addClass('form-success');
});


//custom
var alreadyShowedExample = false;
$(document).ready(function () {
    var seeExample = $('#seeExample');
    setTimeout(function () {
        if (alreadyShowedExample)
            return;
        seeExample.addClass('hithere');
        setTimeout(function () {
            seeExample.removeClass('hithere');
        }, 1000);
    }, 3000);

});
var emptyField = null;
var $loadingCircle = $('#loadingCircle');
function compare() {
    if (emptyField != null) //clear already running animations
    {
        emptyField.removeClass('shake');
        emptyField = null;
    }
    if ($('#myPackage').val().length == 0)
        emptyField = $('#myPackage');
    else if ($('#enemyPackage').val().length == 0)
        emptyField = $('#enemyPackage');
    else {
        $loadingCircle.removeClass('hidden');
        $loadingCircle.addClass('loading-quarter-circle');
        //emit compare event to server
        emitCompareEvent($('#myPackage').val(), $('#enemyPackage').val().split(','));
        $('#compareButton').prop("disabled", true);
        return;
    }
    emptyField.addClass('shake');
    setTimeout(function () {
        emptyField.removeClass('shake');
    }, 1000);
}


var animationRunning = false;
function showExample() {
    if (!alreadyShowedExample)
        alreadyShowedExample = true;
    if (animationRunning)
        return;
    animationRunning = true;
    $('#myPackage').val('com.android.chrome');
    $('#enemyPackage').val('org.mozilla.firefox');
    $('#compareButton').addClass('hithere');
    setTimeout(function () {
        $('#compareButton').removeClass('hithere');
        animationRunning = false;
    }, 1000);
}


/*------------------------TABLE-------------------------------*/
function drawTable(data) {
    $('form').addClass('invisible');
    $('#dataTable').removeClass('invisible');
    $('#goBack').removeClass('invisible');
    //disable loading circle
    $loadingCircle.addClass('hidden');
    $loadingCircle.removeClass('loading-quarter-circle');
    $('#compareButton').prop("disabled", false);
    clearTable();
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
    transposeTable();
}

function goBack() {
    $('form').removeClass('invisible');
    $('#dataTable').addClass('invisible');
    $('#goBack').addClass('invisible');
}

function clearTable() {
    $('#dataTable').empty();
    var row = $("<tr />");
    $("#dataTable").append(row);
    row.append($("<td>App Name</td>"));
    row.append($("<td>Developer</td>"));
    row.append($("<td>Category</td>"));
    row.append($("<td>Downloads</td>"));
    row.append($("<td>Rating</td>"));
    row.append($("<td>Reviews</td>"));
    row.append($("<td>Content Rating</td>"));
    row.append($("<td>App Size</td>"));
    row.append($("<td>Min. Version</td>"));
    row.append($("<td>Last Updated</td>"));
    row.append($("<td>Search Links</td>"));
}
function drawRow(rowData) {
    var row = $("<tr />");
    $("#dataTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.title + "</td>"));
    row.append($("<td>" + rowData.developer + "</td>"));
    row.append($("<td>" + rowData.category + "</td>"));
    row.append($("<td>" + rowData.downloads + "</td>"));
    row.append($("<td>" + rowData.rating + "</td>"));
    row.append($("<td>" + rowData.reviews + "</td>"));
    row.append($("<td>" + rowData.contentRating + "</td>"));
    row.append($("<td>" + rowData.size + "</td>"));
    row.append($("<td>" + rowData.minAPI + "</td>"));
    row.append($("<td>" + rowData.lastUpdated + "</td>"));
    row.append($("<td>" + rowData.searchLinks + "</td>"));
}

function transposeTable() {
    $("#dataTable").each(function () {
        var $this = $(this);
        var newrows = [];
        var j = 0;
        $this.find("tr").each(function () {
            j++;
            var i = 0;
            $(this).find("td").each(function () {
                i++;
                if (newrows[i] === undefined) {
                    newrows[i] = $("<tr></tr>");
                }
                newrows[i].append($(this));
            });
        });

        $this.find("tr").remove();
        $.each(newrows, function () {
            $this.append(this);
        });
    });
}
/*------------------------TABLE-------------------------------*/