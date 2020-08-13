const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao');

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(`
                    <html>
                        <head>
                            <meta charset="utf-8">
                        </head>
                        <body>
                            <h1> Casa do Código </h1>
                        </body> 
                    </html>
                `);
    });

    app.get('/livros', function(req, resp) {
        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros => resp.marko(
                require('../view/livros/lista/lista.marko'), {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../view/livros/form/form.marko'));
    })

    app.post('/livros', function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then()
            .catch(erro => console.log(erro));
    })
}