var request = new XMLHttpRequest();
request.open('GET', 'https://api.jsonbin.io/v3/b/6534854c0574da7622bc0472/latest', false);
request.send(); 
dataIFV = JSON.parse(request.responseText).record;

document.querySelector('.TITLE').innerHTML = dataIFV.title;
document.querySelector('#IFV').value = dataIFV.IFV;
document.querySelector('#THREAD').href = dataIFV.thread;
document.querySelector('#THREAD').innerHTML = 'Link';
document.querySelector('.COUNCIL').innerHTML = dataIFV.council;
document.querySelector('.REC').innerHTML = dataIFV.rec;
if(document.querySelector('#DISPATCH')){
  document.querySelector('#DISPATCH').href = 'https://www.nationstates.net/page=dispatch/id=' + dataIFV.dispatch;
}
