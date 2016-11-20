function GameController()
{
    this.canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    this.game = new Game(this.canvas, ctx);

    this.startButton = document.getElementById('startButton');
    this.showTopButton = document.getElementById('showTopButton');
    this.hideButton = document.getElementById('hideButtonBlock');
    this.backgroundImage = document.getElementById('canvasContainer');
    this.gameOverMessage = document.getElementById('gameOverMessage');
    this.endScoreMessage = document.getElementById('endScoreMessage');

    this.setHandlerOnStartButton();

    this.showTopButton.onclick = this.popUpShow;
    this.hideButton.onclick = this.popUpHide;

    this.popUpHide();
    this.getData();
}

GameController.prototype.start = function()
{
    this.game.initialize();
    this.hideElementsOnStart();
    this.gameLoop();
};

GameController.prototype.gameLoop = function()
{
    var thisPtr = this;

    if (this.game.isContinue)
    {
        this.game.graphics.clearAll();
        this.game.showPlayerFields();
        this.game.drawGrid();
        this.game.gameMoving();
    }
    else
    {
        this.game.end();
        this.showElementsOnEnd();
        this.insertData();
        this.getData();
    }
};


GameController.prototype.hideElementsOnStart = function()
{
    this.startButton.style.display = 'none';
    this.showTopButton.style.display = 'none';
    this.gameOverMessage.style.display = 'none';
    this.endScoreMessage.style.display = 'none';

    this.backgroundImage.style.opacity = '1';
};

GameController.prototype.showElementsOnEnd = function()
{
    this.startButton.style.display = 'block';
    this.showTopButton.style.display = 'block';

    this.startButton.value = 'Play again';

    this.backgroundImage.style.opacity = '0.5';

    this.gameOverMessage.innerHTML = 'Game Over, !';
    this.gameOverMessage.style.display = 'block';
    this.endScoreMessage.innerHTML = 'Score: ' + this.game.score;
    this.endScoreMessage.style.display = 'block';
};

GameController.prototype.setHandlerOnStartButton = function()
{
    var thisPtr = this;
    this.startButton.addEventListener('click', function() {
        thisPtr.startButton.onclick = thisPtr.start();
    });
};

GameController.prototype.popUpShow = function()
{
    $('#windowPopup').show();
};

GameController.prototype.popUpHide = function()
{
    $('#windowPopup').hide();
};

GameController.prototype.insertData = function()
{
    $.ajax ({
        type: 'POST',
        url: 'php/insert.php',
        data: ({
            user: this.name,
            score: this.game.score
        })
    });
};

GameController.prototype.getData = function()
{
    $.ajax ({
        type: 'POST',
        url: 'php/select.php',
        success: function(html) {
            $('#topPlayersParagraph').html(html);
        }
    });
};