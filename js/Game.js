function Game(canvas, ctx)
{
    this.fieldWidth  = canvas.width;
    this.fieldHeight = canvas.height;

    this.graphics = new Graphics(ctx, this.fieldWidth, this.fieldHeight);
    this.grid = new Grid(this.fieldWidth, this.fieldHeight);
    this.gladiator1 = new Gladiator();
    this.gladiator2 = new Gladiator(); 
    this.playerOneField = new PlayerField(this.fieldWidth, this.fieldHeight);
    this.playerTwoField = new PlayerField(this.fieldWidth, this.fieldHeight);
    this.throwCubes1Button = document.getElementById('throwCubes1');
    this.throwCubes2Button = document.getElementById('throwCubes2');

    this.setHandlerOnThrowCubes1Button();
    this.setHandlerOnThrowCubes2Button();
}

Game.prototype.initialize = function()
{
    this.isWin = false;
    this.isContinue = true;
    this.score = 0;
    this.gladiator1.initialize('Spartacus', 4, 4, 4, 2, 5);
    this.gladiator2.initialize('Feoclus', 5, 5, 2, 8, 5);
    this.playerOneField.initialize(20, 50, this.gladiator1);
    this.playerTwoField.initialize(4 * this.fieldWidth / 5, 50, this.gladiator2);
    this.grid.initialize(80, 60, 60, 'rgba(0, 0, 0, 0)', 'grey');
    this.Count = 0;
    this.cubes1 = [];
    this.cubes2 = [];
    this.cubesClick1 = false;
    this.cubesClick2 = false;
};

Game.prototype.end = function()
{
    this.grid.nodes = [];
    this.graphics.clearAll();
};

Game.prototype.drawGrid = function()
{
    for (var i = 1; i < this.grid.sizeMas; i++)
    {
        for (var j = 1; j < this.grid.sizeMas; j++)
        {
            if ((i == this.gladiator1.posY) && (j == this.gladiator1.posX))
            {
                this.grid.nodes[i][j].fillColor = 'gold';
            }
            if ((i == this.gladiator2.posY) && (j == this.gladiator2.posX))
            {
                this.grid.nodes[i][j].fillColor = 'silver';
            }
            if (this.grid.nodes[i][j] != 0)
            {
                this.graphics.drawRectWithBorder(this.grid.nodes[i][j].x, this.grid.nodes[i][j].y, this.grid.nodes[i][j].width, this.grid.nodes[i][j].height, this.grid.nodes[i][j].fillColor, this.grid.nodes[i][j].strokeColor);
            }
        }
    }
};

Game.prototype.emptyGrid = function()
{
    for (var i = 1; i < this.grid.sizeMas; i++)
    {
        for (var j = 1; j < this.grid.sizeMas; j++)
        {
            this.grid.nodes[i][j].strokeColor = 'grey';
        }
    }
};

Game.prototype.onOneStep = function(gladiator, gladiator2)
{
    var yUp = gladiator.posY + 1;
    if (yUp > this.grid.sizeMas - 1) yUp = this.grid.sizeMas - 1;
    var yDown = gladiator.posY - 1;
    if (yDown < 1) yDown = 1;
    var xUp;
    var xDown;
    for (var i = yDown; i <= yUp; i++)
    {
        xUp = gladiator.posX + 1;
        xDown = gladiator.posX - 1;
        if ((i >= this.grid.sizeMas / 2) && (gladiator.posY >= this.grid.sizeMas / 2))
        {
            if (i > gladiator.posY) xUp = xUp - Math.abs(i - gladiator.posY);
            if (i < gladiator.posY) xDown = xDown + Math.abs(i - gladiator.posY);
        }
        else if ((i <= this.grid.sizeMas / 2) && (gladiator.posY <= this.grid.sizeMas / 2))
        {
            if (i > gladiator.posY) xDown = xDown + Math.abs(i - gladiator.posY);
            if (i < gladiator.posY) xUp = xUp - Math.abs(i - gladiator.posY);
        }
        else if (((i < this.grid.sizeMas / 2) && (gladiator.posY > this.grid.sizeMas / 2)) || ((i > this.grid.sizeMas / 2) && (gladiator.posY < this.grid.sizeMas / 2)))
        {
            for(var k = 0; k < Math.abs(gladiator.posY - (this.grid.sizeMas / 2)); k++)
            {
                xDown = xDown + 1;
                
            }
            for(var k = 0; k < Math.abs(i - (this.grid.sizeMas / 2)); k++)
            {
                xUp = xUp - 1;
            }
        }
        if (xUp > this.grid.sizeMas - 1) xUp = this.grid.sizeMas - 1;
        if (xDown < 1) xDown = 1;
        for (var j = xDown; j <= xUp; j++)
        {
            if ((gladiator2.posY == i) && (gladiator2.posX == j)) return true;
        }
    }
    return false;
};

