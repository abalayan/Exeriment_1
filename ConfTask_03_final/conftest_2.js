// Array with the list of 40 5-letters sequences
//Start Trials

var trialId = 0; 
var present =  document.getElementById("present"); //Show sequence for typing
var type = document.getElementById("type"); // Show typed sequence
var evaluate = document.getElementById("evaluate"); // Show sequences for evaluation
var trialid = document.getElementById("trialid"); //Show trial ID
var instr = document.getElementById("instr"); //Show instraction for trials
var seqIndex = 0; // Current sequence index
var letterIndex=0; // Current letter index
var currSeq = ""; //Variable for current sequence
var SeqStartTime=new Date().getTime(); //Time when sequence is presented
var LettTime = new Date().getTime();
var TypedLetters=""; //Variable for current letter
var DiffTimes = ""; //Variable for RT
var evalIndex=0; //Index of trial in the evaluation phase
var blockIndex=0; // Index of block in the evaluation phase
var points = document.getElementById("points"); //todo remove
var pointsvalue=0;
//var data = document.getElementById("data");
var data = opener.document.mturk_form.data;
var Demographics = document.getElementById("Demographics");
var ShowInstructions = document.getElementById("ShowInstructions");
var popupWindow;
var deminfo = "";
var BrowserInfo ="";

//var sliderDiv = document.getElementById("rangeamount");

mainarray=[
"ujlkg", 
"qlfhx", 
"zvidw", 
"gcblx", 
"ewitl", 
"uhgaf", 
"dqycb", 
"oqlfi", 
"diqrn", 
"vahfi", 
"jvbia", 
"tyjzn", 
"colqp", 
"dpkzh", 
"zqwnc", 
"ajehc", 
"wovat", 
"wyngv", 
"lwdnq", 
"yzdsj", 
"gfyxm", 
"sejgn", 
"lzxhg", 
"arjod", 
"nifcw", 
"upetd", 
"tvswe", 
"kmigu", 
"dwxgi", 
"dgzhj", 
"ahcqt", 
"sbrok", 
"gwcqb", 
"fdzcl", 
"vcnwp", 
"snboq", 
"eyvzi", 
"dhypx", 
"npios", 
"qoncg"];


temparray1=mainarray.concat(mainarray);
temparray2=temparray1.concat(temparray1);
temparray=temparray2.concat(mainarray);

trialarray=randomizearray(mainarray);

var arrLen=mainarray.length;
var arrLenHalf=(arrLen/2);

var tempevalarray = [];
for (i=0; i<arrLenHalf; i++)
	{
	tempevalarray.push([mainarray[i],(mainarray[i+arrLenHalf])]);
	tempevalarray.push([mainarray[i+arrLenHalf],mainarray[arrLenHalf-i-1]]);		
	}

var evalarray = randomizearray(tempevalarray);	



// Show function
//showSeq();
// ToDo Add start page with practice trials for typing and evaluation phases


function goToTest()
{
// record data from demographics
	deminfo = $("#Country").val() + "," + $("#Sex:checked").val() + "," +
  			$("#Age:checked").val() + "," + $("#Hand:checked").val() + "," +
  			$("#Vision:checked").val() + "," + $("#English:checked").val();
	Demographics.style.display="none";
	data.value="deminfo:"+deminfo+":";

	window.addEventListener("keypress", dealWithKeyboard, false);	
	showSeq();
}



// Function to generate sequence with colored letter
function generateSeq(word,colorindex)
{
	colorindex = typeof colorindex !== 'undefined' ? colorindex : 0;
	n="";
	for (var i = 0; i<word.length; i++) 
	{		
		if(i==colorindex)
		{
			n+="<font color='green'>"+word[i]+"</font>";	
		}
		else
		{
			n+=word[i];	
		}		
	};
	return n;
}

// Function to show sequences for the typing phase

