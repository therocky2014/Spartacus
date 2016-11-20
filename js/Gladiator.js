function Gladiator()
{
    this.gladName;
    this.attack;
    this.defense;
    this.speed;
    this.posX;
    this.posY;
}

Gladiator.prototype.initialize = function(gladName, attack, defense, speed, posX, posY)
{
    this.gladName = gladName;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.posX = posX;
    this.posY = posY;
};