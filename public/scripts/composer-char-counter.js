$(document).ready(function() {
  // --- our code goes here ---
  console.log("READY!");

  $("#tweet-text").on("input", function(e) {
    // target the ancestor
    const pageSection = $(this).closest('.new-tweet');
    // target the descendant with a class of tals
    const counterSection = pageSection.find('.counter');

    counterSection[0].innerHTML = (140 - this.textLength);

    if (140 - this.textLength < 0) {
      counterSection.addClass("overflowText");
    }

    if (140 - this.textLength >= 0) {
      counterSection.removeClass("overflowText");
    }
  });
});

