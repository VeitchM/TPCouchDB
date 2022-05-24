const db = new PouchDB("couchdb");
const remote = new PouchDB("http://admin:admin@172.19.0.2:5984/couchdb");
db.sync(remote, {
    live: true, // mantiene conexión abierta
    retry: true // si se cae la conexión vuelve a intentar conectarse
   }).on('change', function (change) {
    console.log('data change', change)
   }).on('error', function (err) {
    console.log('sync error', err)
   })

$("#add").submit(function(e) {
    e.preventDefault();
    db.post(JSON.parse(e.target.document.value));
});

db.allDocs({ include_docs: true })
.then((docs) => {
    console.log(docs)
    for (row of docs.rows) {
        $("#documents").append(`<li>${JSON.stringify(row.doc)}</li>`)
    }
});

let controlAutomatic = false;

function automatic() {
    console.log("automatic");
    // TODO: do something with db
    if (controlAutomatic) {
        setTimeout(automatic, 1000);
    }
}

$("#automatic").change(function () {
    if ($("#automatic").is(":checked")) {
        controlAutomatic = true;
        automatic();
    } else {
        controlAutomatic = false;
    }
})