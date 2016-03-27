// Create 40 randomized 5-letters sequences from the alphabet
// Create array for typing trials; record sequences in trialarray 

var abcLetters = [];
var seqtemp ='';
var Seq = [];
var tempArray = [];
var newArray=[];

for (var i = 0; i < 26; ++i) {
	abcLetters[i] = String.fromCharCode(i + 97);
}

for (i = 0; i < 40; ++i) {
	seqtemp = getRandomSubarray(abcLetters,5);
	Seq.push(seqtemp.join(""));
} 

trialarray = Seq; // Array the list of 40 5-letters sequences


mainarray=[
["ujlkg"], 
["qlfhx"], 
["zvidw"], 
["gcblx"], 
["ewitl"], 
["uhgaf"], 
["dqycb"], 
["oqlfi"], 
["diqrn"], 
["vahfi"], 
["jvbia"], 
["tyjzn"], 
["colqp"], 
["dpkzh"], 
["zqwnc"], 
["ajehc"], 
["wovat"], 
["wyngv"], 
["lwdnq"], 
["yzdsj"], 
["gfyxm"], 
["sejgn"], 
["lzxhg"], 
["arjod"], 
["nifcw"], 
["upetd"], 
["tvswe"], 
["kmigu"], 
["dwxgi"], 
["dgzhj"], 
["ahcqt"], 
["sbrok"], 
["gwcqb"], 
["fdzcl"], 
["vcnwp"], 
["snboq"], 
["eyvzi"], 
["dhypx"], 
["npios"], 
["qoncg"]];

var tempArray = [];
var newArray=[];
// Sample 20 sequences without replacement from the list of 40 
tempArray=getRandomSubarray(mainarray, 20);
for (i=0; i<40; i++){
	if (inArray(mainarray[i], tempArray)==false){
	newArray.push(trialarray[i]);
	}
}

arrayEval = tempArray.concat(newArray);

// Function for randomly sampling without replacement from an array using the Fisher-Yates shuffle
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

// Check if element of one array presents in another one
function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

var evalarray = [[]];
for (i=0; i<20; i++){
	evalarray[i]=mainarray[i].concat(mainarray[i+20]);
	evalarray[i+20]=mainarray[i+20].concat(mainarray[39-i]);		
	}
	
var str="";
for (i = 0; i<evalarray.length; i++){
    str += evalarray[i];
    }
    ClipPut(str)