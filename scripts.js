$(document).ready(function() {
    var client = algoliasearch('VLHF4D89XB', '08e6eb68c2d735ba4e59344d2f975eeb');
    var index = client.initIndex('upcat_passers');

    var handle_submit = function (e) {
        var results = $('div#results');

        if (results.is('visible')) {
            results.slideUp(500);
        }

        results.empty();

        var searchBarText = $('input#searchBar').val();
        if (searchBarText !== '') {
            index.search(searchBarText, function (err, content) {
                content.hits.forEach(function (hit, index, arr) {
                    var names = hit.name.split('|');
                    var courses = hit.course.split('|');
                    var campuses = hit.campus.split('|');
    
                    names.forEach(function (item, index, arr) {
                        results.append(
                            '<div class="result">'
                            + '<h3>' + names[index] + '</h2>'
                            + '<h4><small>' + courses[index] + ' (' + campuses[index] + ')</small></h4>'
                            + '</div>'
                        );
                    });
                });
            });
        }

        results.slideDown(500);
    };

    $('button#searchButton').click(handle_submit);
    $('form#searchForm').submit(function (e) {
        e.preventDefault();
        handle_submit(e);
    });
});
