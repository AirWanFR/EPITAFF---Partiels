// LOGGER tips
var log = new Log(Log.DEBUG, Log.popupLogger);
// will popup a new window and log 'foo'

var initClosePopin = function(){
	if($(".closePopin").size()>0){
		$(".closePopin").click(function(){
			$(this).parents(".popin").fadeOut();
			if($("#mask").size()>0) $("#mask").hide();
			return false;
		});
	}
	if($("#mask").size()>0){
		$("#mask").click(function(){
			$(".popin").hide();
			$("#mask").hide();
		});
	}
};

var initShowHelpPopin = function(){
	if($(".aTooltip").size()>0){
		$(".aTooltip").hover(function(e){
			if($(this).find("span").size()>0){
				$("#popinHelpContent").empty();
				$(this).find("span").clone().appendTo("#popinHelpContent");
				var offset = $(this).offset();
				var t = offset.top + 20;
				var l = offset.left + 20;
				$("#popinHelp").css({top: t+"px", left: l+"px"});
			 
				$("#popinHelp").show();
			}
		}, function(){
			if($("#popinHelp").size()>0) $("#popinHelp").hide();
		});
	}
};

var checkField = function(elt){
	/* Exemple d'appel */
	if($(elt).val().length>0){
		if($(elt).hasClass("default")){
			if($(elt).val() == $(elt).attr("title")){checkInvalid(elt);}
			else{checkValid(elt);}
		}
		else{
			checkValid(elt);
		}
	}
	else{
		checkInvalid(elt);
	}
	if($(elt).parents(".contentBloc").find(".invalid").size()>0){
		$(elt).parents(".contentBloc").addClass("inValidBloc");
	}
	else{
		$(elt).parents(".contentBloc").removeClass("inValidBloc");
	}
};

var checkValid = function(elt){	
	if($(elt).next(".valid").size()>0) $(elt).next(".valid").remove();
	if($(elt).next(".invalid").size()>0) $(elt).next(".invalid").remove();
	$(elt).siblings(".CBError").hide();
	var htmlOk = ' <span class="valid"></span>';	
	$(htmlOk).insertAfter(elt);
};
var checkInvalid = function(elt){
	if($(elt).next(".valid").size()>0) $(elt).next(".valid").remove();
	if($(elt).next(".invalid").size()>0) $(elt).next(".invalid").remove();
	$(elt).siblings(".CBError").css({display: "block"});
	var htmlError = ' <span class="invalid"></span>';
	$(htmlError).insertAfter(elt);
};

var checkAllFields = function(){	
	if($(".authentification").size()==0){
		if($(".required[type=text]").size()>0){
			$(".required[type=text]").blur(function(){
				checkField($(this));
			});
		}
		if($(".notRequired[type=text]").size()>0){
			$(".notRequired[type=text]").blur(function(){
				if($(this).val().length>0){
					if($(this).next(".valid").size()==0){
						var htmlOk = ' <span class="valid"></span>';	
						$(htmlOk).insertAfter(this);
					}
				}
			});		
		}
		if($("select.notRequired").size()>0){
			$("select.notRequired").change(function(){
				if($(this).next(".valid").size()==0){
					var htmlOk = ' <span class="valid"></span>';	
					$(htmlOk).insertAfter(this);
				}
			});
		}
		if($(".required[type=checkbox]").size()>0){
			$("input[type=submit]").click(function(){
				if(!$(".required[type=checkbox]").is(":checked")){
					$(".required[type=checkbox]").siblings(".CBError").css({display: "block"});
					return false;
				}
			});
		}
	}
	else{
		if($(".required[type=text]").size()>0){
			$("input[type=submit]").click(function(){
				$(".required[type=text]").each(function(){
					checkField($(this));
				});
				fixeColHeight();
				if($(".invalid").size()>0) return false;
			});
		}
	}
};

var initSelectDeliveryDate = function(){
	if($("#listDeliveryDates li").size()>0){
		$("#listDeliveryDates li").click(function(){
			if(!$(this).hasClass("dateActive")){
				$(".dateActive").find("input").removeAttr("checked");
				$(".dateActive").removeClass("dateActive");
				$(this).find("input").attr("checked","checked");
				$(this).addClass("dateActive");
				$("#shippingDate").val('');
			}
		});
	}
};

