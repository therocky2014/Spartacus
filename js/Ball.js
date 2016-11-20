function Ball()
{
    this.radius = 20;
}

Ball.prototype.initialize = function(x, y, fillColor, strokeColor)
{
    this.x = x;
    this.y = y;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
};
