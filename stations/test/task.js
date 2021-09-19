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
        it("It should get all the tasks", (done)=>{
            chai.request(server)
            .get("/api/stations")
            .end((err,response)=>{
                response.should.have.status(201);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(16);
            done();
            })
        })
    })
})