Game.prototype.drawAllowStep = function(gladiator)
{
    var yUp = gladiator.posY + gladiator.speed;
    if (yUp > this.grid.sizeMas - 1) yUp = this.grid.sizeMas - 1;
    var yDown = gladiator.posY - gladiator.speed;
    if (yDown < 1) yDown = 1;
    var xUp;
    var xDown;
    for (var i = yDown; i <= yUp; i++)
    {
        xUp = gladiator.posX + gladiator.speed;
        xDown = gladiator.posX - gladiator.speed;
        if ((i >= this.grid.sizeMas / 2) && (gladiator.posY >= this.grid.sizeMas / 2))
        {
            if (i > gladiator.posY) xUp = xUp - Math.abs(i - gladiator.posY);
            if (i < gladiator.posY) xDown = xDown + Math.abs(i - gladiator.posY);
        }
        else if ((i <= this.grid.sizeMas / 2) && (gladiator.posY <= this.grid.sizeMas / 2))
        {
            if (i > gladiator.posY) xDown = xDown + Math.abs(i - gladiator.posY);
            if (i < gladiator.posY) xUp = xUp - Math.abs(i - gladiator.posY);
        }
        else if (((i < this.grid.sizeMas / 2) && (gladiator.posY > this.grid.sizeMas / 2)) || ((i > this.grid.sizeMas / 2) && (gladiator.posY < this.grid.sizeMas / 2)))
        {
            for(var k = 0; k < Math.abs(gladiator.posY - (this.grid.sizeMas / 2)); k++)
            {
                xDown = xDown + 1;
                
            }
            for(var k = 0; k < Math.abs(i - (this.grid.sizeMas / 2)); k++)
            {
                xUp = xUp - 1;
            }
        }
        if (xUp > this.grid.sizeMas - 1) xUp = this.grid.sizeMas - 1;
        if (xDown < 1) xDown = 1;
        for (var j = xDown; j <= xUp; j++)
        {
            this.grid.nodes[i][j].strokeColor = 'green';
        }
    }
    this.drawGrid();
};

Game.prototype.showName = function(playerField, gladiator)
{
    var stringToPrint = 'Gladiator: ';
    var fontOfString = '30px Times New Roman';
    var fillStyleOfString = 'gold';
    this.graphics.printString(stringToPrint, fontOfString, fillStyleOfString, playerField.x - 10, playerField.y);
    this.graphics.printString(gladiator.gladName, fontOfString, fillStyleOfString, playerField.x - 10, playerField.y + 30);
};

