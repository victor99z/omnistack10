const { Router } = require('express');
const axios = require('axios');

const routes = Router();

routes.post('/devs', async (req , res) => {
    const {github_username} = req.body;

    const apiResponse = await axios.get(`https://api.github.com/users/${ github_username }`);

    const { name = login, avatar_url, bio} = apiResponse.data;

    console.log(avatar_url) 

    return res.json({ message: "works" });
});

module.exports = routes;