var gameOver = false;
var board = new Array();
board[0] = 0;
board[1] = 0;
board[2] = 0;
board[3] = 0;
board[4] = 0;
board[5] = 0;
board[6] = 0;
board[7] = 0;
board[8] = 0;

function checkForGameOver(player)
{
	var ans = false;
	
	if(checkBoard(0, 1, 2, player)){ans = true;}	 // Horizontally 
	else if(checkBoard(3, 4, 5, player)){ans = true;}
	else if(checkBoard(6, 7, 8, player)){ans = true;}
	else if(checkBoard(0, 3, 6, player)){ans = true;}// Vertically
	else if(checkBoard(1, 4, 7, player)){ans = true;}
	else if(checkBoard(2, 5, 8, player)){ans = true;}
	else if(checkBoard(0, 4, 8, player)){ans = true;}// Diagonally
	else if(checkBoard(2, 4, 6, player)){ans = true;}
	
	if(ans)
	{
		if(player == 1)
		{
			$("#boardConsole").text("You Won! Play again?");
		}
		else if(player == 2)
		{
			//printBoard();
			$("#boardConsole").text("Computer Won! Play again?");
		}
		$("#boardConsole").fadeIn(400, "linear");
	}
	else if(fullBoard())
	{
		$("#boardConsole").text("Draw. Play again?");
		ans = true;
		$("#boardConsole").fadeIn(400, "linear");
	}
	
	return ans;
}

function fullBoard()
{
	var ans = true;
	for(i = 0; i < board.length; i++)
	{
		if(board[i] == 0)
		{
			ans = false;
			break;
		}
	}
	return ans;
}

function printBoard()
{
	for(i = 0; i < board.length; i++)
	{
		console.log("board[" + i + "] = " + board[i]);
	}
}

function checkBoard(first, second, third, choice)
{
	return board[first] == choice && board[second] == choice && board[third] == choice;
}

function placeComputersChoice()
{
	var result = tryForCondition("win");
	found = result[0];
	
	if(!found)
	{
		result = tryForCondition("block");
		found = result[0];
	}
	
	if(!found)
	{
		result = takeACorner();
		found = result[0];
	}
	
	/*
	if(!found)
	{
		result = placeAtAdjacentSquare();
		found = result[0];
	}*/
	
	if(!found)
	{
		result = takeEmptySquare();
		found = result[0];
	}
	
	/*var i = Math.floor((Math.random() * 9));
	console.log("i is: " + i);
	while(board[i] != 0)
	{
		//console.log("searching");
		i = Math.floor((Math.random() * 9));
		console.log("i is: " + i);
	}
	board[i] = 2;
	*/
	board[result[1]] = 2;
	var selector = "#" + result[1];
	$(selector).css("background-image", "url('images/oMark.png')");
	gameOver = checkForGameOver(2);
}

function tryForCondition(choice)
{
	var num = 0;
	if(choice == "win")
	{
		num = 2;
	}
	else if(choice == "block")
	{
		num = 1;
	}
	
	var order = [0, 1, 2];
	var result = checkBoardForCondition(order, num);
	
	if(!result[0])
	{
		order = [3, 4, 5];
		result = checkBoardForCondition(order, num);
	}
	
	if(!result[0])
	{
		order = [6, 7, 8];
		result = checkBoardForCondition(order, num);
	}
	
	if(!result[0])
	{
		order = [0, 3, 6];
		result = checkBoardForCondition(order, num);
	}
	
	if(!result[0])
	{
		order = [1, 4, 7];
		result = checkBoardForCondition(order, num);
	}
	
	if(!result[0])
	{
		order = [2, 5, 8];
		result = checkBoardForCondition(order, num);
	}
	
	if(!result[0])
	{
		order = [0, 4, 8];
		result = checkBoardForCondition(order, num);
	}
	
	if(!result[0])
	{
		order = [2, 4, 6];
		result = checkBoardForCondition(order, num);
	}
	
	//console.log("Checking " + choice + " condition: " + result);
	
	return result;
}

