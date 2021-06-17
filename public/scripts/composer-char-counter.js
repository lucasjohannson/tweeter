$(document).ready(function() {
  // --- our code goes here ---

  const inputField = document.getElementById("tweet-text");
  
  //event handler to display the character cound 
  inputField.addEventListener('input', function(event) {
    //initialize vars to use 
    const target = event.currentTarget;
    const maxLength = target.getAttribute("max");
    const currentLength = target.value.length;
    //if the current length of tweet greater than the max then display red else display grey font
    if (currentLength >= maxLength) {
      $('.counter').css('color','red');
    } else {
      $('.counter').css('color','dimgray');
    }
    //update the html to display the available chars remaining.
    this.parentElement.parentElement.lastElementChild.lastElementChild.innerHTML = maxLength - currentLength;
  });

});