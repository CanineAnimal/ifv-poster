var request = new XMLHttpRequest();
request.open('GET', 'https://api.jsonbin.io/v3/b/65389fe60574da7622bd5cae/latest', false);
request.send(); 
dataIFV = JSON.parse(request.responseText).record;

document.querySelector('.TITLE').innerHTML = dataIFV.title;
document.querySelector('#IFV').value = dataIFV.IFV;
document.querySelector('#THREAD').href = dataIFV.thread;
document.querySelector('#THREAD').innerHTML = 'Link';
document.querySelector('.COUNCIL').innerHTML = dataIFV.council;
document.querySelector('.REC').innerHTML = dataIFV.rec;
if(document.querySelector('#DISPATCH')){
	if(dataIFV.dispatch == undefined){
		dataIFV.dispatch = prompt('Enter dispatch code: ');
	}
	document.querySelector('#DISPATCH').href = 'https://www.nationstates.net/page=dispatch/id=' + dataIFV.dispatch;
	document.querySelector('#DISPATCH').innerHTML = 'Link';
}
if(document.querySelector('#TG_VICTIMS')){
	document.querySelector('#TG_VICTIMS').innerHTML = dataIFV.tg_victims;
}
