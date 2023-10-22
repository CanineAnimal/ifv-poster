var request3;
function postIFV(){
	var request = new XMLHttpRequest();
	request.open('GET', 'https://api.jsonbin.io/v3/b/65342bcb54105e766fc54cf5/', false);
	request.setRequestHeader('X-Access-Key', '$2a$10$EefMBg.2WaB13XfoEV6sbOcGM6vHP9dDhncgVTuCf3VX/9y2V2Csm');
	request.send(); 
	dataIFV = JSON.parse(request.responseText).record;
	IFVtext = `[background-block=#265780][hr][center][floatleft][img]https://forum.thenorthpacific.org/images/dispatches/tnp_header.png[/img][/floatleft][size=200][color=#dfecff]` + (function(){if(dataIFV.council == 'SC'){return 'Security Council '}else{return 'General Assembly '}})() + `Vote Recommendation[/color][/size][/center][hr][center][b][size=125] [/size][color=#dfecff]Part of the[/color] [url=/page=dispatch/id=724191][color=#94c248]Information for WA Voters[/color][/url] [color=#dfecff]program[/color][size=125] [/size][/b][/center][hr][/background-block]
[box][size=150][color=#265780]Resolution at Vote: [url=/page=` + dataIFV.council + `]` + dataIFV.title + `[/url][/color][/size]
[size=150][color=#265780]Vote Recommendation:[/color] [b]` + dataIFV.rec + `[/b][/size][/box]

[size=150][color=#265780]Resolution Analysis[/color][/size]
` + dataIFV.ifv + `

[size=150][color=#265780][url=` + dataIFV.thread + `]Join our discussion![/url][/color][/size]
[background-block=#265780][hr][center][img]https://forum.thenorthpacific.org/images/ifv/tnp_wa_voting_footer.png[/img]
[b][color=#dfecff]Sponsored by the[/color] [url=http://forum.thenorthpacific.org/forum/39609/][color=#94c248]Ministry of World Assembly Affairs[/color][/url] [color=#dfecff]of The North Pacific.[/color][/b][/center][hr][/background-block]`;
	IFVtext = IFVtext.replaceAll('&', '\%26').replaceAll('?', '\%3F').replaceAll('=', '\%3D').replaceAll(';', '%3B').replaceAll('\n', '%0D%0A').replaceAll('’', '\'').replaceAll('“', '%22').replaceAll('”', '%22');
	if(confirm('Confirming that IFV ' + dataIFV.rec.toLowerCase() + ' ' + dataIFV.title + ' will be posted? Click OK below to confirm.')){
		var request2 = new XMLHttpRequest();
		request2.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value + '&nation=' + document.querySelector('#USER').value + '&c=dispatch&dispatch=add&title=' + dataIFV.titleRec + ' ' + dataIFV.council + ' resolution ' + dataIFV.title + '&text=' + IFVtext + '&category=3&subcategory=385&mode=prepare');
		request2.setRequestHeader('X-Password', document.querySelector('#PWD').value);
		var originalTime = (new Date()).getTime();
		request2.send();
		var request3 = new XMLHttpRequest();
		request3.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value + '&nation=' + document.querySelector('#USER').value + '&c=dispatch&dispatch=add&title=' + dataIFV.titleRec + ' ' + dataIFV.council + ' resolution ' + dataIFV.title + '&text=' + IFVtext + '&category=3&subcategory=385&mode=execute&token=' + request2.responseText);
		request3.setRequestHeader('X-Pin', request2.getResponseHeader('X-Pin'));
		while((new Date()).getTime() < originalTime + 650){};
		var originalTime = (new Date()).getTime();
		request3.send();
		console.log(request3);
	}else{
		alert('Cancelled IFV posting.');
	}
}
