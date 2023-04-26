addEventListener('DOMContentLoaded', function() {
  document.querySelector("#drawer").addEventListener('submit', function(e) {
    e.preventDefault();

    let numberMax = document.querySelector('#numberMax').value;
    numberMax = parseInt(numberMax);

    let numberRadom = Math.random() * numberMax;
    numberRadom = Math.floor(numberRadom) + 1;
    
    document.querySelector("#resultValue").innerText = numberRadom;

    document.querySelector(".result").style.display = "block";
  });
});