function showSeq(letterIndex)
{
		
	if(seqIndex==trialarray.length) //If all sequences were typed -> proceed with evaluation phase
	{
		type.innerHTML="";
		present.innerHTML="";
		instr.innerHTML="You just finished the typing part of the experiment.";
		instr.innerHTML+=" In the next phase you will see sequences you just typed.";
		instr.innerHTML+=" In each trial two different sequences will be presented.";
		instr.innerHTML+=" Your task is to evaluate which one you typed faster.";
		instr.innerHTML+=" Then, you will evaluate a level of confidence about your answer.";	
		instr.innerHTML+=" Please, click Continue to proceed with the next phase";		
		evaluate.innerHTML="<br /><button value='start' onclick='evaluate1()'>Continue</button>";
		trialid.innerHTML="";
		return;
		
	}

	trialId=seqIndex+1;
	currSeq = trialarray[seqIndex];
	currSeqHTML = generateSeq(currSeq,letterIndex);
	trialid.innerHTML = "Trial "+trialId+" from "+trialarray.length+" to complete."; 
	instr.innerHTML = "Type this sequence as fast as you can";
	present.innerHTML = currSeqHTML;
	
	if(letterIndex==0) //Record starting time for each sequence
	{
		SeqStartTime = new Date().getTime();
	}

}

// Function to type sequences
function dealWithKeyboard(e)
{
	typedchar = String.fromCharCode(e.charCode);
	TypedLetters+=typedchar;	
	if(typedchar==trialarray[seqIndex][letterIndex]) //check if typed letter is correct
	{
		LettTime = new Date().getTime();
		diffTime = LettTime-SeqStartTime;
		DiffTimes+= "," + diffTime;
		type.innerHTML+=typedchar;
		letterIndex++;
		showSeq(letterIndex);

	}


	if(letterIndex==currSeq.length)	//Get RTs and proceed with the next sequence
	{
		letterIndex=0;
		
		data.value+="Practice" + "," + trialarray[seqIndex]+",";
		data.value+=TypedLetters;
		data.value+=DiffTimes+":";
		
		seqIndex++;
//		trialid.innerHTML=seqIndex+1;
		
		TypedLetters="";
		showSeq(letterIndex);
		type.innerHTML="";
		DiffTimes="";

	}


}

//Function to start the evaluation phase

function evaluate1()
{


//	evaluate.innerHTML="<span class='textt'>Choose which sequence you typed faster</span>";
	bl = blockIndex+1;
	trialId = evalIndex+1;
	trialid.innerHTML = "Block "+ bl +" from "+ "5<br />";
	trialid.innerHTML+= "Trial " + trialId + " from "+evalarray.length+ " to complete"; 	
//	instr.innerHTML = "This is the trial "+trialId+" from the total of "+evalarray.length+" trials";
	instr.innerHTML = "Choose which sequence you typed faster";
	evaluate.innerHTML='<button class="answbutton" name="quest0" value="0" onclick="answer(this)">'+evalarray[evalIndex][0]+'</button>';
	evaluate.innerHTML+='<button class="answbutton" name="quest1" value="1" onclick="answer(this)">'+evalarray[evalIndex][1]+'</button>';
	LettTime = new Date().getTime();

}

//Function to process answers in the evaluation phase
function answer(x)
{
	diffTime = new Date().getTime() - LettTime;
//	bl = blockIndex+1;
	data.value+="Evaluate"+","+(evalIndex+1)+","+"Block"+bl+","+evalarray[evalIndex];
	data.value+=","+evalarray[evalIndex][x.value];
	data.value+=","+diffTime;
	showslider();
}