Game.prototype.showParams = function(playerField, gladiator)
{
    var step = 20;
    var fontOfString = '30px Times New Roman';
    var fillStyleOfString = 'Gold';
    this.graphics.printString('Attack: ', fontOfString, fillStyleOfString, playerField.x - 10, playerField.y + 4 * step);
    for (var i = 0; i < gladiator.attack; i++)
    {
        this.graphics.drawCircleWithBorder(playerField.x + i * 25, playerField.y + 5 * step, 10, 'red', 'red');
    }
    this.graphics.printString('Defense: ', fontOfString, fillStyleOfString, playerField.x - 10, playerField.y + 7 * step);
    for (var i = 0; i < gladiator.defense; i++)
    {
        this.graphics.drawCircleWithBorder(playerField.x + i * 25, playerField.y + 8 * step, 10, 'black', 'black');
    }
    this.graphics.printString('Speed: ', fontOfString, fillStyleOfString, playerField.x - 10, playerField.y + 10 * step);
    for (var i = 0; i < gladiator.speed; i++)
    {
        this.graphics.drawCircleWithBorder(playerField.x + i * 25, playerField.y + 11 * step, 10, 'blue', 'blue');
    }
};

Game.prototype.showPlayerFields = function()
{
    this.showName(this.playerOneField, this.gladiator1);
    this.showParams(this.playerOneField, this.gladiator1);
    this.showName(this.playerTwoField, this.gladiator2);
    this.showParams(this.playerTwoField, this.gladiator2);
};

Game.prototype.compareNumbers = function(a, b) 
{
    return b - a;
}

Game.prototype.throwCubes = function(gladiatorParametr)
{
    var x;
    var cubes = [];
    for( var i=0; i < gladiatorParametr; i++)
    {
        x = Math.floor((Math.random() * 6) + 1);
        cubes[i] = x;
    }
    cubes.sort(this.compareNumbers);
    return cubes; 
};


Game.prototype.setHandlerOnThrowCubes1Button = function()
{
    var thisPtr = this;
    this.throwCubes1Button.addEventListener('click', function() {
        thisPtr.cubesClick1 = true;
    });
};

Game.prototype.setHandlerOnThrowCubes2Button = function()
{
    var thisPtr = this;
    this.throwCubes2Button.addEventListener('click', function() {
        thisPtr.cubesClick2 = true;
    });
};


Game.prototype.eventAct = function (clickedX, clickedY, gladiator, gladiator2) 
{
    this.grid.nodes[gladiator.posY][gladiator.posX].fillColor = 'rgba(0, 0, 0, 0)';
    var yUp = gladiator.posY + gladiator.speed;
    if (yUp > this.grid.sizeMas - 1) yUp = this.grid.sizeMas - 1;
    var yDown = gladiator.posY - gladiator.speed;
    if (yDown < 1) yDown = 1;
    var xUp;
    var xDown;
    for (var i = yDown; i <= yUp; i++)
    {
        xUp = gladiator.posX + gladiator.speed;
        xDown = gladiator.posX - gladiator.speed;
        if ((i >= this.grid.sizeMas / 2) && (gladiator.posY >= this.grid.sizeMas / 2))
        {
            if (i > gladiator.posY) xUp = xUp - Math.abs(i - gladiator.posY);
            if (i < gladiator.posY) xDown = xDown + Math.abs(i - gladiator.posY);
        }
        else if ((i <= this.grid.sizeMas / 2) && (gladiator.posY <= this.grid.sizeMas / 2))
        {
            if (i > gladiator.posY) xDown = xDown + Math.abs(i - gladiator.posY);
            if (i < gladiator.posY) xUp = xUp - Math.abs(i - gladiator.posY);
        }
        else if (((i < this.grid.sizeMas / 2) && (gladiator.posY > this.grid.sizeMas / 2)) || ((i > this.grid.sizeMas / 2) && (gladiator.posY < this.grid.sizeMas / 2)))
        {
            for(var k = 0; k < Math.abs(gladiator.posY - (this.grid.sizeMas / 2)); k++)
            {
                xDown = xDown + 1;
                
            }
            for(var k = 0; k < Math.abs(i - (this.grid.sizeMas / 2)); k++)
            {
                xUp = xUp - 1;
            }
        }
        if (xUp > this.grid.sizeMas - 1) xUp = this.grid.sizeMas - 1;
        if (xDown < 1) xDown = 1;
        for (var j = xDown; j <= xUp; j++)
        {
            if (clickedX < this.grid.nodes[i][j].right && clickedX > this.grid.nodes[i][j].left && clickedY > this.grid.nodes[i][j].top && clickedY < this.grid.nodes[i][j].bottom && ((j != gladiator2.posX) || (i != gladiator2.posY))) 
            {
                gladiator.posY = i;
                gladiator.posX = j;
                //alert('clicked number' + (j) + ' ' + (i)); 
                if (this.onOneStep(gladiator, gladiator2)) 
                {
                    this.attackDefense(gladiator, gladiator2);
                    alert('Yo');
                }
                this.emptyGrid();
                $('canvas').unbind('click');
                this.Count++;
                //alert(this.Count);
                if (this.Count % 2 == 0)
                {
                    this.graphics.clearAll();
                    this.showPlayerFields();
                    this.drawGrid();
                    this.gameMoving();
                }
                else this.gladMoving(gladiator2, gladiator);
            }
        }
    }
    this.graphics.clearAll();
    this.showPlayerFields();
    this.drawGrid();
}

