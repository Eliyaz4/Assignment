const fetch=require('node-fetch');
const prompt=require('prompt-sync')();
const url="https://api.apify.com/v2/datasets/58a4VXwBBF0HtxuQa/items?format=json&clean=1";
async function getapi(url,state)
	{
	const data=await fetch(url).then(result=>{return result.json();});
	for(let i=0;i<data.length;i++)
		{
		if(data[i].regionData)
			{
			let temp=data[i].regionData;
			for(let j=0;j<temp.length;j++)
				{
				if(temp[j].region==state)
					{
					temp[j]["date"]=data[i].lastUpdatedAtApify;
					console.log("region       :"+temp[j].region);
					console.log("date         :"+temp[j].date);
					console.log("activeCases  :"+temp[j].activeCases);
					console.log("newInfected  :"+temp[j].newInfected);
					console.log("recovered    :"+temp[j].recovered);
					console.log("newRecovered :"+temp[j].newRecovered);
					console.log("deceased     :"+temp[j].deceased);
					console.log("newDeceased  :"+temp[j].newDeceased);
					console.log("totalInfected:"+temp[j].totalInfected);						console.log("_________________________________________________________________");							console.log("                                                                 ");
					}
				}
			}
		}
	//console.log(state);
	}
let state=prompt("enter state name");
getapi(url,state);
