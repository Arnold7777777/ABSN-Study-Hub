const fs=require('node:fs'),path=require('node:path'),C=require('./src/core.js');
const html=fs.readFileSync(path.join(__dirname,'src/index.html'),'utf8').replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+fs.readFileSync(path.join(__dirname,'src/style.css'),'utf8')+'</style>').replace('<script src="core.js"></script>',()=>'<script>'+fs.readFileSync(path.join(__dirname,'src/core.js'),'utf8')+'</script>').replace('<script src="app.js"></script>',()=>'<script>'+fs.readFileSync(path.join(__dirname,'src/app.js'),'utf8')+'</script>');
fs.writeFileSync(path.join(__dirname,'rule-of-nines-game.html'),html);
fs.writeFileSync(path.join(__dirname,'question-bank.json'),JSON.stringify({title:'Nines Navigator',audience:'Adult nursing study',regions:C.regions,cases:C.cases},null,2)+'\n');
console.log('Built standalone HTML and editable question bank.');
