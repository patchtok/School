// clearing input boxes on click
const inputElement = document.getElementsByTagName('input');

for( var i=0 ; i<inputElement.length ; i++){
    
inputElement[i].addEventListener('click', function (event) {
    var idTemp=event.target.id;
    document.getElementById(idTemp).value="";
});
    
}
// gcd section-----------------------------
document.getElementById("gcdButton").addEventListener('click',
                                        function(event){

var a=document.getElementById("numOne").value;
var b=document.getElementById("numTwo").value;
//validate and output error if necessary
if(!(a>1 && b>1)){
    document.getElementById("gcdOut").innerHTML="You need two whole numbers greater than 0" ; 
    return;}
// get gcd
var t=0;
    t=gcd(a,b);

//output t as result
document.getElementById("gcdOut").innerHTML = "Highest Common Factor is: "+t;   
    
});
// lcm section -------------------------------
document.getElementById("LCMButton").addEventListener('click',
                                        function(event){

var a=document.getElementById("LCMOne").value;
var b=document.getElementById("LCMTwo").value;
if(!(a>1 && b>1)){
    document.getElementById("LCMOut").innerHTML="You need two whole numbers greater than 0" ; 
    return;}
var lcm = a*b/gcd(a,b);
    document.getElementById("LCMOut").innerHTML="Lowest Common Multiple is: "+lcm ; 
    
    
 
    
});
//prime numbers section ----------------------
document.getElementById("primeButton").addEventListener('click',
                                    function(event){
var count=0;
var a=document.getElementById("primOne").value;
var b=document.getElementById("primTwo").value;
//validate and output error if necessary
if(!(a>0 && b>0)){
    document.getElementById("PrimeOutput").innerHTML="You need two whole numbers greater than 0" ; 
    return;
}
    
if(Number(a) > Number(b)){
    document.getElementById("PrimeOutput").innerHTML="Your first number needs to be less than the second <br> Number a= "+a+" Number b= "+b ; 
    return;
}
//start     
var primeArray=getPrimeNumbers(a,b);
//-----
// organise for output
// char length count
var pCount=0;
var outString=""
for(k=0;k<primeArray.length;k++){
if(primeArray[k]>a){
outString+=primeArray[k]+",";
count++;
pCount+=primeArray[k].toString().length+1;
if(pCount>45){
outString+="<br>";
pCount=0;
}
}
}
outString+="<br> The number of primes is: "+count;
document.getElementById("PrimeOutput").innerHTML = outString;
    
});

//getting factors-------------------------------
document.getElementById("factorsButton").addEventListener('click',
                                    function(event){
    var n=document.getElementById("factOne").value;
/*    if (data === parseInt(data, 10))
    alert("data is integer")
else
    alert("data is not an integer")*/
    var factorArray=new Array();
    var pFactorPowerPair=new Array();
    pFactorPowerPair[0]=[];
    pFactorPowerPair[1]=[];
    // fix for prime numbers
    //var prmArray=getPrimeNumbers(2,Math.floor(Math.sqrt(n)));
    var prmArray=getPrimeNumbers(2,Number(n)+1);
    var finding=true;
    var count=0;
    var temp=0;
    temp=n;
    var counter=0;
    while(finding){
        var powerCount =0;
        while(temp%prmArray[count]==0){
            temp=temp/prmArray[count];
            factorArray[factorArray.length]=prmArray[count];
            powerCount+=1;
            if(temp==1){
                finding=false;
            }
        }
    if(powerCount>0){
    pFactorPowerPair[0].push(prmArray[count]);
    pFactorPowerPair[1].push(powerCount);
        }
        powerCount=0;
        count++;
        // not necessary ?
        if(count==prmArray.length){
            finding=false;
        }
        }

    var hold=new Array();
    // get list of all factors
    hold=writeFactorList(pFactorPowerPair);
    var factorString="";
    for(i=0; i<hold.length/2; i++){
        factorString+=hold[i]+","+hold[hold.length-1-i]+"<br>";
    }
   // output factors
document.getElementById("FactorsOutput").innerHTML="Prime Factors: "+factorArray.toString()+"<br> Multiplied factors = "+multiplyArray(factorArray)+"<br> Factor List =<br>"+factorString; 
    
});

//getting factors-------------------------------
document.getElementById("RootButton").addEventListener('click',
                                    function(event){
var a=document.getElementById("SRootOne").value;
    a= a.replace(/,/g,"");
    console.log(a);
var L=0;
var U=Number(a);
    for(var i=0; i<100; i++){
        var temp =(L+U)*0.5;
        var p=Math.pow(temp,2);

        
        if(p==a){ break;}
        
        if(p<a){L=temp}else{U=temp;}
        
    }
    console.log(temp);
   
    
    
});
//-------------------functions---------------------
// gcd algorithm
function gcd(a,b){
//swap variables so a greater than b.
    if(b > a){
        var temp=a; 
        a=b; 
        b=temp;
        }
// all set and now do algorithm
    var t=0;
    while(b!=0){
        t=b;
        b=a%t;
        a=t;
        }
    return t;
}

// return an array of prime numbers between a and b
function getPrimeNumbers(a,b){
var primeArray=new Array();
// initialise with prime of 2
primeArray[0]=2;
// prime algorithm
//-----
for(i=2;i<b;i++){
    
var prime=true;
    
for(j=0;j<primeArray.length;j++){
// respond if not prime
if(i%primeArray[j]==0){ 
j=primeArray.length;
prime=false;
}
    
}
    
if(prime){
primeArray[primeArray.length]=i;
}
    
}
//----
return primeArray;
    
}
// multiply elements in an array and returns the value
function multiplyArray(p){
var temp=1;
for(i=0; i<p.length; i++){
temp=temp*p[i];
}
return temp;
}
// receives 2 dimensional array from factor listing
function writeFactorList(b){
//factor list is b[0];
//max powers is b[1];
var temp=new Array();
temp[0]=1;
var count=1;
var tick=0;
// getting all permutations
while(tick<b[0].length){
var l=temp.length;
for (i=0; i<l; i++){
for(j=1; j<=b[1][tick]; j++){
temp[count]=simplePower(b[0][tick],j)*temp[i];
//console.log(simplePower(b[0][tick],j)+","+temp[i]);
count++;
}
//console.log("-");
}
//console.log("+");
tick++;
}
// sort array before returning
return selectionSort(temp);
}

// receives 1 dimensional array of numbers
function selectionSort(c){
var smallest=-1;
var temp= -1;
//--
for(i=0; i<c.length; i++){
smallest=c[i];
temp=i;
//----
for(j=i+1; j<c.length; j++){
if(c[j]<smallest){
smallest=c[j];
temp=j;}
}
//----
//swap
if(smallest!=c[i]){
var hold=c[i];
c[temp]=hold;
c[i]=smallest;
}
}
//--
return c;
}
// simple power function
function simplePower(a,b){
if(b==0){return 1;}
var temp=a;
var count=1;
while(count<b){
temp=temp*a;
count++;
}
return temp;
}
//---------------------------------------------------------------