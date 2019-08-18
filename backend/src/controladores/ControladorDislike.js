const Dev = require('../modelos/Dev');

module.exports = {
    async store(requisicao, resposta) {
        console.log(requisicao.params.devId);
        console.log(requisicao.headers.user);

        const { user } = requisicao.headers;
        const { devId } = requisicao.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return resposta.status(400).json({ error: 'Dev not exists' });
        }

        loggedDev.dislikes.push(targetDev._id)
        await loggedDev.save();

        return resposta.json({ dislikeOk: true });
    }
}