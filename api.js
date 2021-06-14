const url="https://api.apify.com/v2/datasets/58a4VXwBBF0HtxuQa/items?format=json&clean=1";
async function getapi(url,state,x,index)
	{
	const response=await fetch(url);
	const data=await response.json();
	for(let i=0;i<data.length;i++)
		{
		if(data[i].regionData)
			{
			let temp=data[i].regionData;
			for(let j=0;j<temp.length;j++)
				{
				if(temp[j].region==state)
					{
					x[index]=temp[j];
					index++;
					}
				}
			}
		}
	console.log(x);
	console.log(state);
	}
let state=prompt("enter state name");
getapi(url,state,[],0);
