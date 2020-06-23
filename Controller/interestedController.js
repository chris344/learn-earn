var Requests = require('../models/requests');
var Events = require('../models/events')
var mongoose = require('mongoose');

exports.interestcounts = async function(req, res){
    try {
        const type = req.params.type
        const ReqEvnId = req.params.er_id
        if (type == 'req') {
            var Req = await Requests.findOne({ _id : ReqEvnId })
            var count = Req.interested.length
            res.send({ count })
            res.status(204)
        } else if (type == 'evn') {
            var Evn = await Events.findOne({ _id : ReqEvnId })
            var count = Evn.interested.length
            res.send({ count })
            res.status(204)
        } else {
            res.send("Type not found")
            res.status(404)
        }

    } catch {
        res.status(404)
        res.send({ error: "Request/Event doesn't exist!" })
    }
}

exports.intReqEvn = async function(req, res){
    try {
        const type = req.params.type
        const action = req.params.action
        const ReqEvnId = req.params.er_id
        const userId = req.user._id

        if (type == 'req') {
           
            var likedReq = await Requests.findOne({ _id : ReqEvnId })

            if(action == "like"){
                if ( likedReq.interested.includes(userId) ){
                    res.send("Already Interested")
                    return
                } else {
                    likedReq.interested.push(new mongoose.mongo.ObjectId(userId))
                }
            } else {
                var index = likedReq.interested.indexOf(userId);  
                if (index !== -1) {
                    likedReq.interested.splice(index, 1);
                }
            }
            await likedReq.save()

        } else if (type == 'evn') {
           
            var likedEvn = await Events.findOne({ _id : ReqEvnId })

            if(action == "like"){
                if ( likedEnv.interested.includes(userId) ){
                    res.send("Already Interested")
                    return
                } else {
                    likedEnv.interested.push(new mongoose.mongo.ObjectId(userId))
                }
            } else {
                var index = likedEvn.interested.indexOf(userId);  
                if (index !== -1) {
                    likedEvn.interested.splice(index, 1);
                }
            }
            await linkedEvn.save()

        } else {
            res.send("Type not found")
            res.status(404)
        }
        
        res.send("Interest in Request/Event has been registered successfully!!")
        res.status(204)
    } catch {
        res.status(404)
        res.send({ error: "Request/Event doesn't exist!" })
    }
}