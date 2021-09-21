var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const accountSid = 'ACed6e9977dce80c6e50ac44596f0f03fe';
const authToken = 'e430526ca75b89bcd898542c760b8244';
const twilio = require('twilio')
const app = express()

// Schema Models --
//Trains = require('../trains/models/Trains');
// Stations = require('./station-schema');
Users = require('./users-schema');
RqOTP = require('./reqotp-schema');
// Booking = require('./booking-schema');
// Password_Change = require('./password_detl-schema');
// Notify = require('./notif-schema');



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    console.log('ip:', req.ip);
    next();
});

mongoose.connect('mongodb://localhost/DB').then(
    () => { console.log("DB connected.") },
    err => { console.log(err) }
);
var db = mongoose.connection;

// app.use(bodyParser.json({
//     extended: true
// }));
app.use(express())
app.use(express.json())


// REST APIS 

app.get('/', function(req, res, next) {
    res.sendStatus(404)
});


app.get('/api/trains', function(req, res, next) {
    Trains.getTrains(function(err, train) {
        if (err)
            console.log('Error occured: --------> ' + err);
        res.json(train)
    });
});


// app.get('/api/stations', function(req, res, next) {
//     Stations.getStations(function(err, station) {
//         if (err)
//             console.log('Error occured: --------> ' + err);
//         res.json(station)
//     });
// });


// login credentials
app.post('/login', function(req, res) {
    var cred = req.body;

    // identifier -> username from req.body
    Users.createToken(cred.identifier, function(err, user) {
        if (err)
            console.log('Error occured: --------> ' + err);
        else {
            if (user == null) {
                res.json({
                    status: "403"
                });
            } else {
                
                // callback successfull with user for token creation
                if (cred.identifier == user.email && cred.password == user.password) {
                    
                    // checks for first time log
                    if (user.sessionStatus === "Not Verified") {
                        res.json({
                            userid: cred.identifier,
                            status: 401
                        });
                    } else {
                        // Starts the session on browser by giving access
                        var data = {
                            "email": user.email,
                            "session_id": uuidv4(),
                            "creation_time": Date.now(),
                        };

                        // checks for admin or user
                        if (user.userType == "admin")
                            routes = "/admin";
                        else
                            routes = "/user";

                        // assign jwt token with status 200
                        jwt.sign({ data }, '4E37F6EB24C177F499C491BB9748EEE2118D8F2F984E37F6AAC40F356ECCEW8I', { expiresIn: '24h' }, (err, token) => {
                            var messagePayload = {
                                "token": token,
                                "route": routes,
                                "status": "200"
                            };
                            updateTokenLogin(user.email, token, res, messagePayload);
                        });
                    }

                } else {
                    res.json({
                        status: "403"
                    });
                }
            }

        }

    });


});


// login verify session for reset
app.post('/login/signOn', verifyToken, function(req, res) {
    token = req.token;
    jwt.verify(req.token, '4E37F6EB24C177F499C491BB9748EEE2118D8F2F984E37F6AAC40F356ECCEW8I', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            tokenVerification(authData.data.email, token, res);
        }
    });


});


// sigupuser
app.post('/signUpUser', function(req, res) {
    userData = req.body;
    Users.createUser(userData, function(err, user) {
        if (err) {
            console.log('Error occured: --------> ' + err);
        } else {
            res.send(user);
        }
    });

});

app.post('/api/stations/betw', function(req, res) {
    stationDetl = req.body;
    Trains.getTrains(stationDetl.station1, stationDetl.station2, function(err, station) {
        if (err)
            console.log('Error occured: --------> ' + err);
        else {
            res.json(station);
        }
    });
});


// suign in Details
app.post('/api/sigin/details', function(req, res) {
    Users.basicDetls(req.body.identifier, function(err, user) {
        if (err) {
            console.log('Error occured: --------> ' + err);
            const payload = {
                status: "403"
            }
            res.send(payload);
        } else {
            if (user == null) {
                const payload = {
                    status: "403"
                }
                res.send(payload);
            } else {
                const userData = {
                    firstName: user.firstName,
                    email: user.email,
                    status: "200"
                };
                res.send(userData);
            }
        }
    });

});

// veruify token of jwt
function verifyToken(req, res, next) {
    const reqHeader = req.headers['authorization'];
    if (typeof reqHeader !== 'undefined') {
        req.token = reqHeader;
        next();
    } else {
        res.sendStatus(403);
    }

}

// upon session starrt, generates random number of 16 digits,
// stringify's the digit and, stores and send it 
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// update jwt token
function updateTokenLogin(email, token, res, carrier) {

    // once user authenticated, updates sessionStatus to Signed In
    Users.updateToken(email, "Signed In", token, function(err, user) {
        if (err)
            console.log('Error occured: --------> ' + err);
        else {
            res.json(carrier);
        }

    });
}


