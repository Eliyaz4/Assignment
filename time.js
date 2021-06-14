let date=new Date();
let x=1;
let hrs=0,mins=0,secs=0;
let temp=prompt("enter 1:default time 2:set time");
if(temp==1)
	{
	hrs=date.getHours();
	mins=date.getMinutes();
	secs=date.getSeconds();
	}
else if(temp==2)
	{
	hrs=prompt("enter hours");
	mins=prompt("enter mins");
	secs=prompt("enter secs");
	hrs=Number(hrs);
	mins=Number(mins);
	secs=Number(secs);
	}
setInterval(()=>{
		secs++;
		if(secs==60)
			{
			secs=0;
			mins++;
			if(mins==60)
				{
				mins=0;
				hrs++;
				if(hrs==25)
					{
					hrs=0;
					}
				}
			}
		console.log(hrs+":"+mins+":"+secs);
		},1000);
