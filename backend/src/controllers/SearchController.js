const Dev = require('../models/Dev');
const parser = require('../utils/parseStringToArray')

module.exports = {
    async index(req, res){
        const {latitude, longitude, techs} = req.query;

        const techsArray = parser(techs);

        console.log(techsArray)

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        return res.json({ message: true });
    }
}