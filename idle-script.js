const souls_text = document.querySelector("#souls")
const sps_text = document.querySelector("#sps")

const candle_text = document.getElementById("candle")

var current_souls = 1000;

var souls_per_second = 0;
var unbuffed_souls_per_second = 0;

var additive_increase_index = 0; //when changing this, add the new value (this is a percentage of addition)
var multiplicative_increase_index = 1; //when changing this, multiply the new value (this is a direct multiplier)


class idle_item {

    constructor(name, base_cost, number, base_sps, buff_addi, buff_multp, increment, item_number_display, cost_display){
        this.name = name
        this.base_cost = base_cost
        this.number = number
        this.base_sps = base_sps
        this.buff_addi = buff_addi
        this.buff_multp = buff_multp
        this.increment = increment
        this.item_number_display = item_number_display
        this.cost_display = cost_display
  
    }
    activeSps(){
        return this.number * calcAdditiveAndMultiplicative(this.base_sps, this.buff_addi, this.buff_multp);   
    }
    buy(amount){
        if (this.canBuy(amount)){
            current_souls -= this.calculateCost(amount)
            this.number += amount;
            this.item_number_display.innerHTML = this.number;
            this.cost_display.innerHTML = this.calculateCost(1) + " Souls"
        }
    }
    sell(amount){
        this.number -= amount;
    }
    calculateCost(amount){
        if (amount === 1){
            return Math.round(this.base_cost * Math.pow(this.increment, this.number))
        }else{
            return Math.round(this.base_cost * calcMassCost(this.number, amount, this.base_cost, this.increment))
        }
    }

    canBuy(amount){
        return current_souls >= this.calculateCost(amount);
    }
}





var candles = new idle_item("candle", 20, 0, 1, 0, 1, 1.12, document.getElementById("display-number-candle"), document.getElementById("display-cost-candle"))
var gravestones = new idle_item("gravestone", 350, 0, 10, 0, 1, 1.15, document.getElementById("display-number-gravestone"), document.getElementById("display-cost-gravestone"))

function calcBaseSps(){
    sum = 0
    sum += candles.activeSps();
    sum += gravestones.activeSps();
    return sum
}


setInterval(function(){
    unbuffed_souls_per_second = calcBaseSps();
    souls_per_second = calcAdditiveAndMultiplicative(unbuffed_souls_per_second, additive_increase_index, multiplicative_increase_index)
    current_souls += souls_per_second / 10;
    souls_text.innerHTML = Math.floor(current_souls) +  " Souls";
    sps_text.innerHTML = Math.floor(souls_per_second) +  " Souls per second";
},100)

function candle_click(){
    candles.buy(1)
}
function gravestone_click(){
    gravestones.buy(1)
}