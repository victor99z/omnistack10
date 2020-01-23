const axios = require('axios');
const Dev = require('../models/Dev.js');
const parser = require('../utils/parseStringToArray')

// index(mostrar todos), show(mostrar 1), store(armazenar), update(alterar), destroy(deletar)

module.exports = {
    async store(req , res){
        const {github_username, techs, latitude, longitude} = req.body;
        
        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${ github_username }`);
            const { name = login, avatar_url, bio} = apiResponse.data;
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            const techsArray = parser(techs);
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray, // sem short sytax do javascript
                location,
            });
        }

        return res.json(dev);
    },
    async index(req , res){
        const devs = await Dev.find({});
        return res.json(devs);
    },
    async show(req, res){
        const { id } = req.params;

        const dev = await Dev.find({ github_username : id });

        return res.json({dev}); // short syntax 
    },
    async update(req, res){ 
        const { id, bio, name, latitude, longitude } = req.body;
        //let { } = Dev.find({ github_username : id });

        const location = {
            type: "Point",
            coordinates: [longitude, latitude],
        };

        await Dev.updateOne(
        {
            github_username : id
        },
        {
            github_username : id,
            bio,
            name,
            location
        })

        return res.json({ message: "user updated" });
    },
    async destroy(req, res){
        const {id:github_username} = req.params;

        const response = await Dev.deleteOne({
            github_username
        })

        return res.json({ message: "user removed" })
        
    }
};