const fetch=require('node-fetch');
const prompt=require('prompt-sync')();
const apihost="http://fourtytwowords.herokuapp.com/";
const apikey="api_key=fb8007781a73a8884e3821dc8f330cf2949b422d2a4be2bac9f1d5def50213d48f04cf2869255230d8e5adc4bee08ed27035a7a65745b5184b37848e93a691c099b93b1b072f24ad7908352ed10947e3";
const process=require('process');
const a=process.argv;

async function def(word)
	{	
	const url=apihost+`word/${word}/definitions?`+apikey;
	let data=await fetch(url).then(result=>{return result.json()});
	for(let i=0;i<data.length;i++)
		{
		console.log(data[i]["text"]+"\n");
		}
	}

async function syn(word)
	{
	const url=apihost+`word/${word}/relatedWords?`+apikey;
	let data=await fetch(url).then(result=>{return result.json()});
	for(let i=0;i<data.length;i++)
		{
		if(data[i]["relationshipType"]=="synonym")
			{
			let s=data[i]["words"];
			for(let j=0;j<s.length;j++)
				{
				console.log(s[j]);
				}
			break;
			}
		}
	}

async function ant(word)
	{
	const url=apihost+`word/${word}/relatedWords?`+apikey;
	let data=await fetch(url).then(result=>{return result.json()});
	for(let i=0;i<data.length;i++)
		{
		if(data[i]["relationshipType"]=="antonym")
			{
			let s=data[i]["words"];
			for(let j=0;j<s.length;j++)
				{
				console.log(s[j]);
				}
			break;
			}
		}
	}

async function ex(word)
	{
	const url=apihost+`word/${word}/examples?`+apikey;
	let data=await fetch(url).then(result=>{return result.json()});
	for(let i=0;i<data.examples.length;i++)
		{
		console.log(data.examples[i]["text"]+"\n");
		}
	}

async function dict(word)
	{
	console.log("---------------------------------------------------------------------------------------------------");
	await def(word);
	console.log("---------------------------------------------------------------------------------------------------");
	await syn(word);
	console.log("---------------------------------------------------------------------------------------------------");
	await ant(word);
	console.log("---------------------------------------------------------------------------------------------------");
	await ex(word);
	console.log("---------------------------------------------------------------------------------------------------");
	}

async function randomdict()
	{
	const url=apihost+`words/randomWord?`+apikey;
	let data=await fetch(url).then(result=>{return result.json()});
	let word=data.word;
	console.log(word);
	console.log("---------------------------------------------------------------------------------------------------");
	await def(word);
	console.log("---------------------------------------------------------------------------------------------------");
	await syn(word);
	console.log("---------------------------------------------------------------------------------------------------");
	await ant(word);
	console.log("---------------------------------------------------------------------------------------------------");
	await ex(word);
	console.log("---------------------------------------------------------------------------------------------------");
	}
//game 
let score=0;
async function play()
	{
	const url=apihost+`words/randomWord?`+apikey;
	let data=await fetch(url).then(result=>{return result.json()});
	let randomword="white";
	let hint=[],index=0,syn=0;
	//syn and ant
	const synant=apihost+`word/${randomword}/relatedWords?`+apikey;
	data=await fetch(synant).then(result=>{return result.json()});
	let i=0;
	for(;i<data.length;i++)
		{
		if(data[i]["relationshipType"]=="synonym")
			{
			let s=data[i]["words"];
			for(let j=0;j<s.length;j++)
				{
				hint[index]=s[j];
				syn=index;
				index++;
				}
			break;
			}
		}
	if(i==0)
		i=1;
	else
		i=0;
	let s=data[i]["words"];
	for(let j=0;j<s.length;j++)
		{
		hint[index]=s[j];
		index++;	
		}
	//def
	const urldef=apihost+`word/${randomword}/definitions?`+apikey;
	data=await fetch(urldef).then(result=>{return result.json()});
	for(let i=0;i<data.length;i++)
		{
		hint[index]=data[i]["text"];
		index++;
		}
	score=0;
	playgame(hint,syn,randomword);
	play();
	}

//playgame
async function playgame(hint,syn,randomword)
	{
	console.log("new word");
	let i=1;
	console.log("hint:"+hint[0]);
	let x=tryagain(randomword,hint,syn,i);
	if(x==1)
		return true;
	while(true)
		{
		let flag=0;
		score-=2;
		let opt=prompt("choose option:\n1:try again\n2:hint\n3:skip\n");
		if(opt=="1")
			{
			x=tryagain(randomword,hint,syn,i);
			if(x==1)
				break;
			else
				console.log("your score:"+score);
			}
		else if(opt=="2")
			{
			for(let temp=i;temp<hint.length;temp++)
				{
				score-=3;
				console.log("hint:"+hint[temp]);
				i++;
				x=tryagain(randomword,hint,syn,i);
				if(x==1){
					flag=1;
					break;}
				else{
					console.log("your score:"+score);}
				break;
				}
			if(flag==1)
				break;
			}
		else if(opt=="3")
			{
			score-=4;
			await dict(randomword);
			console.log("your score:"+score);
			console.log("you lose the game");
			break;
			}		
		}
	}

//try again
function tryagain(randomword,hint,syn,i)
	{
	let word=prompt("guess word:");
	if(word==randomword)
		{
		score+=10;
		console.log("your score:"+score);
		console.log("you win the game");
		return 1;		
		}
	else
		{
		for(;i<=syn;i++)
			{
			if(hint[i]==word)
				{
				score+=10;
				console.log("your score:"+score);
				console.log("you win the game");
				return 1;
				}
			}
		}
	return 0;
	}

switch(a[2])
	{
	case "def":def(a[3]);
			break;
	case "syn":syn(a[3]);
			break;
	case "ant":ant(a[3]);
			break;
	case "ex":ex(a[3]);
			break;
	case "dict":dict(a[3]);
			break;
	case "randomdict":randomdict();
			break;
	case "play":play();
			break;
	default:console.log("calling invalid function");
	}
