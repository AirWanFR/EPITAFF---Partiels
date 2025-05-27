function handleSubmitReceiveP2(){
	var p=$('input[type=radio][name=points]:checked').attr('id');
	$.ajax( {
		type : "POST",
		url :    "stubpointsubmit.html?p="+p+"&r=" + getRandomNumber()+"&sp="+longpoints,
		data : $("#receivep2form").serialize(),
		async: false,
		cache: false,
		success : function(responseHtml) {
	 		$("#receivep2form").outerHTML(responseHtml);
	 		initAll2();
		},
		error : function(xhr, status, error) {
			forwardToErrorPage(xhr.status);
		}
	});
	
	scrollToFirstError();
}

function handleSubmitReceiveP1(){
	$.ajax( {
		type : "POST",
		url :    "stubaddresspointsubmit.html",
		data : $("#receiveaddressform").serialize(),
		async: false,
		cache: false,
		success : function(responseHtml) {
			$("#receiveaddressform").outerHTML(responseHtml);
		},
		error : function(xhr, status, error) {
			forwardToErrorPage(xhr.status);
		}
	});
}

function handleSubmit(targeturl,formid) {
	$.ajax( {
		type : "POST",
		url :    targeturl + ".html",
		data : $("#" + formid).serialize(),
		async: false,
		cache: false,
		success : function(responseHtml) {
			//$(".tabs-content").html(responseHtml);
			$("#tabs li[id='"+targeturl+".html'] .tabs-content").html(responseHtml);
		},
		error : function(xhr, status, error) {
			forwardToErrorPage(xhr.status);
		}
	});
	
	scrollToFirstError();
}

// function forwardToErrorPage(errorStream) {
// 		location.href = "error500.jsp";
// }

// function forwardToErrorPage() {
// 	location.href = "error500.jsp";
// }

function forwardToErrorPage02() {
	location.href = "addresszipcodecoherencelack.html";
}

function handleSubmitFclSubpart(urlpost,formid){
	$.ajax( {
		type : "POST",
		url :    urlpost,
		data : $("#"+formid).serialize(),
		async: false,
		cache: false,
		success : function(responseHtml) {
			$("#divcontentBlocsubpart").outerHTML(responseHtml);
		},
		error : function(xhr, status, error) {
			forwardToErrorPage(xhr.status);
		}
	});
	
	// Pour appliquer le style CSS au champs renseignés
	$(".tabs-content input, .tabs-content textarea").each(function(){
		if($(this).val()!= ''){
			$(this).parent().addClass("is-completed");
		}
	});
	
	scrollToFirstError();
}

function scrollToFirstError() {

	// Récupérer la première erreur
	var firstError = $(":not(:empty)").filter("span.CBError, p.CBError").first();

	// Vérifier si l'objet n'est pas null
	if(firstError.val() != null && typeof firstError.val() != "undefined") {
		
		var elmtTop = firstError.prev().offset().top; // Récupérer la "top position" de l'element précedant l'erreur
		
		var screenTop = $(document).scrollTop(); // Récupérer la "top position" de l'ecran
		
		// Vérifier si l'erreur n'est pas dejà affichée sur l'ecran
		if(elmtTop !== null && elmtTop < screenTop) {
			$('html, body').animate({scrollTop:firstError.prev().offset().top}, 500);
		}
	}
}

function doIt(enable, disable, multicolis) {
	var blocListNoLTId = "#blocListeNumeroLT";	
	if($(blocListNoLTId).css('display') == 'none') {
		$(blocListNoLTId).show("slow");
		$("#otherLT").text(enable);
	} else {
		$(blocListNoLTId).hide("slow");
		if(multicolis == undefined || multicolis=="false"){
			$("textarea").val("");
		}
		$("#otherLT").text(disable);
	}	
}

function gestionBoutonDuplication(disable, enable){
	if ($("#otherLT").text() == disable){
		$("#otherLT").text(enable);
		$('#duplicationStatus').val(true);
	} else if ($("#otherLT").text() == enable){
		$("#otherLT").text(disable);
		$('#duplicationStatus').val(false);
	}
	$(".mod-lt").slideToggle();
}
