function Platform(fieldWidth, fieldHeight)
{
    this.width = 140;
    this.height = 10;

    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
}

Platform.prototype.initialize = function(x, y, fillColor, strokeColor)
{
    this.x = x;
    this.y = y;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
};

Platform.prototype.controlBorderMove = function()
{
    if (this.x >= this.fieldWidth - this.width)
    {
        this.x = this.fieldWidth - this.width;
    }
    else if (this.x <= 0)
    {
        this.x = 0;
    }
};

Platform.prototype.changeCoordinate = function(coordinateFromMouse)
{
    this.x = coordinateFromMouse - this.width / 2;
};