var initDate = function(){
	if($(".SBDateInput").size()>0){
		$(".SBDateInput").datepicker({
			showOn: "both",
			buttonText: 'Choisir une date',
			buttonImage: "img/calendar.png?v1.0",
			onClose: function(dateText, inst) {if($(this).hasClass("required")) checkField($(this));}
		});
	}
};

/* 
 * Pris en charge dans la fonction "$(".tabs li a").on('click', function(e)" du fichier scripts.js
 * 
var initTabs = function(){
	if($("#tabs li > a").size()>0){
		$("#tabs li > a").click(function(e){
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
			if($(this).parent("li").hasClass("tabopen")){
				//Pour scoller au haut de la page en fermant l'option
				$('html,body').animate({scrollTop: $("html").offset().top}, 'slow');
			} else {
				//Pour scoller a l'option active
				var idDiv =  $(this).parent('li').attr("id");
				$('html, body').animate({scrollTop:$("#tabs li[id='"+idDiv+"']").offset().top}, 500);
			}
			
			$(this).next(".tabs-content").slideToggle();
			$(this).parent('li').siblings().children('a').next(".tabs-content").slideUp();
			$(this).parent('li').toggleClass('tabopen');
			$(this).parent('li').siblings().removeClass('tabopen');
			
			return false;
		});
	}
};
*/


/* 
 * INUTILE POUR TIC_V2
 * 
var initShowOpenHours = function(){
	// INUTILE POUR TIC_V2
	if($(".showOpeningHours").size()>0){
		$(".showOpeningHours").hover(function(){
			if($(this).parent(".pointDetail").next(".openingHours").size()>0){
				$("#openingHours").empty();
				$(this).parent(".pointDetail").next(".openingHours").clone().appendTo("#openingHours");
				var offset = $(this).offset();
				var t = offset.top + 15;
				var l = offset.left - 50;
				$("#popinRelais").css({top: t+"px", left: l+"px"});
				$("#popinRelais").show();
			}
		}, function(){
			if($("#popinRelais").size()>0) $("#popinRelais").hide();
		});
	}
};
*/

var showGeolocPopin = function() {	
	var href = $("#colisoutaiGeolocColisAdresse").val();	
	var winW = $(window).width();	
    var width = $('.mainContainer').css("width").replace("px", "");
    var height = 600;
    var toppx = ($(window).height() / 2) - (height / 2);    
    var leftpx = (winW - width) / 2;    
    window.open(href, "popupWindow", "width=" + width + ",height=" + height + ",scrollbars=no,left=" + leftpx + ",top="+toppx);
};

var blocHeight = 0;
var fixeColHeight = function(){
	if($(".contentBlocsContainer").size()>0){
		$(".contentBlocsContainer .CBFormHeight").css({height: "auto"});
		$(".contentBlocsContainer .CBFormHeight").each(function(){
			var tmpH = $(this).height();
			if(tmpH > blocHeight) blocHeight = tmpH;
		});
		$(".contentBlocsContainer .CBFormHeight").height(blocHeight);
	}
};

var initAll = function(){
	fixeColHeight();
	initShowHelpPopin();
	initClosePopin();
	initSelectDeliveryDate();
	//initShowOpenHours();
	//initTabs();
};

var initAll2 = function(){
	fixeColHeight();
	initShowHelpPopin();
	initClosePopin();
	initSelectDeliveryDate();
	//initShowOpenHours();
};

$(document).ready(function(){
	 initAll();
	//For Smartphone
	if($(".showFormContent").size()>0){
		$(".showFormContent").click(function(){
			if(!$(this).next(".CBFormContainer").is(":visible")){
				$(this).next(".CBFormContainer").show();
				$(this).addClass("clicked");
			}
			else{
				if($(this).hasClass("clicked")){
					$(this).next(".CBFormContainer").hide();
					$(this).removeClass("clicked");
				}
			}
		});
	};
	if($(window).width() <= 700){
	 $(".entete").prepend('<span class="hamburger" id="hamburger">Menu</span>');
	 $("#hamburger").click(function(){
	 $(".entete ul").slideToggle();
		});
	}
});