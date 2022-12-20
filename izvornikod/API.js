const http = require ('http');
const db = require("./db");
const url = require('url');

http.createServer(async (req,res)=>{
    const urlData = url.parse(req.url, true)

    if (req.method == 'GET') {
        if(req.url == "/getData") {
            const rows = (await db.query('SELECT * FROM klub natural join igrač')).rows;
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.write(JSON.stringify(rows));
            res.end();
            return;
        }
        if(req.url == "/getData?nazivkluba=" + urlData.query.nazivkluba) {
            const rows = (await db.query('SELECT * FROM klub natural join igrač WHERE UPPER(klub.nazivkluba) LIKE \'%' + urlData.query.nazivkluba.toUpperCase() + '%\';')).rows;
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.write(JSON.stringify(rows));
            res.end();
            return;
        }
        if(req.url == "/getData?imedvorane=" + urlData.query.imedvorane) {
            const rows = JSON.stringify(db.query('SELECT * FROM klub natural join igrač WHERE UPPER(klub.imedvorane) LIKE \'%' + urlData.query.imedvorane.toUpperCase() + '%\';')).rows
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.write(JSON.stringify(rows));
            res.end();
            return;
        }
        if(req.url == "/getData?adresa=" + urlData.query.adresa) {
            const rows = JSON.stringify(db.query('SELECT * FROM klub natural join igrač WHERE UPPER(klub.adresa) LIKE \'%' + urlData.query.adresa.toUpperCase() + '%\';')).rows
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.write(JSON.stringify(rows));
            res.end();
            return;
        }
    }

    if (req.method == 'POST'){
        if(req.url == "/insertData") {
            const data = req.body;
            //{"nazivkluba" : "junak", "godinaosnutka":"1999","imedvorane":"ime1","adresa":"adresa1","email":"email1","url_stranice":"url1"}
            res.writeHead(200,{'Content-Type': 'application/json'});
            db.query("INSERT INTO klub (" + req.body.nazivkluba + ","+ req.body.godinaosnutka + ","+ req.body.imedvorane + ","+ req.body.adresa + ","+ req.body.email + ","+ req.body.url_stranice +")",data,(err,result) => {
                if(err){
                    res.write('Error');
                }else{
                    res.write(result);
                }
            })       
            res.end();
            return;
        }
    }

    if (req.method == 'PUT'){
        
    }

    if (req.method == 'DELETE'){
        
    }

    res.end();
}).listen(3000);