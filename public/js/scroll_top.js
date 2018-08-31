(function() {

function createButton() {
  var button = document.createElement('button');

  button.classList.add('backToTop', 'hidden');
  button.innerHTML = '&#9650;';
  document.body.appendChild(button);

  return button;
}

function animateScroll() {
  if (window.pageYOffset > 0){
    window.scrollBy(0, -15);
    setTimeout(animateScroll, 1);
  }
}

 var button = createButton();
 let clientHeight = document.querySelector('.navi').clientHeight;

 window.addEventListener('scroll', function() {
   if ( window.pageYOffset >= clientHeight) {
     button.classList.remove('hidden');
   } else {
     button.classList.add('hidden');
   }
 }, false);

 button.addEventListener('click', function (e) {
  e.stopPropagation();
  animateScroll();
 }, false);


})();