function tokenVerification(email, token, res) {

    Users.verifyToken(email, function(err, user) {
        if (err)
            console.log('Error occured: --------> ' + err);
        else {
            if (token == user.currentSession && user.sessionStatus == "Signed In") {
                if (user.userType == "admin")
                    routes = "/admin";
                else
                    routes = "/user";

                res.json({
                    route: routes,
                    status: "200"
                });

            } else {
                res.json({
                    status: "403"
                });
            }


        }
    });

}

app.post('/api/myprofile/details', function(req, res) {
    Users.profileDetails(req.body.identifier, function(err, user) {
        if (err) {
            console.log('Error occured: --------> ' + err);
            const payload = {
                status: "403"
            }
            res.send(payload);
        } else {
            if (user == null) {
                const payload = {
                    status: "403"
                }
                res.send(payload);
            } else {
                const userData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    dob: user.dob,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    country: user.country,
                    pin: user.pin,
                    countryCode: user.countryCode,
                    phone: user.phone,
                    email: user.email,
                    aadhar: user.aadhar,
                    pan: user.pan,
                    occupation: user.occupation,
                    status: "200"
                };
                res.send(userData);
            }
        }
    });

});

app.post('/verifyUserChallenge', function(req, res) {
    userId = req.body;
    Users.checkUserStatus(userId.identifier, function(err, user) {
        if (err) {
            console.log('Error occured: --------> ' + err);
        } else {
            // checks for verified users if siignedup but not verified
            if (user.sessionStatus === 'Not Verified') {

                const otpDetails = {
                    "email": user.email,
                    "session_id": uuidv4(),
                    "otpn": genOTP(),
                    "type": "User-Auth",
                    "status": "Not Verified"
                };

                // call otp builder requestOTPGeneration
                RqOTP.requestOTPGeneration(otpDetails);
                sendOTP(otpDetails.session_id, user.countryCode, user.phone, otpDetails.otpn, res);

                
            } else {
                res.sendStatus(403);
            }
        }
    });
});



app.post('/verifyOTP', function(req, res) {
    otpResponse = req.body;
    RqOTP.verifyResponse(otpResponse.identifier, otpResponse.session_id, otpResponse.otpn, function(err, otpVer) {
        if (err) {
            console.log('Error occured: --------> ' + err);
        } else {
            updateOTPStatus(otpResponse.identifier, otpVer[0]._id, otpVer[0].session_id, res);
        }
    });
});

// generates random otp for User confirmation
function genOTP() {
    return 'xxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function sendOTP(session_id, countryCode, rec_number, otp_m, res) {
    receiver_N = countryCode + rec_number;
    hashed_N = countryCode + ' *** *' + rec_number.substring(6, rec_number.length);
    otp_message = 'Your user verification OTP for RRS is ' + otp_m;
    console.log(otp_message);
    console.log("Sending OTP to " + receiver_N);

    var client = new twilio(accountSid, authToken);
    client.messages.create({
            body: otp_message,
            to: receiver_N, // Text this number
            from: '(323) 772-5447' // From a valid Twilio number
        })
        .then((message) => {
            console.log("Message Sent --> " + message.sid);
        });


    res.json({
        session_id: session_id,
        phone: hashed_N,
        status: "200"
    });

}
function updateOTPStatus(user, otpid, s_id, res) {
    RqOTP.updateStatus(otpid, function(err, otp) {
        if (err) {
            console.log('Error occured: --------> ' + err);
        } else {
            Users.updateUserStatus(user, function(err, user) {
                if (err) {
                    console.log('Error occured: --------> ' + err);
                } else {
                    const payload = {
                        'session_id': s_id,
                        'status': '200'
                    };
                    res.send(payload);
                }
            });
        }
    });
}




function updateTokenLogin(email, token, res, carrier) {
    Users.updateToken(email, "Signed In", token, function(err, user) {
        if (err)
            console.log('Error occured: --------> ' + err);
        else {
            res.json(carrier);
        }

    });
}


function tokenVerification(email, token, res) {

    Users.verifyToken(email, function(err, user) {
        if (err)
            console.log('Error occured: --------> ' + err);
        else {
            if (token == user.currentSession && user.sessionStatus == "Signed In") {
                if (user.userType == "admin")
                    routes = "/admin";
                else
                    routes = "/user";

                res.json({
                    route: routes,
                    status: "200"
                });

            } else {
                res.json({
                    status: "403"
                });
            }


        }
    });

}
app.listen(2000, () => console.log('Server Running on port 2000.'))