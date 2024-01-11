var dispatchID;
var request2;
var request3;
var uaString;
var IFVtext;
var dataIFV;
var founded;

uaString = ''; // uaString is entirely unnecessary if you use a better browser than MS Edge

function postIFV(){
	IFVtext = `[background-block=#265780][hr][center][floatleft][img]https://forum.thenorthpacific.org/images/dispatches/tnp_header.png[/img][/floatleft][size=200][color=#dfecff]` + (function(){if(dataIFV.council == 'SC'){return 'Security Council '}else{return 'General Assembly '}})() + `Vote Recommendation[/color][/size][/center][hr][center][b][size=125] [/size][color=#dfecff]Part of the[/color] [url=/page=dispatch/id=` + (function(){if(dataIFV.council == 'SC'){return '1947416'}else{return '1947418'}})() + `][color=#94c248]Information for WA Voters[/color][/url] [color=#dfecff]program[/color][size=125] [/size][/b][/center][hr][/background-block]
[box][size=150][color=#265780]Resolution at Vote: [url=/page=` + dataIFV.council.toLowerCase() + `]` + dataIFV.title + `[/url][/color][/size]
[size=150][color=#265780]Vote Recommendation:[/color] [b]` + dataIFV.rec + `[/b][/size][/box]

[size=150][color=#265780]Resolution Analysis[/color][/size]
` + dataIFV.IFV + `

[size=150][color=#265780][url=` + dataIFV.thread + `]Join our discussion![/url][/color][/size]
[background-block=#265780][hr][center][img]https://forum.thenorthpacific.org/images/ifv/tnp_wa_voting_footer.png[/img]
[b][color=#dfecff]Sponsored by the[/color] [url=http://forum.thenorthpacific.org/forum/39609/][color=#94c248]Ministry of World Assembly Affairs[/color][/url] [color=#dfecff]of The North Pacific.[/color][/b][/center][hr][/background-block]`;
	IFVtext = IFVtext.replaceAll('=', '%3D').replaceAll('#', '%23').replaceAll('&', '%26').replaceAll('?', '%3F').replaceAll('=', '%3D').replaceAll(';', '%3B').replaceAll('\n', '%0D%0A').replaceAll('’', '\'').replaceAll('“', '%22').replaceAll('”', '%22');
	if(confirm('Confirming that a ' + dataIFV.rec + ' IFV on ' + dataIFV.title + ' will be posted? Click OK below to confirm.\n\nIf you choose to proceed, the process will take about one minute -- do NOT close this tab.')){
		request2 = new XMLHttpRequest();
		request2.open('POST', 'https://www.nationstates.net/cgi-bin/api.cgi', false);
		request2.setRequestHeader('X-Password', document.querySelector('#PWD').value);
		try{
			request2.setRequestHeader('User-Agent', 'Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value);
		}catch(e){
			uaString = '&Script by The Ice States (Github%3A https%3A%2F%2Fgithub.com%2FCanineAnimal%2Fifv-poster) in use by ' + document.querySelector('#USER').value
		}
		var originalTime = (new Date()).getTime();
		request2.send('?nation=' + document.querySelector('#USER').value + uaString + '&c=dispatch&dispatch=add&title=' + dataIFV.titleRec + ' ' + dataIFV.council + ' resolution ' + dataIFV.title + '&text=' + IFVtext + '&category=3&subcategory=385&mode=prepare');
		if(request2.status == 200){
			request3 = new XMLHttpRequest();
			request3.open('POST', 'https://www.nationstates.net/cgi-bin/api.cgi', false);
			request3.setRequestHeader('X-Pin', request2.getResponseHeader('X-Pin'));
			while((new Date()).getTime() < originalTime + 650){};
			var originalTime = (new Date()).getTime();
			request3.send('?nation=' + document.querySelector('#USER').value + uaString + '&c=dispatch&dispatch=add&title=' + dataIFV.titleRec + ' ' + dataIFV.council + ' resolution ' + dataIFV.title + '&text=' + IFVtext + '&category=3&subcategory=385&mode=execute&token=' + request2.responseXML.querySelector('SUCCESS').innerHTML);
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
	}else{
		alert('Cancelled IFV posting.');
	}
}
function postRMB(originalTime){
	var rmbPost = `Greetings everyone!

There is a new vote in the ` + (function(){if(dataIFV.council == 'SC'){return 'Security Council'}else{return 'General Assembly'}})() + `:

[u]Resolution at Vote:[/u] [b][url=/page=` + dataIFV.council.toLowerCase() + `]` + dataIFV.title + `[/url][/b]
[u]Vote Recommendation:[/u] [b]` + dataIFV.rec + `[/b]
[u]Forum voting thread:[/u] [b]` + dataIFV.thread + `[/b]

You can read the [b][url=/page=dispatch/id=` + dispatchID + `]Information for WA Voters dispatch[/url] (please upvote!)[/b] for more information about the resolution. If you are a WA member, [b]make sure to vote so that you [url=/page=dispatch/id=1079028]have your voice heard![/url][/b]

Additionally, [b]you should also vote in the forum thread[/b]. The forum tally determines the delegate's vote, so this is your chance to determine how TNP's 1000 votes are used!

https://www.nationstates.net/page=dispatch/id=` + dispatchID;
	
	rmbPost = rmbPost.replaceAll('=', '%3D').replaceAll('#', '%23').replaceAll('&', '%26').replaceAll('?', '%3F').replaceAll('=', '%3D').replaceAll(';', '%3B').replaceAll('\n', '%0D%0A').replaceAll('’', '\'').replaceAll('“', '%22').replaceAll('”', '%22');
	
	var request4 = new XMLHttpRequest();
	request4.open('POST', 'https://www.nationstates.net/cgi-bin/api.cgi', false);
	request4.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	try{
		request4.setRequestHeader('User-Agent', 'Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value);
	}catch(e){}
	request4.setRequestHeader('X-Pin', request2.getResponseHeader('X-Pin'));
	while(originalTime + 650 > (new Date()).getTime()){}; 
	request4.send('c=rmbpost&nation=' + document.querySelector('#USER').value + uaString + '&region=the_north_pacific&c=rmbpost&text=' + rmbPost + '&mode=prepare');
	originalTime = (new Date()).getTime();

	if(request4.status == 200){
		while((new Date()).getTime() < originalTime + 600){};
		var request5 = new XMLHttpRequest();
		request5.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?nation=' + document.querySelector('#USER').value + '&q=foundedtime&user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value, false);
		request5.send();
	
		founded = request5.responseXML.querySelector('FOUNDEDTIME').innerHTML;
		if(founded + 47336400 > (new Date()).getTime()/1000){
			 var delay = 54000 + 0.000688 * (fd - (new Date()).getTime()/1000); // Credit to Refuge Isle for researching and publishing NS' rate limit formula
		}else{
			var delay = 21000;
		}
		
		setTimeout(function(){
			var request5 = new XMLHttpRequest();
			request5.open('POST', 'https://www.nationstates.net/cgi-bin/api.cgi', false);
			request5.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			try{
				request5.setRequestHeader('User-Agent', 'Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value);
			}catch(e){}
			request5.setRequestHeader('X-Pin', request2.getResponseHeader('X-Pin'));
			request5.send('c=rmbpost&nation=' + document.querySelector('#USER').value + uaString + '&region=the_north_pacific&c=rmbpost&text=' + rmbPost + '&mode=execute&token=' + request4.responseXML.querySelector('SUCCESS').innerHTML);
			originalTime = (new Date()).getTime();
			
			if(request5.status == 200){
				var request6 = new XMLHttpRequest();
				request6.open('PUT', 'https://api.jsonbin.io/v3/b/65389fe60574da7622bd5cae/', false);
				request6.setRequestHeader('Content-Type', 'application/json');
				request6.send(JSON.stringify(dataIFV))
				alert('Process complete. You may now close this tab.')
			}else{
				alert('Something went wrong.');
			}
		}, delay);
	}else{
		alert('Something went wrong.');
	}
}
