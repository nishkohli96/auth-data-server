
const express = require('express');
const router = express.Router();
const mongoFunctions = require('../mongo/author-crud');

let result;

router.get('/authors', async function (req,res) {
    result = await mongoFunctions.connectToDB();
    res.send(result);
    res.end();
});

router.post('/addauthor',async function(req,res) {
    result = await mongoFunctions.addAuthor(req.body); 
    res.send( (result.insertedCount >= 1)? 'Record Inserted' : 'Insertion Failed' );
    res.end();
});

router.get('/getauthor',async function(req,res) {
    result = await mongoFunctions.getAuthor(req.body.srchText); 
    res.send((result === null) ? 'No Record Found' : result );
    res.end();
});

router.put('/editauthor',async function(req,res) {
    result = await mongoFunctions.editAuthor(req.body); 
    res.send((result.modifiedCount >= 1)? 'Record Updated' : 'Update Failed' );
    res.end();
});

router.delete('/deleteauthor',async function(req,res) {
    result = await mongoFunctions.deleteAuthor(req.body.name);
    res.send( (result.deletedCount >= 1)? 'Record Deleted' : 'Delete Failed' );
    res.end();
});

module.exports =  router;