$(document).ready(function() {
  // --- our code goes here ---
  console.log("READY!");

  $("#tweet-text").on("input", function(e) {
    // console.log(e.originalEvent.key);
    // console.log(140 - this.textLength);

    // target the ancestor
    const pageSection = $(this).closest('.new-tweet');
    // target the descendant with a class of tals
    const counterSection = pageSection.find('.counter');

    // counterSection = 140 - this.textLength;
    counterSection[0].innerHTML = (140 - this.textLength);

    if (140 - this.textLength < 0) {
      counterSection.css('color', '#BC586E');;
    }

    if (140 - this.textLength >= 0) {
      counterSection.css('color', '#586ebc');;
    }
  });

});

