$(document).ready(function() {
  // --- our code goes here ---
  const inputField = document.getElementById("tweet-text");
  const time = document.getElementById("time");
  //time.innerHTML = timeago.format(new Date());
  // console.log(timeago.format(new Date()));
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  inputField.addEventListener('input', function(event) {
    const target = event.currentTarget;
    const maxLength = target.getAttribute("max");
    const currentLength = target.value.length;

    if (currentLength >= maxLength) {
      $('.counter').css('color','red');
    } else {
      $('.counter').css('color','dimgray');
    }

    // console.log(`${maxLength - currentLength} chars left`);
    // console.log(this); 
    // console.log(event);

    this.parentElement.parentElement.lastElementChild.lastElementChild.innerHTML = maxLength - currentLength;
  });

});