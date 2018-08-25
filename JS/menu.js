(function() {
	var hamburger = document.querySelector('.hamburger');
	hamburger.addEventListener('click', function() {
		document.querySelector('.page-header').classList.toggle('navi-opened');
	}, false);
})();
