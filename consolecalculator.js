const prompt=require('prompt-sync')();
let x=prompt("enter x number:");
let y=prompt("enter y number:");
let oper=prompt("enter arthemetic operator:");

function calculator(x,y,oper)
	{
	x=Number(x);
	y=Number(y);
	if(oper=="+")
		return x+y;
	else if(oper=="-")
		return x-y;
	else if(oper=="*")
		return x*y;
	else if(oper=="/")
		return x/y;
	else if(oper=="%")
		return x%y;
	else if(oper=="**")
		return x**y;
	else
		return "invalid operator";
	}
console.log(calculator(x,y,oper));
