let mongoose = require("mongoose");
let Obj = require('../app/models/object');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Objects', () => {
    let testObj1 = { mykey: "value1" };
    let testObj2 = { mykey: "value2" };
    before((done) => {
        Obj.deleteMany({}, (err) => {
            done();
        });
    });
    describe('/POST /object', () => {
        it('it should POST a key-value object and return the object with a timestamp', (done) => {
            chai.request(server)
                .post('/object')
                .send( testObj1 )
                .end((err, res) => {
                    console.log(res.text)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('key').eql( Object.keys(testObj1)[0] );
                    res.body.should.have.property('value').eql( Object.values(testObj1)[0] );
                    res.body.should.have.property('timestamp');
                    done();
                });
        });
    });
    describe('/GET /object/' + Object.keys(testObj1)[0], () => {
        it('it should GET value of object by given key', (done) => {
            chai.request(server)
                .get('/object/'+ Object.keys(testObj1)[0])
                .end((err,res)=>{
                    console.log(res.text)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('value').eql( Object.values(testObj1)[0] );
                    done()
                })
        });
    });
    describe('/POST /object', () => {
        it('it should POST update the key with the new value and return the object with current timestamp', (done) => {
            chai.request(server)
                .post('/object')
                .send( testObj2 )
                .end((err, res) => {
                    console.log(res.text)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('key').eql( Object.keys(testObj2)[0] );
                    res.body.should.have.property('value').eql( Object.values(testObj2)[0] );
                    res.body.should.have.property('timestamp');
                    done();
                });
        });
    });
    describe('/GET /object/' + Object.keys(testObj2)[0], () => {
        it('it should GET the new value of the key', (done) => {
            chai.request(server)
                .get('/object/'+ Object.keys(testObj2)[0])
                .end((err,res)=>{
                    console.log(res.text)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('value').eql( Object.values(testObj2)[0] );
                    done()
                })
        });
    });
})