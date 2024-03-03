const fur_text = document.querySelector("#fur")
const fps_text = document.querySelector("#fps")

const bean_text = document.getElementById("bean")

var current_fur = 1000;

var fur_per_click = 0;
var unbuffed_fur_per_click = 1;
var fur_per_second = 0;
var unbuffed_fur_per_second = 1;

var fps_additive_increase_index = 0; //when changing this, add the new value (this is a percentage of addition)
var fps_multiplicative_increase_index = 1; //when changing this, multiply the new value (this is a direct multiplier)
var cps_additive_increase_index = 0; //when changing this, add the new value (this is a percentage of addition)
var cps_multiplicative_increase_index = 1; //when changing this, multiply the new value (this is a direct multiplier)

class idle_item {

    constructor(name, base_cost, number, base_fps, buff_addi, buff_multp, increment, item_number_display, cost_display){
        this.name = name
        this.base_cost = base_cost
        this.number = number
        this.base_fps = base_fps
        this.buff_addi = buff_addi
        this.buff_multp = buff_multp
        this.increment = increment
        this.item_number_display = item_number_display
        this.cost_display = cost_display
  
    }
    activeFps(){
        return this.number * calcAdditiveAndMultiplicative(this.base_fps, this.buff_addi, this.buff_multp);   
    }
    buy(amount){
        if (this.canBuy(amount)){
            current_fur -= this.calculateCost(amount)
            this.number += amount;
            this.item_number_display.innerHTML = this.number;
            this.cost_display.innerHTML = this.calculateCost(1) + " Fur"
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
        return current_fur >= this.calculateCost(amount);
    }
}





var beans = new idle_item("bean", 20, 0, 1, 0, 1, 1.12, document.getElementById("display-number-bean"), document.getElementById("display-cost-bean"))
var floofers = new idle_item("floofer", 350, 0, 10, 0, 1, 1.15, document.getElementById("display-number-floofer"), document.getElementById("display-cost-floofer"))

function calcBaseFps(){
    sum = 0
    sum += beans.activeFps();
    sum += floofers.activeFps();
    return sum
}
function calcBaseFpc(){ //fur per click
    fur_per_click = calcAdditiveAndMultiplicative(unbuffed_fur_per_click,fps_additive_increase_index, fps_multiplicative_increase_index);
}


setInterval(function(){
    unbuffed_fur_per_second = calcBaseFps();
    fur_per_second = calcAdditiveAndMultiplicative(unbuffed_fur_per_second, fps_additive_increase_index, fps_multiplicative_increase_index)
    current_fur += fur_per_second / 10;
    fur_text.innerHTML = Math.floor(current_fur) +  " Fur";
    fps_text.innerHTML = Math.floor(fur_per_second) +  " Fur per second";
},100)

function bean_click(){
    beans.buy(1)
}
function floofer_click(){
    floofers.buy(1)
}
function big_fur_click(){
    calcBaseFpc();
    current_fur += fur_per_click;
}