const axios = require('axios');
const Dev = require('../modelos/Dev');

module.exports = {
    async store(requisicao, resposta) {

        const { username } = requisicao.body;
        const resposta_axios = await axios.get(`https://api.github.com/users/${username}`);
        const { name, bio, avatar_url: avatar } = resposta_axios.data;
        const userExists = await Dev.findOne({ user: username })
        if (userExists) {
            return resposta.json(userExists);
        }
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })
        return resposta.json(dev);
    },
    async index(requisicao, resposta) {
        const { user } = requisicao.headers;

        const loggedDev = await Dev.findById(user);
        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ]
        })
        return resposta.json(users);
    }

}