const chai = require('chai')
const server = require("../app")
let chaiHttp = require('chai-http')
// assertion style
chai.should();

// can call API using HTTP protocol
chai.use(chaiHttp)

describe('Tasks API', ()=>{
    // test the GET ROUTE,
    describe("GET /api/trains", ()=>{
        it("It should get all the tasks", (done)=>{
            chai.request(server)
            .get("/api/trains")
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(20);
            done();
            })
        })
        it("It should NOT GET all the Trains", (done)=>{
            chai.request(server)
            .get("/api/train")
            .end((err,response)=>{
                response.should.have.status(404);
            done();
            })
        })
        it("It should GET Train by ID", (done)=>{
            const ID = "61418d1bf60c513401bcfe13"
            chai.request(server)
            .get("/api/trains/"+ID)
            .end((err,response)=>{
                response.should.have.status(200);
                response.should.be.a('object');
            done();
            })
        })
        it("It should NOT GET by ID", (done)=>{
            const ID = "614"
            chai.request(server)
            .get("/api/trains/"+ID)
            .end((err,response)=>{
                response.should.have.status(404);
            done();
            })
        })
        
    })
    describe("POST /api/trains", ()=>{
        it("It should NOT POST without TravelTime", (done)=>{
            const task = {
                "trainName": "AA-BB EXPRESS",
                "trainNumber": 11005,
                "startStation": "AAAA JN",
                "destination": "BBBB JN",
                "arrivalTime": "21:30",
                "departureTime": "21:50",
            }
            chai.request(server)
            .post("/api/trains")
            .send(task)
            .end((err,response)=>{
                response.should.have.status(404);
                response.text.should.be.eq('{"errors":{"fullName":"","email":"","trainName":"","start":"","destination":"","date":"Please enter a TravelTime","arrivalTime":"","departureTime":""}}')
            done();
            })
        })
    })
})