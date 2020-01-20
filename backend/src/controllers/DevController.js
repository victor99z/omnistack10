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
    }
};