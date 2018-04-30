var client = algoliasearch('VLHF4D89XB', '08e6eb68c2d735ba4e59344d2f975eeb');
var index = client.initIndex('upcat_passers');

index.search('bs computer science', function (err, content) {
    console.log(content.hits);
});