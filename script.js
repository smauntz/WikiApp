function fetch(query) {
  return $.ajax({
    url: '//en.wikipedia.org/w/api.php',
    data: { action: 'query', list: 'search', srsearch: query, format: 'json' },
    dataType: 'jsonp',
  });
}
$(".searchbox").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
});
function print(results) {
  var $articles = $("articles");
  var html = results.map(function(result) {
    return '<a class="result"' +'   href="https://en.wikipedia.org/wiki/'+result.title+'">' +'<h2>'+result.title+'</h2>' +
'<div>'+result.snippet+'</div>'+'</a><hr>';
  }).join("\n");
  $articles.html("");
  $(html).appendTo($articles);
}
$("#wikis").click(function() {
  $( ".result" ).effect( "shake" );
});
$("#searchWiki").on("submit", function(event) {
  event.preventDefault();
  var query = $("#searchquery").val();
  fetch(query)
    .done(function(data) {
      console.log(data);
      print(data.query.search);
    });
});