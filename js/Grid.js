function Grid(fieldWidth, fieldHeight)
{
    this.nodes = [];
    
    this.sizeMas = 10;
    this.fieldWidth = fieldWidth - 2 * (fieldWidth / 5);
    this.fieldHeight = fieldHeight;
}

Grid.prototype.massiv = function(nodes)
{
    for (var i = 0; i < this.sizeMas; i++)
    {
        nodes[i] = [];
        for (var j = 0; j < this.sizeMas; j++)
        {
            nodes[i][j] = 0;
        }
    }
}

Grid.prototype.initialize = function(amount, width, height, fillColor, strokeColor)
{
    var blankDistance = 5;
    var xAxisCoordinate = 10;
    var yAxisCoordinate = 10;
    var differenceX = blankDistance;
    var differenceY = 3 * blankDistance;
    var xCount;
    this.massiv(this.nodes);
    for (var i = 1; i < yAxisCoordinate; i++)
    {
        if (i / (xAxisCoordinate / 2) >= 1) 
        {
            xCount = xAxisCoordinate - (i % (xAxisCoordinate / 2));
        }
        else
        {
            xCount = (xAxisCoordinate / 2) + (i % (xAxisCoordinate / 2));
        }
        differenceX += ((xAxisCoordinate - xCount) / 2) * width;
        for (var j = 1; j < xCount; j++)
        {
            if (j == 1)
            {
                differenceX += Math.ceil(this.fieldWidth / 5) + 9 * blankDistance;
            }
            var temp = new Brick(differenceX, differenceY, width, height, fillColor, strokeColor);
            temp.left = temp.x;
            temp.right = temp.x + temp.width;
            temp.top = temp.y;
            temp.bottom = temp.y + temp.height;
            this.nodes[i][j] = temp;
            differenceX += width + blankDistance;
        }
        differenceX = blankDistance;
        differenceY += height + blankDistance;
    }
};

Grid.prototype.destroy = function(identifier)
{
    this.nodes.splice(identifier, 1);
};