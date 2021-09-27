const express = require('express')
const router = express()
const axios = require('axios')
const registry = require("./registry.json")
const fs = require('fs')

router.all('/:apiName/:path', (req, res)=>{
    if(registry.services[req.params.apiName]){
        console.log(req.params.apiName)
        // gets
        axios({
            // gets any method => POST, GET, DELETE, etc
            method: req.method,
            // Calls the url and api in question
            url: registry.services[req.params.apiName].url+req.params.path,
            // passes headers if any/necessary
            headers: req.headers,
            // body content
            data: req.body,
        }).then((response)=>{
            console.log( registry.services[req.params.apiName].url+req.params.path)
            res.send(response.data)
        })
    }
    else{
        res.send("API name doesn't exist")
    }
})

router.all('/:apiName/:path/:id', (req, res)=>{    
    console.log('Inside /:id =>'+req.params.apiName)
    if(registry.services[req.params.apiName]){
        console.log(req.params.apiName)
        // gets
        axios({
            // gets any method => POST, GET, DELETE, etc
            method: req.method,
            // Calls the url and api in question
            url: registry.services[req.params.apiName].url+req.params.path+"/"+req.params.id,
            // passes headers if any/necessary
            headers: req.headers,
            // body content
            data: req.body,
        }).then((response)=>{
            console.log( registry.services[req.params.apiName].url+req.params.path)
            res.send(response.data)
        }).catch(err =>{
            console.error(err)
        })
    }
    else{
        res.send("API name doesn't exist")
    }
})


router.post('/register', (req, res)=>{
    const registrationInfo = req.body
    //building the url
    registrationInfo.url = registrationInfo.protocol +"://"+registrationInfo.host+
    ":"+registrationInfo.port +"/api/"

    registry.services[registrationInfo.apiName] = {...registrationInfo}
    fs.writeFile('./routes/registry.json', JSON.stringify(registry), (err)=>{
        if(err){
            res.send("could not register "+registrationInfo.apiName +"\n"+err)
        }
        else{
            res.send("successfully registered "+registrationInfo.apiName + "")
        }
    })
    
})

router.post('/register1', (req, res)=>{
    const registrationInfo = req.body
    //building the url
    registrationInfo.url = registrationInfo.protocol +"://"+registrationInfo.host+
    ":"+registrationInfo.port +"/api/"

    if(apiAlreadyExist(registrationInfo)){
        res.send("configuration already exists" + registrationInfo.apiName + " at '"+registrationInfo.url+"' ")
    }
    else{
        registry.services[registrationInfo.apiName].push({...registrationInfo})
        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (err)=>{
            if(err){
                res.send("could not register "+registrationInfo.apiName +"\n"+err)
            }
            else{
                res.send("successfully registered "+registrationInfo.apiName + "")
            }
        })
    }
})

router.post('/unregister', (req, res)=>{
    const registrationInfo = req.body
    if(apiAlreadyExist(registrationInfo)){
        // get the index of apiName
        const index = registry.services[registrationInfo.apiName].findIndex(instance=>{
            return registrationInfo.url === instance.url
        })
        registry.services[registrationInfo.apiName].splice(index, 1)
        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (err)=>{
            if(err){
                res.send("could not unregister "+registrationInfo.apiName +"\n"+err)
            }
            else{
                res.send("successfully unregistered "+registrationInfo.apiName + "")
            }
        })
    }
    else{
        // none exist msg
        res.send("Configuration doesnt exist for "+registrationInfo.apiName +
        " at '"+registrationInfo.url+"'")
    }
})

const apiAlreadyExist = (registrationInfo) =>{
    let exists = false
    registry.services[registrationInfo.apiName].forEach(element => {
        if(element.url === registrationInfo.url){
            exists=true
        }
    })
    return exists
}

module.exports = router