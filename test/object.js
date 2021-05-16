let mongoose = require("mongoose");
let Obj = require('../app/models/object');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Objects', () => {
    describe('/POST /object', () => {
        it('it should return status 200', (done) => {
            chai.request(server)
                .post('/object')
                .send( { mykey: "value1" } )
                .end((err, res) => {
                    console.log(res.text)
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('/GET /object/', () => {
        it('it should return status 200', (done) => {
            chai.request(server)
                .get('/object/mykey')
                .end((err,res)=>{
                    console.log(res.text)
                    res.should.have.status(200);
                    done()                
                })
        });
    });
})