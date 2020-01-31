//**********************************************************************\\
//														 				\\
//		Author: Himanshu Sharma 						 				\\
//				himanshusharma2972@gmail.com 			 				\\
//				github.com/himanshusharmacool 			 				\\
//														 				\\
//		About : It is a simple Syntax Higlighlighter 	 				\\
//				that you can use to Highlight syntax 	 				\\
//				in your blog or website.				 				\\
//				Read the Readme for more Info.			 				\\
//													 					\\
//**********************************************************************\\


/********* defining highlighted word *******************/
var keywords = "System|do|for|while|switch|break|continue|endl|if|else|return|try|true|false|";
	keywords +="import|#include|namespace|case|default|auto|sizeof|static|this|throws|throws|";
	keywords +="null|static|public|private|protected|friend|package|new|interface|goto|extends|catch|const|boolean|virtual";

var datatypes = "(int|float|char|double|long|string|void|var|class|struct|union)";
var sentence = "(\".+?\")|(\'.+?\')";
var comments = "((\/\/.+))|(\/\\*[\\S\\s]+?\\*\/)";
var funname = "((\\w+(?=[\\(])))";
var EXP_JOINER  = '|';


/******* compiling patterns ************/
var KEYWORD_REGEX = new RegExp(keywords);
var SENTENCE_REGEX = new RegExp(sentence);
var COMMENTS_REGEX = new RegExp(comments);
var FUNNAME_REGEX = new RegExp(funname);
var DATATYPES_REGEX = new RegExp(datatypes);

/******** combining all patterns  ********/
var EXP_ALL = '';

EXP_ALL = EXP_ALL + comments + EXP_JOINER;
EXP_ALL = EXP_ALL + sentence  + EXP_JOINER;
EXP_ALL = EXP_ALL + funname  + EXP_JOINER;
EXP_ALL = EXP_ALL + datatypes + EXP_JOINER;
EXP_ALL = EXP_ALL + keywords;


/********* Storing Color Code *************/
var Comment_Color = null;
var DataType_Color = null;
var Sentence_Color = null;
var Keyword_Color = null;
var Funname_Color = null;
var Background_Color = null;

/*******  Creating Array Of Color For Different Theme Purpose   *******/

	var ColorCodeCollection = [];	//Store Colors Of Different Type of Tags

	// Array no is converted into meaningful name
	var Background_Color_No = 0;
	var Font_Color_No = 1;
	var Comment_Color_No = 2;
	var DataType_Color_No = 3;
	var Sentence_Color_No = 4;
	var Keyword_Color_No = 5;
	var Funname_Color_No = 6;



var START_MATCHPOINTS = [];  //This is used to store the starting index of matched pattern
var END_MATCHPOINTS = [];	 //This is used to store the last index of matched pattern





//main function started
function highlighter(ColorCodeCollection)
{
	//console.log(ColorCodeCollection);
	//	Adding Color According To Theme
	Background_Color = ColorCodeCollection[Background_Color_No];
	Font_Color = ColorCodeCollection[Font_Color_No];
	Comment_Color = ColorCodeCollection[Comment_Color_No];
	DataType_Color = ColorCodeCollection[DataType_Color_No];
	Sentence_Color = ColorCodeCollection[Sentence_Color_No];
	Keyword_Color = ColorCodeCollection[Keyword_Color_No];
	Funname_Color = ColorCodeCollection[Funname_Color_No];


	var obj=null;	//This is used to store the collection of blare_synhighlighter class
	var formattedText="";	//This is used to store the highlighted text
	var highlightedContent;			//This will store content of each class


	//Getting Syntax Highlighter  classes in obj
	var inputContent=document.getElementById('input');
	var outputContent = document.getElementById('output-area');
	//console.log(obj.length);

	//compiling all pattern  at once
	var EXPRESSION = new RegExp(EXP_ALL,'g');

	
		outputContent.style.background=Background_Color;
		outputContent.style.color = Font_Color;
		
		//getting content of class
		highlightedContent = inputContent.value;
		highlightedContent=  highlightedContent.replace(/</g,"&lt;");
		highlightedContent=  highlightedContent.replace(/>/g,"&gt;");
		//collecting location of matched pattern in highlightedContent
		while((match = EXPRESSION.exec(highlightedContent))!==null)
		{

			START_MATCHPOINTS.push(match.index);
			END_MATCHPOINTS.push(EXPRESSION.lastIndex);

		}

		//adding syntax highlighter
		for(var i = (START_MATCHPOINTS.length-1);i>=0;i--)
		{
			var content = highlightedContent.substring(START_MATCHPOINTS[i],END_MATCHPOINTS[i]);
			var funcontent = highlightedContent.substring(START_MATCHPOINTS[i],END_MATCHPOINTS[i]+2);
			//console.log(content);

			if(COMMENTS_REGEX.test(content))
			{
				formattedText = '<span style=\"color:'+Comment_Color+'\"  >'+content+'</span>';
			}
			else if(SENTENCE_REGEX.test(content))
			{

				formattedText= '<span style=\"color:'+Sentence_Color+'\"  >'+content+'</span>';

			}
			else if(FUNNAME_REGEX.test(funcontent))
			{
				formattedText= '<span style=\"color:'+Funname_Color+'\"  >'+content+'</span>';				
			}
			else if(KEYWORD_REGEX.test(content))
			{
				formattedText = '<span style=\"color:'+Keyword_Color+'\"  >'+content+'</span>';

			}
			else if(DATATYPES_REGEX.test(content))
			{
				formattedText = '<span style=\"color:'+DataType_Color+'\"  >'+content+'</span>'
			}
			else
			{
				console.log("no matched");
				//function highlighter
				//formattedText = '<span style=\"color:'+Funname_Color+'\"  >'+content+'</span>';
			}

			//console.log(formattedText)
			//changing original text with formatted text in highlightedContent
			highlightedContent = highlightedContent.substring(0,START_MATCHPOINTS[i])+formattedText+highlightedContent.substring(END_MATCHPOINTS[i]);
		}

		

		//adding line numbers to highlightedContent
		var tmp = highlightedContent;
		var linenum = "<ol>\n";
		var NEW_LINE = new RegExp(".+\n",'g');
		while((match = NEW_LINE.exec(tmp))!==null)
		{
			linenum = linenum + '<li>' + tmp.substring(match.index,NEW_LINE.lastIndex)+'</li>'+'\n';
		}
		linenum = linenum + '</ol>';

		//console.log(linenum);
		highlightedContent=linenum;

		//changing original content of class with new content
		outputContent.innerHTML=highlightedContent;

		//reinitializing start and end points
		START_MATCHPOINTS = [];
		END_MATCHPOINTS = [];
	



}





