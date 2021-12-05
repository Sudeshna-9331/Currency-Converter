let input = document.getElementById("input");
let dropList = document.querySelectorAll(".dropdown select");
let getButton =  document.querySelector("form button");
let showResult = document.querySelector(".result");


for (let i = 0; i < dropList.length; i++) {
    
   for (const currency in country_list) {
    if(i==0){
        selected = currency == "USD" ? "selected" : "";
    }
    else if(i==1){
        selected = currency == "INR" ? "selected" : "";
    }

      let optiontag = `<option  value="${currency}" class="dropdown-item" ${selected}>
                             ${currency}
                        </option>`;

     dropList[i].innerHTML += optiontag;
   }
    
}

getButton.addEventListener("click", (e)=>{
    e.preventDefault();
    exchangeCurrency()
   
})
function exchangeCurrency(){
    let amount = document.getElementById("input");
  
    if(amount.value =="" || amount.value ==0){
        amount.value = 0;
    }

    // Select from and to currency
    let currencyFrom = document.querySelector(".from");
    let currencyTo = document.querySelector(".to");

   // Fetch exchanged currency
    let url = `https://v6.exchangerate-api.com/v6/d1a86383ce14fd7e1cc8d630/latest/${currencyFrom.value}`;

    fetch(url)
    .then((respond)=>{
        respond.json().then((result)=>{
            let exchangeRate = result.conversion_rates;
          console.log(exchangeRate)
           const exchangeValue = exchangeRate[currencyTo.value];
           let totalExchangeValue = ((exchangeValue)*(amount.value)).toFixed(3);
           console.log(totalExchangeValue);


           showResult.innerHTML = `<div class="showResult"> <span style="color:brown; font-weight:bold">${amount.value}</span> <span style="font-weight:bold; padding:0 5px"> ${currencyFrom.value}</span> = <span style="color:brown; font-weight:bold;  padding:0 5px">${totalExchangeValue}</span>  <span style="font-weight:bold">${currencyTo.value}</span>
           </div>`;
        })
    })

}  