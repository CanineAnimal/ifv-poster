var request;
var request2;
var request3;

var newCode;
var oldCode;

var ministerRequest = new XMLHttpRequest();
ministerRequest.open('GET', 'https://docs.google.com/spreadsheet/ccc?key=1hBUA7i7n5-0RXNbItLDHA1lb_D9rKQp4JJ1hc5InD8k&single=true&output=csv', false);
ministerRequest.send();
var rows = ministerRequest.responseText.split('\n');
var delegate = rows[1].split(',')[2];
var ministerForumName = rows[2].split(',')[1];
var ministerNation = rows[2].split(',')[2];
var ministerForumName = rows[2].split(',')[1];
var ministerNation = rows[2].split(',')[2]; 

function telegram(){
	var ID;
	oldCode;
	if(dataIFV.council == 'GA'){
		ID = 1947418;
	}else if(dataIFV.council == 'SC'){
		ID = 1947416;
	}
	request = new XMLHttpRequest();
	request.open('GET', 'https://www.nationstates.net/cgi-bin/api.cgi?q=dispatch;dispatchid=' + ID + '&user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value, false);
	request.send();
	oldCode = request.responseXML.querySelector('TEXT').innerHTML.replace('<![CDATA[', '').replace(']]>', ''); 
	newCode = oldCode.replace(/(?=Minister of WA Affairs \[nation\]).*(?=\[\/nation\])/, 'Minister of WA Affairs [nation]' + ministerNation) // Automatically update the Minister's name the first time this tool is used under the new administration
		.replace('[background-block=#265780][hr][center][b][color=#dfecff]Dispatch[/color][/center][/b][hr][/background-block][/td][/tr]', '[background-block=#265780][hr][center][b][color=#dfecff]Dispatch[/color][/center][/b][hr][/background-block][/td][/tr][tr][td]'
		+ (new Date()).getUTCFullYear() + '-' // This script presumably won't be used in the 11th millenium
		+ ((new Date()).getUTCMonth() + 1).toString().padStart(2, '0') + '-'
		+ (new Date()).getUTCDate().toString().padStart(2, '0') + '[/td][td]'
		+ dataIFV.title + '[/td][td]'
		+ dataIFV.rec
		+ '[/td][td][url=https://www.nationstates.net/page=dispatch/id=' + dataIFV.dispatch + ']Review[/url][/td][/tr]');
	
	request2 = new XMLHttpRequest();
	request2.open('POST', 'https://www.nationstates.net/cgi-bin/api.cgi', false);
	request2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Credit to Esfalsa for helping fix this
	request2.setRequestHeader('X-Password', document.querySelector('#PWD').value);
	var originalTime = (new Date()).getTime();
	request2.send('user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value + '&nation=TNP Information for Voters&c=dispatch&dispatch=edit&title=' + dataIFV.council + ' Information for WA Voters Compilation&dispatchid=' + ID + '&category=3&subcategory=305&mode=prepare&text=' + encodeURIComponent(newCode.replaceAll('’', '\'').replaceAll('“', '"').replaceAll('”', '"')));
	if(request2.status == 200){
		request3 = new XMLHttpRequest();
		request3.open('POST', 'https://www.nationstates.net/cgi-bin/api.cgi', false);
		request3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request3.setRequestHeader('X-Pin', request2.getResponseHeader('X-Pin'));
		while((new Date()).getTime() < originalTime + 650){};
		var originalTime = (new Date()).getTime();
		request3.send('user_agent=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value + '&nation=TNP Information for Voters&c=dispatch&dispatch=edit&title=' + dataIFV.council + ' Information for WA Voters Compilation&dispatchid=' + ID + '&category=3&subcategory=305&mode=execute&token=' + request2.responseXML.querySelector('SUCCESS').innerHTML + '&text=' + encodeURIComponent(newCode.replaceAll('’', '\'').replaceAll('“', '"').replaceAll('”', '"')));
		try{
			var message = `[b]MINISTRY OF WORLD ASSEMBLY AFFAIRS[/b]
[b]Information for World Assembly Voters[/b]

Greetings %NATION%,

Please find below another volume of the Information for World Assembly voters program.

[u]Resolution at vote:[/u] [b][url=/page=` + dataIFV.council.toLowerCase() + `]` + dataIFV.title + `[/url][/b]
[u]Forum voting thread:[/u] [b]` + dataIFV.thread + `[/b]
[u]Vote recommendation:[/u] [b]` + dataIFV.rec + `[/b]

[u]` + (function(){if(dataIFV.rec == 'For' || dataIFV.rec == 'Against'){return 'Why vote ' + dataIFV.rec.toLowerCase()}else{return 'Information for Voters:'}})() + `[/u]
` + dataIFV.IFV + `

[b]Please endorse serving Delegate [nation=short]` + delegate + `[/nation][/b], if you have not already done so. The more endorsements, the more votes The North Pacific has, and the stronger our voice in the World Assembly is!
[spoiler=Help wanted in the Ministry of World Assembly Affairs!]
All of us in the Ministry of World Assembly Affairs are proud of the work we accomplish in the Ministry. If you are interested in joining the effort, if you are interested in getting more involved in the World Assembly, possibly as an author or one of our staff putting together information for voters like yourself, then join the Ministry! We want both people who are eager to learn and people who already know their way around the World Assembly and can help us do our job even better. Joining the Ministry of World Assembly Affairs is a great way to get more involved in The North Pacific community.
If you're interested in getting involved, please contact the Minister of World Assembly Affairs, either by personal message on the forums (username: [b]` + ministerForumName + `[/b]) or by telegram (nation: [b][nation=short]` + ministerNation + `[/nation][/b]).

We look forward to hearing from you soon![/spoiler]
[spoiler=Other information]
The Delegate casts the regional vote after consulting the results of the forum voting thread linked above. All World Assembly nations in The North Pacific can vote and discuss there, so make sure to do so!

Additionally, you can [b][url=/page=dispatch/id=1079028]read here for further information on why and how to vote on World Assembly resolutions[/url][/b].[/spoiler]

[i]Sent on behalf of the Ministry of World Assembly Affairs. To unsubscribe, please contact Minister of World Assembly Affairs [nation=short]` + ministerNation + `[/nation].[/i]

https://www.nationstates.net/page=dispatch/id=` + dataIFV.dispatch;
			message = message.replaceAll('=', '%3D').replaceAll('#', '%23').replaceAll('&', '%26').replaceAll('?', '%3F').replaceAll('=', '%3D').replaceAll(';', '%3B').replaceAll('\n', '%0D%0A').replaceAll('’', '\'').replaceAll('“', '%22').replaceAll('”', '%22').replaceAll('"', '%22').replaceAll('"', '%22');
			document.body.innerHTML = '<A HREF="https://www.nationstates.net/page=compose_telegram?tgto=' + dataIFV.tg_victims.replaceAll('+', '%2B') + '&is_recruitment_tg=true&recruittype=campaign&recruitregion=region&message=' + message + '&generated_by=Script by The Ice States (Github: https://github.com/CanineAnimal/ifv-poster) in use by ' + document.querySelector('#USER').value + '">Telegram link.</A><BR/><STRONG>Make sure to update the WFE!</STRONG>';
		}catch(e){
			alert('Something went wrong.');
		}
	}
}
