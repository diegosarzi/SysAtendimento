var express = require('express');
var app = express();
var methodOverride = require("method-override");

app.set('view engine', 'ejs');

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(methodOverride("_method"));

var db_string = 'mongodb://127.0.0.1/appCasaPizza';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;
var Contact;
db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));
db.once('open', function(){
	var contactSchema = mongoose.Schema({
		telefone: String,
		nome: String,
		endereco: String,
		endereco2: String,
		observacao: String,
		pedido: String,
		formaDePagamento: String,
		entrega: String,
		total: String,
		troco: String,
		status: String,
		created_at: Date
	});

	Contact = mongoose.model('Contact', contactSchema);

});

app.get('/', function(req, res){
	Contact.find({}, function(err, contact){
		if(err){
			res.json({error: 'Não foi possivel buscar contatos...'});
		} else {
			res.render('index', {contact:contact});
		}
	});

	
});

app.get('/reset', function(req, res){
	Contact.update({}, {status: 'fechado', pedido: '', formaDePagamento: '', entrega: '', total: '', troco: ''}, {multi: true}, function(err, contact){
		if(err){
			res.json({error: 'Nao..'});
		} else {
			console.log(contact.status);
			res.redirect('/');
		}
	});

	
});

app.put('/:id', function(req, res){

	Contact.findByIdAndUpdate(req.params.id, req.body.contacts, function(err, contact){
		if(err){
			res.json({error: 'Não foi possivel buscar contatos...'});
		} else {
			res.redirect('/');
		}
	});

	
});


//app.get('/edit/:id', function(req, res){
//
//	Contact.findById(req.params.id, function(err, contact){
//		if(err){
//			res.json({error: 'Não foi possivel buscar contatos...'});
//		} else {
//			res.render('edit', {contact:contact});
//		}
//	});
//
//	
//});

app.get('/edit/:id', function(req, res){

	Contact.findById(req.params.id, function(err, contact){
		if(err){
			res.json({error: 'Não foi possivel buscar contatos...'});
		} else {
			res.render('edit', {contact:contact});
		}
	});

	
});

app.put('/:id', function(req, res){

	Contact.findByIdAndUpdate(req.params.id, req.body.contacts, function(err, contact){
		if(err){
			res.json({error: 'Não foi possivel buscar contatos...'});
		} else {
			res.redirect('/');
		}
	});

	
});

app.post('/post', function(req, res){

	var telefone = req.param('telefone');
	var nome = req.param('nome');
	var endereco = req.param('endereco');
	var endereco2 = req.param('endereco2');
	var observacao = req.param('observacao');
	var pedido = req.param('pedido');
	var formaDePagamento = req.param('formaDePagamento');
	var entrega = req.param('entrega');
	var total = req.param('total');
	var troco = req.param('troco');
	var status = req.param('status');

	new Contact({
		'telefone': telefone,
		'nome': nome,
		'endereco': endereco,
		'endereco2': endereco2,
		'observacao': observacao,
		'pedido': pedido,
		'formaDePagamento': formaDePagamento,
		'entrega': entrega,
		'total': total,
		'troco': troco,
		'status': 'espera',
		'created_at': new Date()
	}).save(function(error, contact){
		if(error){
			res.json({error: 'Não foi possivel salvar o contato'});
		} else {
			res.redirect('/');
		}
	});

});

app.get('/delete/:id', function(req, res){
	var id = req.param('id');
	Contact.findById(id, function(err, contact){
		if(err){
			console.log(err);
		} else {
			contact.remove(function(err){
				if(!err){
					res.redirect('/');
				}
			});
		}
	});
});

app.listen(5000, function(){
	console.log('Listen 5000');
});
