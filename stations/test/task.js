const chai = require('chai')
const server = require("../app")
let chaiHttp = require('chai-http')
// assertion style
chai.should();

// can call API using HTTP protocol
chai.use(chaiHttp)

describe('Tasks API', ()=>{
    // test the GET ROUTE,
    describe("GET /api/stations", ()=>{
        it("It should GET all the stations", (done)=>{
            chai.request(server)
            .get("/api/stations")
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(16);
            done();
            })
        })
        it("It should NOT GET all the stations", (done)=>{
            chai.request(server)
            .get("/api/station")
            .end((err,response)=>{
                response.should.have.status(404);
            done();
            })
        })
        it("It should GET by ID", (done)=>{
            const ID = "6141bcafbc1c531074946b74"
            chai.request(server)
            .get("/api/stations/"+ID)
            .end((err,response)=>{
                response.should.have.status(200);
                response.should.be.a('object');
            done();
            })
        })
        it("It should NOT GET by ID", (done)=>{
            const ID = "614"
            chai.request(server)
            .get("/api/stations/"+ID)
            .end((err,response)=>{
                response.should.have.status(404);
            done();
            })
        })
        it("It should NOT POST without stationName", (done)=>{
            const task = {
                stationName:"AAAABBB"
            }
            chai.request(server)
            .post("/api/stations")
            .send(task)
            .end((err,response)=>{
                response.should.have.status(404);
                response.text.should.be.eq('{"errors":{"stationName":"","stationCode":"Station Code not entered"}}')
            done();
            })
        })
    })
})