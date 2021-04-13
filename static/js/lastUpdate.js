const url = "https://data.police.uk/api/crime-last-updated";

var data;
let responce = fetch(url)
    .then(res => res.json())
    .then(data => document.getElementById("demo").innerHTML = "Last Updated: " + data.date)