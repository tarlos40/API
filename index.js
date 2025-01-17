const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usuarioRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes')
const cors = require('cors')

app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Permite solicitações de qualquer origem (não recomendado para produção)
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

app.use(cors({
  origin: ['https://sociallizze.online', 'http://localhost:5500'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}))
// hello

app.use('/api', usuarioRoutes);
app.use('/mensagem', messageRoutes)

// Outras configurações e middleware...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});