const buy_or_sell = document.querySelectorAll('input[name="buy-sell"]')
const shop_body = document.getElementById("shop-body")
const right = document.querySelector(".right")



isopen = false;

function onLoad(){
    buy_or_sell.forEach(radio => radio.addEventListener("click", (e) =>{
        if(e.target.value === "1"){
            document.getElementById("buy-toggle-box").style.display = "block"
            document.getElementById("sell-toggle-box").style.display = "none"
        }else{
            document.getElementById("buy-toggle-box").style.display = "none"
            document.getElementById("sell-toggle-box").style.display = "block"
        }
    }))
    shop_body.addEventListener('scroll', (e) =>{
        right.style.backgroundPositionY = String( Math.ceil(-1 * shop_body.scrollTop / 4))+ "px"
    })
}
function openUpgrades(){
    const upgradeShop = document.getElementById("upgrades-shop");
    const upgradeTitle = document.querySelector("#pos-txt")
    if (isopen){
        upgradeShop.style.bottom = "-18em"
        upgradeTitle.innerHTML ="&#8896;"
        isopen = false;
    }else{
        upgradeShop.style.bottom = "-2em"
        upgradeTitle.innerHTML ="&#8897;"
        isopen = true;
    }
}
