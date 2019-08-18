const Dev = require('../modelos/Dev');

module.exports = {
    async store(requisicao, resposta) {
        console.log(requisicao.params.devId);
        console.log(requisicao.headers.user);
        console.log(requisicao.io);
        console.log(requisicao.usuariosConectados);

        const { user } = requisicao.headers;
        const { devId } = requisicao.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return resposta.status(400).json({ error: 'Dev not exists' });
        } else if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = req.usuariosConectados[user];
            const targetSocket = req.usuariosConectados[devId];
            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev)
            }

            if (targetSocket) {
                req.io.to(loggedSocket).emit('match', loggedDev)
            }
            console.log('Deu Match!');
        }

        loggedDev.likes.push(targetDev._id)
        await loggedDev.save();

        return resposta.json({ likeOk: true });
    }
}