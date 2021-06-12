const mongoose=require('mongoose');

//connect to mongodb

mongoose.connect('mongodb://localhost/testaroo');
mongoose.connection.once('open',function(){
    console.log('Connection successful');
}).on('error',function(err){
    console.log('Connection error:',err);
})