function goNextQuestion() // Go to a next pair of sequences in the evaluation phase
{

	if(blockIndex==4 && evalIndex==evalarray.length-1) // to change 1 with 4 
	{
		instr.innerHTML="You have finished the test."
		instr.innerHTML+="<br />Please, press the button to close the window"
		instr.innerHTML+=" and return to the Amazone Mechanical Turk."		
//		evaluate.innerHTML="";

//		var mturk= document.getElementById("mturk_form");
//		var submButton= document.getElementById("submitButton");
		
		trialid.innerHTML="";
		evaluate.innerHTML="<button onclick='window.opener.endofExp();window.close()'>Close window</button>";
//		mturk.style.display="block"; 
//		submButton.style.display="block";
		return;
	}

	if(evalIndex==evalarray.length-1)
	{
		
		trialid.innerHTML="";
//		evaluate.innerHTML="";
		instr.innerHTML="You have finished the block "+ (blockIndex+1) + " of the total 5 blocks. ";
		evalarray = randomizearray(tempevalarray);
		instr.innerHTML+="Please, click the button to proceed with the block " +(blockIndex+2);				
		evaluate.innerHTML="<button onclick='evaluate1()'>Next block</button>";
		blockIndex++;
		evalIndex=0;
		evalarray = randomizearray(tempevalarray);
		return;
	}
	
	evalIndex++;
	evaluate1();
}

function showslider() //Generate and show slider
{
	instr.innerHTML = 'How confident you are that you typed '+'"<b>'+evalarray[evalIndex][0]+'</b>"'+ ' faster than '+'"<b>'+evalarray[evalIndex][1]+'</b>"'+'?';
	instr.innerHTML += " Please, evaluate your confidence on the scale from 0 to 100.<br />";	
   	evaluate.innerHTML='0 <input type="range" name="points" id="points" min="0" value=0 max="100" oninput="changeConfValue(this.value)" onchange="sliderTime(this.value)"> 100';
	evaluate.innerHTML+='<span id="rangeamount">0</span>';
   	evaluate.innerHTML+='<br /><button style="answbutton" name="slider" onclick="processslider()">Confirm</button>';
	pointsvalue=0;

   	LettTime = new Date().getTime();
}

// Function to process slider selection
function processslider()
{
	var points = document.getElementById("points");
	pointsvalue=points.value;
	evalarray[evalIndex].push(pointsvalue);	
	evaluate.innerHTML="";
	diffTime = new Date().getTime() - LettTime;
	data.value+=","+pointsvalue+","+diffsliderTime;
	data.value+=","+diffTime+":";
	pointsvalue=0;
	goNextQuestion();
}

function goNextTrial()
{

	if(seqIndex!=trialarray.length)
	{
		
		seqIndex++
		showSeq();
	}
	else
	{
		goNextQuestion();
	}
}

function sliderTime(h) // record time on slider final movement
{
	diffsliderTime = new Date().getTime() - LettTime;
}

function changeConfValue(h) // record slider value 
{
//    if(pointsvalue==0)
 //   {
 		sliderTime();			   	
//    }
	var sliderDiv = document.getElementById("rangeamount");
    sliderDiv.innerHTML = h;

//}
 //   if(pointsvalue==0)
 //   {
 //		sliderTime();			   	
    }

function randomizearray(t){ // randomize a given array
    var tt= t;
    var n = 0;
    var a = "";
    var b = "";
    var i = 0;
    for (i=0; i <= t.length-1; i++){
        n = Math.floor(Math.random()*t.length);
        a = tt[i];
        b = tt[n];
        tt[i] = b;
        tt[n] = a;    
    }
    return tt;
} 
  
//prevent default keys
//32 - whitespace, 8 backspace
$(document).on("keydown", function (e) {
    if ((e.which === 8 || e.which === 32) && !$(e.target).is("input, textarea")) {
        e.preventDefault();
    }
});
	

	function basicPopup(url) {
		popupWindow = window.open(url,'popUpWindow','height=' + screen.availHeight + ',width=' +screen.availWidth+',\
		left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no,\
		menubar=no,location=no,directories=no,status=no');
		window.close();
		//popupWindow.opener.document.write("<p>asdfadsfadsf</p>");

	}
	
		function basicPopup2(url) {
		popupWindow2 = window.open(url,'popUpWindow2','height= 300,width=400,\
		left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no,\
		menubar=no,location=no,directories=no,status=no');
	}
	
function msieversion() {

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
//            alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
			BrowserInfo = "Explorer";
        else                 // If another browser, return 0
            BrowserInfo = "Other";

   return false;
}