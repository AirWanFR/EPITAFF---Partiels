$(document).ready(function (){
	
/* 
 * Pris en charge dans la fonction initTabs dans le fichier olgi_scrips.js
 */
$(".tabs li > a").on('click', function(e) {
	/*
	e.stopPropagation();
	$(this).next(".tabs-content").slideToggle();
	$(this).parent('li').siblings().children('a').next(".tabs-content").slideUp();
	$(this).parent('li').toggleClass('tabopen');
	$(this).parent('li').siblings().removeClass('tabopen');
	*/
	
	e.stopPropagation();
	e.preventDefault();
	
	if(!$(this).next('.tabs-content').children().length > 0) {
		var url = $(this).attr("href");
		if(url && url.length > 0){
			var cacheBuster = new Date().getTime();  //Get timestamp
			//$("#tabContent").load(url+'?r='+cacheBuster, function(){initAll(); window.location = "#tabContent";});
			$(this).next(".tabs-content").load(url+'?r='+cacheBuster, function(){initAll2();});
			$(this).parent('li').siblings().children('div[class=tabs-content]').html(""); // Pour vider le contenu des options fermées
		}
	}
	
	$(this).next(".tabs-content").slideToggle();
	$(this).parent('li').siblings().children('a').next(".tabs-content").slideUp();
	$(this).parent('li').toggleClass('tabopen');
	$(this).parent('li').siblings().removeClass('tabopen');
	 
	if($(this).parent("li").hasClass("tabopen")){
		//Pour scoller au haut de la page en fermant l'option
		//$('html, body').animate({scrollTop: $("html").offset().top}, 'slow');
		
		//Pour scoller a l'option active
		var idDiv =  $(this).parent('li').attr("id");
		$('html, body').animate({scrollTop:$("#tabs li[id='"+idDiv+"']").offset().top}, 500);
	} else {
		//Pour scoller a l'option active
		//var idDiv =  $(this).parent('li').attr("id");
		//$('html, body').animate({scrollTop:$("#tabs li[id='"+idDiv+"']").offset().top}, 500);
		
		//Pour scoller au haut de la page en fermant l'option
		$('html, body').animate({scrollTop: $("html").offset().top}, 'slow');
	}
	
});


	// initialise la fonctionnalitÃ© des select
$('.cs-content select').niceSelect();

// effet des labels

$(".cs-content").on('focus', '.olgiformfield', function() {
	$(this).parent().addClass("is-active is-completed");
});
$(".cs-content").on('change', '.hasDatepicker', function() {
	$(this).parent().addClass("is-active is-completed");
});

$(".cs-content").on('focusout', '.olgiformfield', function(){
  if($(this).val() === "")
    $(this).parent().removeClass("is-completed");
  	$(this).parent().removeClass("is-active");
});

// effet des labels avec appel load

/* MY_MODIF remplacer "#tabContent" par ".tabs-content"  pour toutes les lignes en dessous */
/*
$(".tabs-content").on('focus', '.olgiformfield', function() {
	$(this).parent().addClass("is-active is-completed");
});

$(".tabs-content").on('focusout', '.olgiformfield', function(){
  if($(this).val() === "")
    $(this).parent().removeClass("is-completed");
  $(this).parent().removeClass("is-active");
});
*/

if($("input").val()!= ''){
 	$(this).parent('li').addClass("is-active is-completed");
}



$(".tabs-content").on('click', '.mod-select', function(e){
	e.stopPropagation();
  $(".tabs-content .mod-select").removeClass('cs-active');
  $(this).addClass('cs-active');
});
$(document).click(function(e) {
	 $(".tabs-content .mod-select").removeClass('cs-active');
});
if(window.matchMedia("(max-width: 640px)").matches){
	$(".tabs-content").on('click', '.showOpeningHours', function(e) {
	e.preventDefault();
	$(this).next(".openingHours").slideToggle();
});
}
if(window.matchMedia("screen and (min-width: 641px)").matches){
	$(".tabs-content").on('click', '.showOpeningHours', function(e) {
	e.stopPropagation();
	e.preventDefault();
	$(this).next(".openingHours").fadeToggle();
});
}
$(".tabs-content").on('click', '.close', function() {
	$(".openingHours").slideUp();
});
$(".tabs-content").on('click', '.showOpeningHours', function(e) {
	e.stopPropagation();
	e.preventDefault();
	$(this).parents('li').siblings().find('.openingHours').slideUp();
});


});