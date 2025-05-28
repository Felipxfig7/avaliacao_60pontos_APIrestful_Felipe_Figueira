const express = require('express')
const mysql = require('mysql2')

const app = express()

app.use(express.json())

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "academia"
});

app.post('/sessoes', (req, res) => {
    const {nome_aluno, nome_personal, tipo_treino, data, horario, observacoes} = req.body

    if (!nome_aluno || typeof(nome_aluno) != 'string' || nome_aluno.trim() == '') {
       return res.status(400).send("Nome é obrigatório para o cadastro!")
    }
    
    if (!nome_personal || typeof(nome_personal) != 'string' || nome_personal.trim() == ''){
        return res.status(400).send("Nome é obrigatório para o cadastro!")
    }

    if (!tipo_treino || typeof(tipo_treino) != 'string' || tipo_treino.trim() == ''){
        return res.status(400).send("É obrigatório cadastrar o tipo de treino do aluno!")
    }

    if (!data || data.trim() == '') {
        return res.status(400).send("Necessitamos que informe a data do treino.")
    }

    if (!horario || horario.trim() == '') {
        return res.status(400).send("Necessitamos que informe o horário do treino.")
    }

    conexao.query('INSERT INTO sessoes (aluno, personal, tipo_treino, data, horario, observacoes) VALUES(?, ?, ?, ?, ?, ?)', [nome_aluno, nome_personal, tipo_treino, data, horario, observacoes])
    res.status(201).send('Sessão cadastrada com sucesso!')

});

app.get('/sessoes', (req, res) => {
    conexao.query('SELECT * FROM sessoes', (err, results) => {
        if (err) {
            res.status(500).send("Erro ao cadastrar sessões.")
        }

        res.status(200).send(results)
    })
});

app.listen(3000, () => {
    console.log('Servidor back-end rodando!')
})

app.delete('/sessoes/:id', (req, res) => {
    const { id } = req.params;
    
conexao.query('DELETE FROM sessoes WHERE id = ?', [id], (err, results) => {
    if (err) {
        return res.status(500).send('Erro ao deletar!')
    }
    if (results.affectedRows === 0) {
        return res.status(404).send('Sessão não encontrada!')
    }
    res.status(200).send('Sessão deletada com sucesso!');
    });
});

app.put('/sessoes/:id', (req, res) => {
    const { id } = req.params;
    const {nome_aluno, nome_personal, tipo_treino, data, horario, observacoes} = req.body;
    
    const query = 'UPDATE sessoes SET aluno = ?, personal = ?, tipo_treino = ?, data = ?, horario = ?, observacoes = ? WHERE id = ?';
    conexao.query(query, [nome_aluno, nome_personal, tipo_treino, data, horario, observacoes, id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar');
            }

            if (results.affectedRows === 0) {
            return res.status(404).send('Sessão não encontrado');
            }

            if (!nome_aluno || typeof(nome_aluno) != 'string' || nome_aluno.trim() == '') {
                return res.status(400).send("Nome é obrigatório para o cadastro!")
             }
             
             if (!nome_personal || typeof(nome_personal) != 'string' || nome_personal.trim() == ''){
                 return res.status(400).send("Nome é obrigatório para o cadastro!")
             }
         
             if (!tipo_treino || typeof(tipo_treino) != 'string' || tipo_treino.trim() == ''){
                 return res.status(400).send("É obrigatório cadastrar o tipo de treino do aluno!")
             }
         
             if (!data || data.trim() == '') {
                 return res.status(400).send("Necessitamos que informe a data do treino.")
             }
         
             if (!horario || horario.trim() == '') {
                 return res.status(400).send("Necessitamos que informe o horário do treino.")
             }

    res.send('Sessão atualizado com sucesso');
        });
    });

    //CRUD PLANOS DA ACADEMIA!!!

    app.post('/planos', (req, res) => {
        const {nome_plano, duracao_meses, preco, descricao} = req.body
    
        if (!nome_plano || typeof(nome_plano) != 'string' || nome_plano.trim() == '') {
           return res.status(400).send("O Nome do plano é obrigatório para o cadastro!")
        }
        
        if (!duracao_meses || typeof(duracao_meses) != 'number' || duracao_meses <= 0){
            return res.status(400).send("É necessário informar a duração do plano!")
        }
    
        if (!preco || typeof(preco) != 'number' || preco < 0){
            return res.status(400).send("Informe o valor do plano!")
        }
    
        if (!descricao || descricao.trim() == '') {
            return res.status(400).send("É necessário informar ao cliente os serviços oferecidos no plano!")
        }
    
        conexao.query('INSERT INTO planos (nome_plano, duracao_meses, preco, descricao) VALUES(?, ?, ?, ?)', [nome_plano, duracao_meses, preco, descricao])
        res.status(201).send('Sessão cadastrada com sucesso!')
    
    });

    app.get('/planos', (req, res) => {
        conexao.query('SELECT * FROM planos', (err, results) => {
            if (err) {
                res.status(500).send("Erro ao buscar planos!")
            }
    
            res.status(200).send(results)
        })
    });

    app.delete('/planos/:id', (req, res) => {
        const { id } = req.params;
        
    conexao.query('DELETE FROM planos WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao deletar!')
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Plano não encontrado!')
        }
        res.status(200).send('Plano deletado com sucesso!');
        });
    });


    app.put('/planos/:id', (req, res) => {
        const { id } = req.params;
        const {nome_plano, duracao_meses, preco, descricao} = req.body;
        
        const query = 'UPDATE planos SET nome_plano = ?, duracao_meses = ?, preco = ?, descricao = ? WHERE id = ?';
        conexao.query(query, [nome_plano, duracao_meses, preco, descricao, id], (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar');
                }
    
                if (results.affectedRows === 0) {
                return res.status(404).send('Plano não encontrado');
                }

                if (!nome_plano || typeof(nome_plano) != 'string' || nome_plano.trim() == '') {
                    return res.status(400).send("O Nome do plano é obrigatório para atualizar!")
                 }
                 
                 if (!duracao_meses || typeof(duracao_meses) != 'number' || duracao_meses <= 0){
                     return res.status(400).send("É necessário informar a duração do plano!")
                 }
             
                 if (!preco || typeof(preco) != 'number' || preco < 0){
                     return res.status(400).send("É obrigatório cadastrar o tipo de treino do aluno!")
                 }
             
                 if (!descricao || descricao.trim() == '') {
                     return res.status(400).send("É necessário informar ao cliente os serviços oferecidos no plano!")
                 }
    
        res.send('Sessão atualizado com sucesso');
            });
        });