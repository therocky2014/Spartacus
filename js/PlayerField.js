function PlayerField(fieldWidth, fieldHeight)
{
    this.fieldWidth = fieldWidth / 5;
    this.fieldHeight = fieldHeight / 2;
}

PlayerField.prototype.initialize = function(x, y, gladiator)
{
    this.x = x;
    this.y = y;
    this.gladName = gladiator.gladName;
    this.attack = gladiator.attack;
    this.defense = gladiator.defense;
    this.speed = gladiator.speed;
};