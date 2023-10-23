var request;
var request2;
var request3;

var ministerForumName = 'Magecastle'; // This MUST be updated when the Minister changes.
var ministerNation = 'Magecastle Embassy Building A5';
var delegate = 'Kaschovia' // Likewise, this MUST be updated when there is a new Delegate.

function telegram(){
	var ID;
	var oldCode;
	if(dataIFV.council == 'GA'){
		ID = 1947416;
	}else if(dataIFV.council == 'SC'){
		ID = 1947418;
	}
	var request = new XMLHttpRequest();
	request.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?q=dispatch;dispatchid=' + ID + '&user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value, false);
	request.send();
	oldCode = request.responseXML.querySelector('TEXT').innerHTML.replace('<![CDATA[', '').replace(']]>', ''); 
	var newCode = oldCode.replace('[background-block=#265780][hr][center][b][color=#dfecff]Dispatch[/color][/center][/b][hr][/background-block][/td][/tr]', '[background-block=#265780][hr][center][b][color=#dfecff]Dispatch[/color][/center][/b][hr][/background-block][/td][/tr][tr][td]'
		+ (new Date()).getUTCFullYear() + '-'
		+ ((new Date()).getUTCMonth() + 1) + '-'
		+ (new Date()).getUTCDate() + '[/td][td]'
		+ dataIFV.title + '[/td][td]'
		+ dataIFV.rec
		+ '[/td][td][url=https://www.nationstates.net/page=dispatch/id=' + dataIFV.dispatch + ']Review[/url][/td][/tr]');
	
	request2 = new XMLHttpRequest();
	request2.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value + '&nation=TNP Information for Voters&c=dispatch&dispatch=edit&title=GA Information for WA Voters Compilation&id=1947418&text=' + newCode + '&category=3&subcategory=385&mode=prepare', false);
	request2.setRequestHeader('X-Password', document.querySelector('#PWD').value);
	var originalTime = (new Date()).getTime();
	request2.send();
	if(request2.status != 200){
		request3 = new XMLHttpRequest();
		request3.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value + '&nation=TNP Information for Voters&c=dispatch&dispatch=edit&title=SC Information for WA Voters Compilation&id=1947418&text=' + newCode + '&category=3&subcategory=385&mode=execute&token=' + request2.responseXML.querySelector('SUCCESS').innerHTML, false);
		request3.setRequestHeader('X-Pin', request.getResponseHeader('X-Pin'));
		while((new Date()).getTime() < originalTime + 650){};
		var originalTime = (new Date()).getTime();
		request3.send();
		try{
			dispatchID = request3.responseXML.querySelector('SUCCESS').innerHTML.split('/page=dispatch/id=')[1].split('"')[0];
			dataIFV.dispatch = dispatchID;
			var message = `[b]MINISTRY OF WORLD ASSEMBLY AFFAIRS[/b]
[b]Information for World Assembly Voters[/b]

Greetings %NATION%,

Please find below another volume of the Information for World Assembly voters program.

[u]Resolution at vote:[/u] [b][url=/page=` + dataIFV.council + `]` + dataIFV.title + `[/url][/b]
[u]Forum voting thread:[/u] [b]` + dataIFV.thread + `[/b]
[u]Vote recommendation:[/u] [b]` + dataIFV.rec + `[/b]

[u]` + (function(){if(dataIFV.rec == 'For' || dataIFV.rec == 'Against'){return 'Why vote ' + dataIFV.rec.toLowerCase()}else{return 'Information for Voters:'}})() + `[/u]
` + dataIFV.IFV + `
[spoiler=Help wanted in the Ministry of World Assembly Affairs!]All of us in the Ministry of World Assembly Affairs are proud of the work we accomplish in the Ministry. If you are interested in joining the effort, if you are interested in getting more involved in the World Assembly, possibly as an author or one of our staff putting together information for voters like yourself, then join the Ministry! We want both people who are eager to learn and people who already know their way around the World Assembly and can help us do our job even better. Joining the Ministry of World Assembly Affairs is a great way to get more involved in The North Pacific community.
If you're interested in getting involved, please contact the Minister of World Assembly Affairs, either by personal message on the forums (username: [b]` + ministerForumName + `[/b]) or by telegram (nation: [b][nation=short]` + ministerNation + `[/nation][/b]).

We look forward to hearing from you soon![/spoiler]
[spoiler=Other information]The Delegate casts the regional vote after consulting the results of the forum voting thread linked above, as well as votes held on the RMB of the region [region]TNP Gameside Voting Box[/region]. All World Assembly nations in The North Pacific can vote and discuss there, so make sure to do so!

[b]Please consider endorsing Delegate [nation=short]` + delegate + `[/nation][/b], if you have not already done so. The more endorsements, the more votes The North Pacific has, and the stronger our voice in the World Assembly is!

Finally, you can [b][url=/page=dispatch/id=1079028]read here for additional information on why and how to vote on World Assembly resolutions[/url][/b].[/spoiler]
[i]Sent on behalf of the Ministry of World Assembly Affairs. If you have questions about the above, or if you no longer wish to receive these telegrams, please contact Minister of World Assembly Affairs [nation=short]` + ministerNation + `[/nation].[/i]

https://www.nationstates.net/page=dispatch/id=` + dataIFV.dispatch;
			message = message.replaceAll('&', '\%26').replaceAll('?', '\%3F').replaceAll('=', '\%3D').replaceAll(';', '%3B').replaceAll('\n', '%0D%0A').replaceAll('’', '\'').replaceAll('“', '%22').replaceAll('”', '%22');
			document.body.innerHTML = '<A HREF="https://www.nationstates.net/page=compose_telegram?tgto=' + dataIFV.tg_victims + '&is_recruitment_tg=true&recruittype=campaign&recruitregion=region&message=' + message + '">Telegram link.</A><BR/>For WFE Update: <CODE>[color=' + (function(){if(dataIFV.rec == 'For'){return 'green'}else if(dataIFV.rec == 'Against'){return 'red'}else{return 'orange'}})() + ']' + dataIFV.rec + '[/color][url=https://www.nationstates.net/page=dispatch/id=' + dataIFV.dispatch + '][color=8B8000][u]IFV[/u][/color][/url]</CODE>';
			
		}catch(e){
			alert('Something went wrong.');
		}
	}else{
		alert('Something went wrong.');
	}
}
