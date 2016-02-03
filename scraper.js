module.exports = {

    getAppData: function ($) {
        var json = {
            title: "",
            developer: "",
            category: "",
            downloads: "",
            rating: "",
            reviews: "",
            contentRating: "",
            size: "",
            minAPI: "",
            lastUpdated: "",
            searchLinks: ""
        };

        //app name
        // Search .id-app-title
        $('.id-app-title').filter(function () {
            var data = $(this);
            json.title = data.text();
        });
        //developer name
        //Search <span itemprop="name">
        var developerName;
        var developerID;
        $('span[itemprop=name]')
            .filter(function () {
                var data = $(this);
                developerName = data.text();
            });
        $('a[class="document-subtitle primary"]')
            .filter(function () {
                var data = $(this);
                developerID = data.attr('href').split('?id=')[1];
            });
        json.developer = getHTMLlink(developerName, 'https://play.google.com/store/apps/developer?id=' + developerID);
        /*
         '<a href="https://play.google.com/store/apps/developer?id='
         + developerID + '">' +
         developerName + '</a>';*/
        //category
        //Search  itemprop="genre"
        $('span[itemprop=genre]')
            .filter(function () {
                var data = $(this);
                console.log("category" + data.text());
                json.category = data.text();
            });
        //downloads
        //Search itemprop="numDownloads"
        $('div[itemprop=numDownloads]')
            .filter(function () {
                var data = $(this);
                json.downloads = data.text();
            });
        //reviews
        //Search class="reviews-num"
        $('div[class=score]')
            .filter(function () {
                var data = $(this);
                json.rating = data.text();
            });
        //reviews
        //Search class="reviews-num"
        $('span[class=reviews-num]')
            .filter(function () {
                var data = $(this);
                json.reviews = data.text();
            });
        //content rating
        //Search itemprop="contentRating"
        $('div[itemprop=contentRating]')
            .filter(function () {
                var data = $(this);
                json.contentRating = data.text();
            });
        //size
        //Search itemprop="fileSize"
        $('div[itemprop=fileSize]')
            .filter(function () {
                var data = $(this);
                json.size = data.text();
            });
        //min API
        //Search itemprop="operatingSystems"
        $('div[itemprop=operatingSystems]')
            .filter(function () {
                var data = $(this);
                json.minAPI = data.text();
            });
        //last updated
        //Search itemprop="datePublished"
        $('div[itemprop=datePublished]')
            .filter(function () {
                var data = $(this);
                json.lastUpdated = data.text();
            });

        var appName = encodeURIComponent(json.title.trim());
        var devName = encodeURIComponent(developerName.trim());
        json.searchLinks = getHTMLlink('Google', 'https://www.google.com/search?q=' + appName + '%20' + devName)
            + ', ' + getHTMLlink('Youtube', 'https://www.youtube.com/results?search_query=' + appName)
            + ', ' + getHTMLlink('Twitter', 'https://twitter.com/search?q=' + appName);
        return json;
    }
};

function getHTMLlink(text, link) {
    return '<a href="' + link + '">' + text + '</a>';
}