Game.prototype.gladMoving = function(gladiator, gladiator2)
{
    this.drawAllowStep(gladiator);
    var thisPtr = this;
    var thisPtrGladiator = gladiator;
    var thisPtrGladiator2 = gladiator2;
    $('canvas').click(function (e) 
        {
            var clickedX = e.pageX - this.offsetLeft - 75;
            var clickedY = e.pageY - this.offsetTop - 50;
            thisPtr.eventAct(clickedX, clickedY, thisPtrGladiator, thisPtrGladiator2); 
        });
}

Game.prototype.speedCompare = function()
{
    var turn = 0;
    //this.throwCubes1Button.style.display = 'block';
    //this.throwCubes2Button.style.display = 'block';
    //this.throwCubes1Button.value = 'Throw speed cubes';
    //this.throwCubes2Button.value = 'Throw speed cubes';
    this.graphics.drawRectWithBorder(this.fieldWidth / 100, this.fieldHeight - (this.fieldHeight / 5), this.fieldWidth / 5, this.fieldHeight / 15, 'white', 'gold');
    this.graphics.drawRectWithBorder(this.fieldWidth - (this.fieldWidth / 4), this.fieldHeight - (this.fieldHeight / 5), this.fieldWidth / 5, this.fieldHeight / 15, 'white', 'gold');
    var fontOfString = '30px Times New Roman';
    var fillStyleOfString = 'Blue';
    this.cubes1 = this.throwCubes(this.gladiator1.speed);
    this.cubes2 = this.throwCubes(this.gladiator2.speed);
    var str1 = '';
    var str2 = '';
    for (var i = 0; i < this.cubes1.length; i++) 
    {
        if (i == 0) str1 = str1 + this.cubes1[i];
        else str1 = str1 + '+' + this.cubes1[i];
    }
    for (var i = 0; i < this.cubes2.length; i++) 
    {
        if (i == 0) str2 = str2 + this.cubes2[i];
        else str2 = str2 + '+' + this.cubes2[i];
    }
    var sum1 = this.cubes1.reduce(function(sum, current) {
        return sum + current
    });
    var sum2 = this.cubes2.reduce(function(sum, current) {
        return sum + current
    });
    str1 = str1 + '=' + sum1;
    str2 = str2 + '=' + sum2;
    this.graphics.printString(str1, fontOfString, fillStyleOfString, this.fieldWidth / 100 + this.fieldWidth / 100, this.fieldHeight - (this.fieldHeight / 6) + (this.fieldHeight / 60));
    this.graphics.printString(str2, fontOfString, fillStyleOfString, this.fieldWidth - (this.fieldWidth / 4) + this.fieldWidth / 100, this.fieldHeight - (this.fieldHeight / 6) + (this.fieldHeight / 60));
    this.cubes1 = [];
    this.cubes2 = [];
    if (sum1 > sum2) turn = 1;
    else if (sum1 < sum2) turn = 2;
    else
    {
        this.graphics.clearRect(this.fieldWidth / 100, this.fieldHeight - (this.fieldHeight / 5), this.fieldWidth / 5, this.fieldHeight / 15);
        this.graphics.clearRect(this.fieldWidth - (this.fieldWidth / 4), this.fieldHeight - (this.fieldHeight / 5), this.fieldWidth / 5, this.fieldHeight / 15);
        alert('Re-throw speed cubes');
        return 0; 
    }
    alert('Player ' + turn + ' turn');
    return turn;
}

