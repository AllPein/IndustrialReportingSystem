const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 3000;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
app.use(favicon(dirname + '/build/favicon.png')); 

//здесь наше приложение отдаёт статику
app.use(express.static(dirname));
app.use(express.static(path.join(dirname, 'build')));

//простой тест сервера
app.get('/ping', function (req, res) {
 return res.send('pong');
});

//обслуживание html
app.get('/*', function (req, res) {
res.sendFile(path.join(dirname, 'build', 'index.html'));
});
app.listen(port);