function suffleTheme()
{
	var TmpRed = null;
	var TmpGreen = null;
	var TmpBlue =null;

		TmpRed = Math.floor(Math.random()*250);
		TmpGreen = Math.floor(Math.random()*250);
		TmpBlue = Math.floor(Math.random()*250);

		ColorCodeCollection[Background_Color_No] = 'rgb('+TmpRed+','+TmpGreen+','+TmpBlue+')';

		TmpRed = Math.floor(Math.random()*200);
		TmpGreen = Math.floor(Math.random()*300);
		TmpBlue = Math.floor(Math.random()*300);

		ColorCodeCollection[Font_Color_No] =  'rgb('+TmpRed+','+TmpGreen+','+TmpBlue+')';

		TmpRed = Math.floor(Math.random()*250);
		TmpGreen = Math.floor(Math.random()*250);
		TmpBlue = Math.floor(Math.random()*250);

		ColorCodeCollection[Comment_Color_No] =  'rgb('+TmpRed+','+TmpGreen+','+TmpBlue+')';

		TmpRed = Math.floor(Math.random()*250);
		TmpGreen = Math.floor(Math.random()*250);
		TmpBlue = Math.floor(Math.random()*250);

		ColorCodeCollection[DataType_Color_No] =  'rgb('+TmpRed+','+TmpGreen+','+TmpBlue+')';

		TmpRed = Math.floor(Math.random()*250);
		TmpGreen = Math.floor(Math.random()*250);
		TmpBlue = Math.floor(Math.random()*250);

		ColorCodeCollection[Sentence_Color_No] =  'rgb('+TmpRed+','+TmpGreen+','+TmpBlue+')';

		TmpRed = Math.floor(Math.random()*250);
		TmpGreen = Math.floor(Math.random()*250);
		TmpBlue = Math.floor(Math.random()*250);

		ColorCodeCollection[Keyword_Color_No] =  'rgb('+TmpRed+','+TmpGreen+','+TmpBlue+')';

		TmpRed = Math.floor(Math.random()*250);
		TmpGreen = Math.floor(Math.random()*250);
		TmpBlue = Math.floor(Math.random()*250);

		ColorCodeCollection[Funname_Color_No] =  'rgb('+TmpRed+','+TmpGreen+','+TmpBlue+')';

		highlighter(ColorCodeCollection);


}



function darkTheme()
{
		ColorCodeCollection[Background_Color_No] = 'rgb(45,45,45)';
		ColorCodeCollection[Font_Color_No] =  'rgb(204,204,194)';
		ColorCodeCollection[Comment_Color_No] =  'rgb(153,153,126)';
		ColorCodeCollection[DataType_Color_No] =  'rgb(240,141,68)';
		ColorCodeCollection[Sentence_Color_No] =  'rgb(115,164,119)';
		ColorCodeCollection[Keyword_Color_No] =  'rgb(226,105,73)';
		ColorCodeCollection[Funname_Color_No] =  'rgb(134,221,44)';


		highlighter(ColorCodeCollection);
}


function lightTheme()
{
		ColorCodeCollection[Background_Color_No] = 'rgb(245,242,240)';
		ColorCodeCollection[Font_Color_No] =  'rgb(0,0,0)';
		ColorCodeCollection[Comment_Color_No] =  'rgb(154,153,166)';
		ColorCodeCollection[DataType_Color_No] =  'rgb(31,185,229)';
		ColorCodeCollection[Sentence_Color_No] =  'rgb(102,153,15)';
		ColorCodeCollection[Keyword_Color_No] =  'rgb(162,39,132)';
		ColorCodeCollection[Funname_Color_No] =  'rgb(231,90,104)';

		highlighter(ColorCodeCollection);
}




//main function
function main()
{	
	var TextArea=document.getElementById('input');
	TextArea.innerHTML="\n\n";
	darkTheme();
}


//this function calls whenever text area is changed
function transform(){

		
	highlighter(ColorCodeCollection);
	
}


//This function will handle the copy command
function copyFunction(){

	  /*  getting content form output div */	
	  var finalCode = document.getElementById("output-div");

	  /*	creating new text area for copying the final code */
	  var textarea = document.createElement('textarea');

	  	textarea.id = 'temp_element';			//giving id to textarea
	  	textarea.style.height = 0;				//styling text area
		document.body.appendChild(textarea);	//adding text area to html 

	  /* creating variable for accessing temp_element textarea */
	  var copyText = document.getElementById("temp_element");

	  //adding content to textarea
	  copyText.innerHTML = finalCode.innerHTML;

	  /* Select the text field */
	 	 copyText.select();
	  	

	  /* Copy the text inside the text field */
	    document.execCommand("copy");

	     // Remove the textarea
	  document.body.removeChild(textarea);
	  
}



//call to main function  after page is fully loaded
window.onload = function(){main()}