Game.prototype.attackDefense = function(gladiator1, gladiator2)
{
    alert(gladiator1.gladName + ' attack');
    var damage = 0;
    var str1 = '';
    var str2 = '';
    var width1;
    var width2;
    var fontOfString = '30px Times New Roman';
    var fillStyleOfString1 = 'Red';
    var fillStyleOfString2 = 'Black';
    if (gladiator1.gladName == this.gladiator1.gladName)
    {
        width1 = this.fieldWidth / 100 + this.fieldWidth / 100;
        width2 = this.fieldWidth - (this.fieldWidth / 4) + this.fieldWidth / 100;
    }
    else
    {
        width2 = this.fieldWidth / 100 + this.fieldWidth / 100;
        width1 = this.fieldWidth - (this.fieldWidth / 4) + this.fieldWidth / 100;
    }
    this.graphics.drawRectWithBorder(this.fieldWidth / 100, this.fieldHeight - (this.fieldHeight / 5), this.fieldWidth / 5, this.fieldHeight / 15, 'white', 'gold');
    this.graphics.drawRectWithBorder(this.fieldWidth - (this.fieldWidth / 4), this.fieldHeight - (this.fieldHeight / 5), this.fieldWidth / 5, this.fieldHeight / 15, 'white', 'gold');
    this.cubes1 = this.throwCubes(gladiator1.attack);
    this.cubes2 = this.throwCubes(gladiator2.defense);
    for (var i = 0; i < this.cubes1.length; i++) 
    {
        if (i == 0) str1 = str1 + this.cubes1[i];
        else str1 = str1 + ' ' + this.cubes1[i];
    }
    for (var i = 0; i < this.cubes2.length; i++) 
    {
        if (i == 0) str2 = str2 + this.cubes2[i];
        else str2 = str2 + ' ' + this.cubes2[i];
    }
    this.graphics.printString(str1, fontOfString, fillStyleOfString1, width1, this.fieldHeight - (this.fieldHeight / 6) + (this.fieldHeight / 60));
    this.graphics.printString(str2, fontOfString, fillStyleOfString2, width2, this.fieldHeight - (this.fieldHeight / 6) + (this.fieldHeight / 60));
    if (this.cubes1.length <= this.cubes2.length)
    {
        for(var i = 0; i < this.cubes1.length; i++)
        {
            if (this.cubes1[i] > this.cubes2[i]) damage++;
        }
    }
    if (this.cubes1.length > this.cubes2.length)
    {
        for(var i = 0; i < this.cubes2.length; i++)
        {
            if (this.cubes1[i] > this.cubes2[i]) damage++;
        }
        for(var i = this.cubes2.length; i < this.cubes1.length; i++)
        {
            if (this.cubes1[i] > 2) damage++;
        }
    }
    alert(damage);
    this.cubes1 = [];
    this.cubes2 = [];
}

Game.prototype.gameMoving = function()
{
    var turn = 0;
    while (turn == 0) turn = this.speedCompare();    
    if (turn == 1) {this.gladMoving(this.gladiator1, this.gladiator2);}
    else if (turn == 2){this.gladMoving(this.gladiator2, this.gladiator1);}
}
