const express = require('express');
const router = express.Router();
const db = require("../db");
const fs = require('fs');
const Json2csvParser = require("json2csv").Parser;
const json2csvParser = new Json2csvParser({ header: true });

router.get('/', async function (req, res, next) {

    let rows = (await db.query('SELECT * FROM klub natural join igrač')).rows;

    fs.writeFile("./public/data/jsonfilter.json", JSON.stringify(rows), function(err) {
        if (err) throw err;
    });

    const csv = json2csvParser.parse(rows);
    fs.writeFile("./public/data/csvfilter.csv", csv, function(err) {
        if (err) throw err;
    });
    
    res.render('datatable', {
        rows: rows
    });
});

router.post('/', async function (req, res, next) {
    let search = req.body.search;
    let attribute = req.body.attribute;
    let rows;
    
    if (attribute == "wildcard") {
        rows = (await db.query('SELECT * FROM klub natural join igrač WHERE UPPER(public.klub.nazivkluba) LIKE \'%' + search.toUpperCase() + '%\'' +
        'OR UPPER(public.klub.godinaosnutka::text) LIKE \'%' + search.toUpperCase() + '%\'' +
        'OR UPPER(public.klub.adresa) LIKE \'%' + search.toUpperCase() + '%\'' +
        'OR UPPER(public.klub.email) LIKE \'%' + search.toUpperCase() + '%\'' +
        'OR UPPER(public.klub.url_stranice) LIKE \'%' + search.toUpperCase() + '%\'' +
        'OR UPPER(public.igrač.ime) LIKE \'%' + search.toUpperCase() + '%\'' +
        'OR UPPER(public.igrač.prezime) LIKE \'%' + search.toUpperCase() + '%\'' +
        'OR UPPER(public.igrač.dob::text) LIKE \'%' + search.toUpperCase() + '%\'' +
        'OR UPPER(public.igrač.visina::text) LIKE \'%' + search.toUpperCase() + '%\'' +
        'OR UPPER(public.igrač.brojdresa::text) LIKE \'%' + search.toUpperCase() + '%\' ;' )).rows;


    } else if (attribute == "nazivkluba") {
        rows = (await db.query('SELECT * FROM klub natural join igrač WHERE UPPER(klub.nazivkluba) LIKE \'%' + search.toUpperCase() + '%\';')).rows;
                
    } else if (attribute == "godinaosnutka") {
        rows = (await db.query('SELECT * FROM klub natural join igrač WHERE UPPER(klub.godinaosnutka::text) LIKE \'%' + search + '%\';')).rows;

    }

    let datatable = "";
    for (let row of rows) {
        datatable += "<tr>";
        datatable += "<td>";
        datatable += new String(row.nazivkluba);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.godinaosnutka);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.imedvorane);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.adresa);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.email);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.url_stranice);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.ime);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.prezime);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.visina);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.dob);
        datatable += "</td>";
        datatable += "<td>";
        datatable += new String(row.brojdresa);
        datatable += "</td>";
    }

    fs.writeFile("./public/data/jsonfilter.json", JSON.stringify(rows), function(err) {
        if (err) throw err;
    });

    const csv = json2csvParser.parse(rows);
    fs.writeFile("./public/data/csvfilter.csv", csv, function(err) {
        if (err) throw err;
    });

    res.send(
        {
            response: new String(datatable), 
        }
    );
});

module.exports = router;