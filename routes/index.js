var express = require('express');
var router = express.Router();
// Carregando o File System
var fs = require("fs");
var lineReader = require('readline')
 
 // A mesma função, executada de forma Bloqueante.


/* GET users listing. */
router.all('/', function(req, res, next) {
	var files = fs.readdirSync('./public/arquivo');

	arquivos = []

	console.log(files);

	files.map((e)=> {
		arquivos.push({nome: e})
	})
	res.render('index', arquivos);
});

router.all('/test', function(req, res, next) {
	
	nome = req.body.nome
	pressao = []
	velocidade = []
	temperatura = []

	var foo = lineReader.createInterface({
		input: fs.createReadStream('./public/arquivo/' + nome)
	});
  
	foo.on('line', function (line) {

		console.log(line)

		dados = line.split(" ")

		dadosFiltrados = dados.filter((e) => {
			return e != ""
		})

		console.log(dadosFiltrados)

		data = dadosFiltrados[1] + ":" + dadosFiltrados[2] + ":" + dadosFiltrados[3]
		pressaoDado = parseFloat(dadosFiltrados[9])
		velocidadeDado = parseFloat(dadosFiltrados[10])
		temperaturaDado = parseFloat(dadosFiltrados[11])

		pressao.push({data: data, pressao: pressaoDado})
		velocidade.push({data: data, velocidade: velocidadeDado})
		temperatura.push({data: data, temperatura: temperaturaDado})
		
		console.log(data)
	});
	foo.on('close', function(line){
		res.json({pressao: pressao, velocidade: velocidade, temperatura: temperatura})
	})

});

module.exports = router;
