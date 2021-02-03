/*!
 * 
 * Google Sheets To HTML v0.9b
 * 
 * To use, simply replace the "tq?key=" value in the
 * URL below with your own unique Google document ID
 * 
 * The Google document's sharing must be set to public
 * 
 */

google.charts.load('current', {packages: ['table']});
var visualization;

function drawVisualization() {
    //var query = new google.visualization.Query('https://docs.google.com/tq?key=1VI5-YacQoKISys2538DCT5zkqzLj8T6OwlXQ6DhvfX4&output=html&usp=sharing');
    //
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/14oq4vYSem8eqA0AyKrFEjcn6m_jxvQ_Wit-oXzT75Sc/gviz/tq?tqx=out:html&tq&');
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/14oq4vYSem8eqA0AyKrFEjcn6m_jxvQ_Wit-oXzT75Sc/gviz/tq?tqx=out:html&tq&');
    //query.setQuery('SELECT A, B, C, D label A "Duration", B "Song", C "Requested By", D "URL"');
    query.setQuery('SELECT A, B, C label A "Name", B "Score", C "Place"');
    query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
    if (response.isError()) {
        alert('There was a problem with your query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var data = response.getDataTable();
    visualization = new google.visualization.Table(document.getElementById('table'));
    visualization.draw(data, {
        allowHtml: true,
        legend: 'bottom',
    });
}
google.setOnLoadCallback(drawVisualization);
