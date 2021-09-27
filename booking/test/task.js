const chai = require('chai')
const server = require("../app")
let chaiHttp = require('chai-http')

// assertion style
chai.should();

// can call API using HTTP protocol
chai.use(chaiHttp)

describe('Tasks API', ()=>{
    // test the GET ROUTE,
    describe("GET /api/booking", ()=>{
        it("It should GET all the stations", (done)=>{
            chai.request(server)
            .get("/api/booking")
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(91);
            done();
            })
        })

        it("It should NOT GET all the booking", (done)=>{
            chai.request(server)
            .get("/api/bookings")
            .end((err,response)=>{
                response.should.have.status(404);
            done();
            })
        })
        
        it("It should GET by PNR", (done)=>{
            const PNR = "hcWM1Z"
            chai.request(server)
            .get("/api/booking/"+PNR)
            .end((err,response)=>{
                response.should.have.status(200);
                response.should.be.a('object');
            done();
            })
        })
        it("It should NOT GET by PNR", (done)=>{
            const ID = "614"
            chai.request(server)
            .get("/api/station/"+ID)
            .end((err,response)=>{
                response.should.have.status(404);
            done();
            })
        })
    })
    describe("POST /api/booking", ()=>{
        it("It should NOT POST without stationName", (done)=>{
            const task = {
                "fullName": "",
                "email": "false",
                "trainName": "SECUNDERABAD - MUMBAI CSMT Devagiri Special\t",
                "start": "Mumbai Central - BCT",
                "destination": "Secundrabad JN",
                "tier": "AC-1",
                "date": "06-22-2021",
                "adhaar": "7796633850",
                "gender": "female",
                "cvv": "no",
                "pnr": "hcWM1Z",
            }
            chai.request(server)
            .post("/api/booking")
            .send(task)
            .end((err,response)=>{
                response.should.have.status(404);
                response.text.should.be.eq('{"err":{"errors":{"fullName":{"name":"ValidatorError","message":"Please enter a name","properties":{"message":"Please enter a name","type":"required","path":"fullName","value":""},"kind":"required","path":"fullName","value":""}},"_message":"passenger validation failed","name":"ValidationError","message":"passenger validation failed: fullName: Please enter a name"}}')
            done();
            })
        })
    })
})