$(document).ready(function(){
  $("#nav").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href');
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
    });
});
  $(window).scroll(function(){
    console.log($(window).scrollTop());
    if ($(window).scrollTop() >= 100 ) {
      $(".navbar").css('background', 'rgba(0, 0, 0, 0.5)');
    } else 
    {
      $(".navbar").css('background','rgba(0, 0, 0, 0)');
    };
  });
  $(".wer7").click(function () {
              $(".wer1").toggleClass('rotated');

          });   
  $(".wer8").click(function () {
                $(".wer2").toggleClass('rotated');

            });   
  $(".wer9").click(function () {
                $(".wer3").toggleClass('rotated');

            });   
  $(".wer10").click(function () {
                $(".wer4").toggleClass('rotated');

            });   
  $(".wer11").click(function () {
                $(".wer5").toggleClass('rotated');

            });   
  $(".wer12").click(function () {
                $(".wer6").toggleClass('rotated');

            });   
  $(".wer13").click(function () {
                $(".wer14").toggleClass('rotated');

            });   
  $(".wer15").click(function () {
                $(".wer16").toggleClass('rotated');
            });