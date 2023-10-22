var request;
var request2;
var request3;

function telegram(){
	var ID;
	var oldCode;
	if(dataIFV.council == 'GA'){
		ID = 1947416;
	}else if(dataIFV.council == 'SC'){
		ID = 1947418;
	}
	var request = new XMLHttpRequest();
	request.open('GET', 'https://www.nationstates.net/page=dispatch/id=1947416/raw=1?user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value, false);
	request.send();
	
	request2 = new XMLHttpRequest();
	request2.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value + '&nation=TNP Information for Voters&c=dispatch&dispatch=edit&title=GA Information for WA Voters Compilation&id=1947418&text=' + newList + '&category=3&subcategory=385&mode=prepare', false);
	request2.setRequestHeader('X-Password', document.querySelector('#PWD').value);
	var originalTime = (new Date()).getTime();
	request2.send();
	if(request2.status != 200){
		request3 = new XMLHttpRequest();
		request3.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value + '&nation=' + document.querySelector('#USER').value + '&c=dispatch&dispatch=edit&title=SC Information for WA Voters Compilation&id=1947418&text=' + newList + '&category=3&subcategory=385&mode=execute&token=' + request2.responseXML.querySelector('SUCCESS').innerHTML, false);
		request3.setRequestHeader('X-Pin', request.getResponseHeader('X-Pin'));
		while((new Date()).getTime() < originalTime + 650){};
		var originalTime = (new Date()).getTime();
		request3.send();
		try{
			dispatchID = request3.responseXML.querySelector('SUCCESS').innerHTML.split('/page=dispatch/id=')[1].split('"')[0];
			dataIFV.dispatch = dispatchID;
			postRMB(originalTime);
		}catch(e){
			alert('Something went wrong.');
		}
	}else{
		alert('Something went wrong.');
	}
}
