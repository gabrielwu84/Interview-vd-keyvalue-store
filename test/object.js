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
    let testObj3 = { anotherkey: "value2" };
    before((done) => {
        Obj.deleteMany({}, (err) => {
            done();
        });
    });
    // happy flow as specified in test document
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
                    timestamp1 = JSON.parse(res.text)["timestamp"]
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
                    timestamp2 = JSON.parse(res.text)["timestamp"]
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
    describe('/GET with timestamp of first POST', () => {
        it('it should return the value of the first object', (done) => {
            chai.request(server)
                .get('/object/' + Object.keys(testObj1)[0]+"?timestamp="+(parseInt(timestamp1)+2))
                .end((err,res)=>{
                    console.log(res.text)
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('value').eql( Object.values(testObj1)[0] );
                    done()                
                })
        });
    });

    // further edge cases
    describe('/GET with timestamp before first POST', () => {
        // will break if "before deleteMany" not run 
        it("it should return 'key not found'", (done) => {
            chai.request(server)
                .get('/object/' + Object.keys(testObj1)[0]+"?timestamp="+(parseInt(timestamp1)-5))
                .end((err,res)=>{
                    console.log(res.text)
                    res.should.have.status(405);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(Object.keys(testObj1)[0]+" not found");
                    done()                
                })
        });
    });
    describe('/GET an unknown key', () => {
        // will break if "before deleteMany" not run 
        it("it should return 'key not found'", (done) => {
            chai.request(server)
                .get('/object/' + Object.keys(testObj3)[0])
                .end((err,res)=>{
                    console.log(res.text)
                    res.should.have.status(405);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql(Object.keys(testObj3)[0]+" not found");
                    done()                
                })
        });
    });
})