function checkBoardForCondition(arr, num)
{
	var empties = 0, selection = 0;
	var ans = false, index = -1;
	for(i = 0; i < arr.length; i++)
	{
		if(board[arr[i]] == 0)
		{
			empties++;
			index = arr[i];
		}
		else if(board[arr[i]] == num)
		{
			selection++;
		}
	}
	
	//console.log("empties: " + empties);
	//console.log("selection: " + selection);
	
	if(empties == 1 && selection == 2)
	{
		ans = true;
	}
	
	return [ans, index];
}

function takeACorner()
{
	//console.log("here");
	var ans = false, index = 0;
	var count = 0, cornersIHave = 0;
	var openings = new Array();
	
	if(board[0] == 0){count++; openings.push(0);}
	if(board[2] == 0){count++; openings.push(2);}
	if(board[6] == 0){count++; openings.push(6);}
	if(board[8] == 0){count++; openings.push(8);}
	
	if(board[0] == 2){cornersIHave++;}
	if(board[2] == 2){cornersIHave++;}
	if(board[6] == 2){cornersIHave++;}
	if(board[8] == 2){cornersIHave++;}
	
	if( (count + cornersIHave) > 2)
	{
		ans = true;
		var choice = Math.floor(Math.random() * openings.length);
		index = openings[choice];
	}
	
	return [ans, index];
}

function placeAtAdjacentSquare()
{
	var ans = false, index = 0;
	
	return [ans, index];
}

function takeEmptySquare()
{
	var ans = false, index = 0;
	
	for(i = 0; i < board.length; i++)
	{
		if(board[i] == 0)
		{
			ans = true;
			index = i;
			break;
		}
	}
	
	return [ans, index];
}

$(document).ready(function()
{
	
	$("#switchButton").each(function()
	{
		$(this).hover(
		function() 
		{
			$(this).stop().animate({ opacity: 0.8 }, 500);},
		function() 
		{
			$(this).stop().animate({ opacity: 0.1 }, 500);
		});
	});
	
	
	$(".box").each(function()
	{
		$(this).hover(function() {
                $(this).stop().animate({ opacity: 1.0 }, 500);
            },
           function() {
               $(this).stop().animate({ opacity: 0.75 }, 500);
           });
	});
	
	/*
	$("#contactToggle").click(function(e){
		e.preventDefault();
		$( "#contactContent" ).toggle( "fade" );
	});*/
	
	
	$(".boardBox").click(function(e){
		
		//printBoard();
		var choice = parseInt($(this).attr('id'), 10);
		if(!gameOver)
		{
			if(board[choice] == 0)
			{
				$(this).css("background-image", "url('images/xMark.png')");
				board[choice] = 1;
				gameOver = checkForGameOver(1);
				if(!gameOver)
				{
					placeComputersChoice();
				}
			}
		}
		
	});
	
	$(".boardBox").mouseover(function(){
		if(!gameOver)
		{
			var bg = $(this).css("background-image");
			//console.log("bg is: " + bg);
			if(bg == "none")
			{
				$(this).css("background-image", "url('images/xMark.png')");
			}
		}
	});

	$(".boardBox").mouseout(function(){
		if(!gameOver)
		{
			var choice = parseInt($(this).attr('id'), 10);
			if(board[choice] == 0)
			{
				$(this).css("background-image", "none");
			}
		}
	});

	
	
	$("#resetBoard").click(function(e){
		e.preventDefault();
		//console.log($(this).css("background-image"));
		$(".boardBox").each(function(e){
			$(this).css("background-image", "none");
		});
		for(i = 0; i < board.length; i++)
		{
			board[i] = 0;
		}
		gameOver = false;
		$("#boardConsole").fadeOut(300, "linear");
		/*var choice = Math.floor(Math.random() * 2);
		var str = "";
		if(choice == 0)
		{
			str = "Place anywhere to begin";
		}
		else if(choice == 1)
		{
			str = "Game start!";
		}
		
		$("#boardConsole").text(str);
		*/
	});

});