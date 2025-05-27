var addressg, zipcodeg, cityg, countrycodeg, numberOfPointsFirstDisplayg, profilSCg;
var addressNeighbor, zipcodeNeighbor, cityNeighbor, profilSCNeighbor, latitudeNeighbor, longitudeNeighbor;
var apiNotLoaded=true;
var apiNeighborLoaded=true;
var amabisUrlWs = "stubstreetaddresses.json";

function searchCities(city) {
	var receiverCityCache = [];
	
	var mydata = $("#inputcityselect").autocomplete({
		focus: function (event, ui) {
		       this.value = ui.item.value.split(" ")[0];
		       event.preventDefault();
		},
		source: receiverCityCache,
		minLength: 1,
		delay: 0,
		select: function(e, ui) {			
			e.preventDefault();
			$("#cp").val(ui.item.label.split(" ")[0]);
			$("#inputcityselect").val(ui.item.value);
			if($("#inputcityselect").val() != ''){
			 	$("#inputcityselect").parent('li').addClass("is-active is-completed");
			}
		}
	}).data( "autocomplete" );	
	if (mydata){
		mydata._renderItem = function( ul, item ) {
			return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( "<a>" + item.label + "</a>" )
			.appendTo( ul );
		};
	}
	
	$("#cp").blur(function(){
		var rcp = $("#cp").val();
		if(rcp == null || rcp.length == 0){
			$("#inputcityselect").autocomplete("option", "source", []);
		}
    });
	
	$("#cp").autocomplete({
		position: {my: "left top", at: "left bottom", collision: "none", of: "#inputcityselect"},
		delay: 0,
		minLength: 5,
		select: function(e, ui) {
			e.preventDefault();
			$("#cp").val(ui.item.label.split(" ")[0]);
			$("#inputcityselect").val(ui.item.value);
			if($("#inputcityselect").val() != ''){
			 	$("#inputcityselect").parent('li').addClass("is-active is-completed");
			}
		},
		focus: function (event, ui) {
			this.value = ui.item.label.split(" ")[0];
			event.preventDefault(); // Prevent the default focus behavior.
		},
		source: function(request, response){
			var query = $("#cp").val() + "&r=" + getRandomNumber();
			$.getJSON("stubcities.json?zipcode=" + query, function(data) {
				
				if(data.citiesList != null && data.citiesList.length == 1){
					receiverCityCache = [];					
					$.map(data.citiesList, function(item) {
						var receiverCity = {};
						receiverCity['label'] = item.label;
						receiverCity['value'] = item.value;
						receiverCityCache.push(receiverCity);
					});
					$("#inputcityselect").autocomplete("option", "source", receiverCityCache);
					response($.map(data.citiesList, function(item) {
						if($("#inputcityselect").val() == null || $("#inputcityselect").val().length == 0){
							$("#inputcityselect").val(item.value);
							if($("#inputcityselect").val() != ''){
							 	$("#inputcityselect").parent('li').addClass("is-active is-completed");
							}
							$("#cp").val(item.label.split(" ")[0]);
						}else{
							return {label: item.label, value: item.value};
						}
					}));
					
				}else{
					if (data.citiesList != null){
						receiverCityCache = [];
						$.map(data.citiesList, function(item) {
							var receiverCity = {};
							receiverCity['label'] = item.label;
							receiverCity['value'] = item.value;
							receiverCityCache.push(receiverCity);
						});
						$("#inputcityselect").autocomplete("option", "source", receiverCityCache);
						response(
							$.map(data.citiesList, function(item) {
								return {label: item.label, value:item.value};
							})
						);	
					}
				}
				
			});			
		}
		
	});
	$('#cp').attr('autocomplete',"false");
	
	$.ui.autocomplete.filter = function (array, term) {
		  var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
		  return $.grep(array, function (value) {
			  return matcher.test(value.label || value.value || value);
		  });
	};
	
	// appeler autocompletion amabis
	var amabisElementAdress = $( "#address" );
	var amabisElementZipcode = $( "#cp" );
	var amabisElementVille = $( "#inputcityselect" );
	getAmabisVoie.autocomplete(amabisUrlWs, amabisElementAdress, amabisElementZipcode, null, amabisElementVille);
	$( "#inputcityselect" ).val(city);
	if($("#inputcityselect").val() != '') {
	 	$("#inputcityselect").parent('li').addClass("is-completed");
	}
}


function processReceive1(address,zipcode,city,countrycode,numberOfPointsFirstDisplay,profilSC){
	addressg = address;
	zipcodeg = zipcode;
	countrycodeg = countrycode;
	cityg = city;
	numberOfPointsFirstDisplayg = numberOfPointsFirstDisplay;
	profilSCg = profilSC;
	
	if(apiNotLoaded){
		var myscript = document.createElement('script');
		myscript.id = 'gmap';
		myscript.type = 'text/javascript';
		//myscript.src = 'https://maps.googleapis.com/maps/api/js?client=gme-chronopostsa&sensor=false&channel=tic&callback=reglagePbMaps';
		//myscript.src = 'https://maps.googleapis.com/maps/api/js?client=gme-geopostsa1&sensor=false&channel=tic&callback=reglagePbMaps';
		myscript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBRMUF2WFPTuARMy78qrV_bdhe22Ry9TaY&sensor=false&channel=tic&callback=reglagePbMaps';		
		document.body.appendChild(myscript);
		apiNotLoaded = false;
	} else {
		reglagePbMaps();
	}
}

function reglagePbMaps(){
	initializemaps();
	codeAddress(addressg,zipcodeg,cityg, countrycodeg, numberOfPointsFirstDisplayg,1,profilSCg);
}



function writePointsList(){
	$.ajax( {
		type : "POST",
		url :  "stubPointsList.html?r="+getRandomNumber(),
		async: false,
		cache: false,
		success : function(responseHtml) {
			$("#listPointsChrono").outerHTML(responseHtml);
			//initAll();
			initAll2();
			setFirstEltClick();
		},
		error : function(xhr, status, error) {
			forwardToErrorPage(xhr.status);
		}
	});
}

function getRandomNumber() {
	return Math.floor(Math.random() * 1000);
}

function setFirstEltClick(){
	$("#point0").attr('checked', true);
	//$("#point_li_0").addClass("pointActive");
}

var longpoints='';

function doShowMorePointsButton(){
	$('#button_ShowMorePoints').show();
}

function handleShowMorePoints(){
    if (markersT && markersT.length > 0) {
        for (var i = 0; i < markersT.length; i++) {
            if (markersT[i]) {
                markersT[i].setVisible(true);
            }
        }
    }
    // Mettre à jour l'affichage de la liste et masquer le bouton
    $("li[id^=point_li_]").removeClass("hidden");
    $('#button_ShowMorePoints').hide();
    longpoints='true';
}

function searchCitiesMagic(city, runfillform){
	
	$("#zipcode").blur(function(){
		var rcp = $("#zipcode").val();
		if(rcp == null || rcp.length == 0){
			$("#inputcityselect").autocomplete("option", "source", []);
		}
    });
	
	var receiverCityCache = [];
	
	var mydata = $("#inputcityselect").autocomplete({
		focus: function (event, ui) {
		       this.value = ui.item.value.split(" ")[0];
		       event.preventDefault();
		},
		source: receiverCityCache,
		minLength: 1,
		delay: 0,
		select: function(e, ui) {			
			e.preventDefault();
			$("#zipcode").val(ui.item.label.split(" ")[0]);
			$("#inputcityselect").val(ui.item.value);
			if($("#inputcityselect").val() != ''){
			 	$("#inputcityselect").parent('li').addClass("is-active is-completed");
			}
		}
	}).data( "autocomplete" );
	if (mydata){
		mydata._renderItem = function( ul, item ) {
			return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( "<a>" + item.label + "</a>" )
			.appendTo( ul );
		};
	}
	
	$("#zipcode").autocomplete({
		position: {my: "left top", at: "left bottom", collision: "none", of: "#inputcityselect"},
		delay: 0,
		minLength: 5,
		select: function(e, ui) {
			e.preventDefault();
			$("#zipcode").val(ui.item.label.split(" ")[0]);
			$("#inputcityselect").val(ui.item.value);
			if($("#inputcityselect").val() != ''){
			 	$("#inputcityselect").parent('li').addClass("is-active is-completed");
			}
		},
		focus: function (event, ui) {
			this.value = ui.item.label.split(" ")[0];
			event.preventDefault(); // Prevent the default focus behavior.
		},
		source: function(request, response){
			var query = $("#zipcode").val() + "&r=" + getRandomNumber();
			$.getJSON("stubcities.json?zipcode=" + query, function(data) {
				
				if(data.citiesList != null && data.citiesList.length == 1){
					receiverCityCache = [];					
					$.map(data.citiesList, function(item) {
						var receiverCity = {};
						receiverCity['label'] = item.label;
						receiverCity['value'] = item.value;
						receiverCityCache.push(receiverCity);
					});
					$("#inputcityselect").autocomplete("option", "source", receiverCityCache);
					response($.map(data.citiesList, function(item) {
						if($("#inputcityselect").val() == null || $("#inputcityselect").val().length == 0){
							$("#inputcityselect").val(item.value);
							if($("#inputcityselect").val() != ''){
							 	$("#inputcityselect").parent('li').addClass("is-active is-completed");
							}
							$("#zipcode").val(item.label.split(" ")[0]);
						}else{
							return {label: item.label, value: item.value};
						}
					}));
					
				}else{
					if (data.citiesList != null){
						receiverCityCache = [];
						$.map(data.citiesList, function(item) {
							var receiverCity = {};
							receiverCity['label'] = item.label;
							receiverCity['value'] = item.value;
							receiverCityCache.push(receiverCity);
						});
						$("#inputcityselect").autocomplete("option", "source", receiverCityCache);
						response(
							$.map(data.citiesList, function(item) {
								return {label: item.label, value:item.value};
							})
						);	
					}
				}
				
			});			
		}
		
	});
	$('#zipcode').attr('autocomplete',"false");
	
	$.ui.autocomplete.filter = function (array, term) {
		  var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
		  return $.grep(array, function (value) {
			  return matcher.test(value.label || value.value || value);
		  });
	};
	
	// appeler autocompletion amabis
	var amabisElementAdress = $( "#address" );
	var amabisElementZipcode = $( "#zipcode" );
	var amabisElementVille = $( "#inputcityselect" );
	getAmabisVoie.autocomplete(amabisUrlWs, amabisElementAdress, amabisElementZipcode, null, amabisElementVille);
	$( "#inputcityselect" ).val(city);
	if($("#inputcityselect").val() != '') {
	 	$("#inputcityselect").parent('li').addClass("is-completed");
	}
	
	if(runfillform=='runfillform'){
	 fillFormPost();
	}
}

function changeadressTestSkillszone(){
	var lecp = $("#zipcode").val();
	var ccity= $("#inputcityselect").val();
	var query = lecp + "&city="+ccity+"&r=" + getRandomNumber();

	$.getJSON("stubcheckzipcodeskillszone.json?zipcode=" + query, function(json) {
		var r = json.errorCode;
		if (r == '0') {
			if(!json.hasError){
				$("#span_zipcode").text('');
				return;
			}
			var options = [];
			$("#inputcityselect").html(options.join(''));
			$("#span_zipcode").text(json.errorMessage);

		} else {
			forwardToErrorPage();
		}
	}).error(function() {
		forwardToErrorPage();
	});
}

function lookForCityComboInit(cityvalue,runfillform){
	  searchCitiesMagic(cityvalue, runfillform);
}

function refreshAddressCity(cityvalue){
	searchCities(cityvalue);
}

function eraseAllGoogleBox(){
	for (var i=0;i<markersT.length;i++){
		if(markersT[i] && markersT[i].infowindow) {
			markersT[i].infowindow.close();
		}	
	}
}

function showgooglebox(pointid){
	eraseAllGoogleBox();
	if(markersT[pointid] && markersT[pointid].infowindow) {
		markersT[pointid].infowindow.open(map,markersT[pointid]);
	}
	// virer pour tous
	// V2 $("li[id^='point_li_']").removeClass("pointActive");
	// ajout pour l elu
	// V2 $("#point_li_"+pointid).addClass("pointActive");
}

function showReceivePoint(pointid){
	// virer pour tous
	// V2 $("li[id^='point_li_']").removeClass("pointActive");
	// ajout pour l elu
	// V2 $("#point_li_"+pointid).addClass("pointActive");
	$("#point"+pointid).attr('checked', true);
}

function eraseLoginFields(i1,i2,i3,i4,i5){
	eraseLoginField(i1);
	eraseLoginField(i2);
	eraseLoginField(i3);
	eraseLoginField(i4);
	eraseLoginField(i5);
}

function eraseLoginField(i){
	if(i==1){
		$("#identificationKey").val('');
	}
	if(i==2){
		$("#passageCodeNumber").val('');
	}
	if(i==3){
		$("#IdentifiantChrono").val('');
	}
	if(i==4){
		$("#password").val('');
	}
	if(i==5){
		$("#identificationKey2").val('');
	}
	if(i==6){
		$("#PAEKey").val('');
	}
}

function checkFieldValue(code,value){
	var query = code + "&value="+value+"&r=" + getRandomNumber();
	$.getJSON("stubfieldcheckvalue.json?code=" + query, function(json) {
		var r = json.errorCode;
		if (r == '0') {
			$("#" + code).removeClass("CBError");
			if(!json.hasError){
				$("#span_"+code).text('');
				return;
			}
			$("#" + code).addClass("CBError");
			$("#span_"+code).text(json.errorMessage);
		} else {
			forwardToErrorPage();
		}
	}).error(function() {
		forwardToErrorPage();
	});
}

function reasonHasChanged(idtoread, idtohide){
	if($("#"+idtoread).val()!='AUTRE_RAISON'){
		$("#"+idtohide).hide();
		$("#errorMsg_"+idtohide).hide();
	} else {
		$("#"+idtohide).show();
		$("#errorMsg_"+idtohide).show();
	}
}

function backToMenu(id){
	window.location = "status.html?l=t&m="+id+"&r="+getRandomNumber();
}

function processChangeShippingDate(){
	$("input[id^='deliveryDate']").prop('checked', false);
	$(".dateActive").removeClass("dateActive");
}

function fillFormPost(){
	var query = "r=" + getRandomNumber();
	$.getJSON("stubformpostfiller.json?" + query, function(json) {
		var r = json.errorCode;
		if (r == '0') {
			$.each(json.list, function(index, item) {
			    $("#"+item.label).val(item.value);
			  });
			$("#bouttonvalider").click();
		} else {
			forwardToErrorPage();
		}
	}).error(function() {
		forwardToErrorPage();
	});
}

function quitter(){
	window.location="olgi_out.html?"+"r=" + getRandomNumber();
}

function changelocale(newlocale){
	window.location="changelocale.html?l="+newlocale;
}

function hideDeliveryHelpAgency(){
	$("#deliveryhelpReceiveId").hide();
}

function showDeliveryHelpAgency(){
	$("#deliveryhelpReceiveId").show();
}

function hideErrorMessageCPVIlleSC(){
	$("#errorMessageCPVIlleSC").hide();
}

function showErrorMessageCPVIlleSC(){
	$("#errorMessageCPVIlleSC").show();
}

function showStep02(){
	$("#step02").show();
}

function textCounter(field, countfield, maxlimit) {
	if (field.value.length >= maxlimit) {
		field.value = field.value.substring(0,maxlimit);
    }
    var reste = maxlimit - field.value.length;
    countfield.value = reste;
}

function clean(field) {
	if (field.value.length >= 1) {
		field.value = field.value.replace(/€/g,"E");
		field.value = field.value.replace(/’/g,"'");
		field.value = field.value.replace(/–/g,"-");
		field.value = field.value.replace(/œ/g,"oe");
		field.value = field.value.replace(/Œ/g,"OE");
		field.value = field.value.replace(/\n|\r|\n\r/g, " ");
	}
}

function writeNewPosteComptable(codePosteComptable) {
	$.ajax( {
		type : "POST",
		url :  "stubWriteNewPosteComptable.html?r="+getRandomNumber()+"&newCodePosteComptable="+codePosteComptable,
		async: false,
		cache: false,
		success : function() {
		},
		error : function(xhr, status, error) {
			forwardToErrorPage(xhr.status);
		}
	});
}

function processNeighborDeliver(address,zipcode,city,latitude,longitude,profilSC){
	addressNeighbor = address;
	zipcodeNeighbor = zipcode;
	cityNeighbor = city;
	profilSCNeighbor = profilSC;
	latitudeNeighbor = latitude;
	longitudeNeighbor = longitude;
	
	hideAdresseDestiInexacte();
	hideAdresseDestiErronee();
	hideErrorMessageAdresseVoisin();
	
	if(apiNeighborLoaded){
		if (latitude != null && latitude != "" && latitude != "-1"
			&& longitude != null && longitude != "" && longitude != "-1") {
			$("#latitudeVoisin").attr('value',latitude);
			$("#longitudeVoisin").attr('value',longitude);
		}
		
		var myscript = document.createElement('script');
		myscript.id = 'gmap';
		myscript.type = 'text/javascript';
		//myscript.src = 'https://maps.googleapis.com/maps/api/js?client=gme-chronopostsa&sensor=false&channel=tic&callback=init';
		//myscript.src = 'https://maps.googleapis.com/maps/api/js?client=gme-geopostsa1&sensor=false&channel=tic&callback=init';
		myscript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBRMUF2WFPTuARMy78qrV_bdhe22Ry9TaY&sensor=false&channel=tic&callback=init';
		document.body.appendChild(myscript);
		apiNeighborLoaded = false;
	} else {
		init();
	}
}

function init(){
	initialize();
	testAdresseDestinataire(addressNeighbor,zipcodeNeighbor,cityNeighbor,latitudeNeighbor,longitudeNeighbor,profilSCNeighbor);
}

function hideAdresseDestiErronee(){
	$("#errorAdresseDestiErronee").hide();
	$("#nameandfirstname").attr("disabled",false);
	$("#address").attr("disabled",false);
	$("#zipcode").attr("disabled",false);
	$("#inputcityselect").attr("disabled",false);
	$("#building").attr("disabled",false);
	$("#floor").attr("disabled",false);
	$("#digicode1").attr("disabled",false);
	$("#digicode2").attr("disabled",false);
	$("#telephone").attr("disabled",false);
	$("#MAIL").attr("disabled",false);
	$("#commentText").attr("disabled",false);
	$("#bouttonvalider").attr("disabled",false);
}

function showAdresseDestiErronee(){
	$("#errorAdresseDestiErronee").show();
	$("#nameandfirstname").attr("disabled",true);
	$("#address").attr("disabled",true);
	$("#zipcode").attr("disabled",true);
	$("#inputcityselect").attr("disabled",true);
	$("#building").attr("disabled",true);
	$("#floor").attr("disabled",true);
	$("#digicode1").attr("disabled",true);
	$("#digicode2").attr("disabled",true);
	$("#telephone").attr("disabled",true);
	$("#MAIL").attr("disabled",true);
	$("#commentText").attr("disabled",true);
	$("#bouttonvalider").attr("disabled",true);
}

function hideAdresseDestiInexacte(){
	$("#errorAdresseDestiInexacte").hide();
	$("#nameandfirstname").attr("disabled",false);
	$("#address").attr("disabled",false);
	$("#zipcode").attr("disabled",false);
	$("#inputcityselect").attr("disabled",false);
	$("#building").attr("disabled",false);
	$("#floor").attr("disabled",false);
	$("#digicode1").attr("disabled",false);
	$("#digicode2").attr("disabled",false);
	$("#telephone").attr("disabled",false);
	$("#MAIL").attr("disabled",false);
	$("#commentText").attr("disabled",false);
	$("#bouttonvalider").attr("disabled",false);
}

function showAdresseDestiInexacte(){
	$("#errorAdresseDestiInexacte").show();
	$("#nameandfirstname").attr("disabled",true);
	$("#address").attr("disabled",true);
	$("#zipcode").attr("disabled",true);
	$("#inputcityselect").attr("disabled",true);
	$("#building").attr("disabled",true);
	$("#floor").attr("disabled",true);
	$("#digicode1").attr("disabled",true);
	$("#digicode2").attr("disabled",true);
	$("#telephone").attr("disabled",true);
	$("#MAIL").attr("disabled",true);
	$("#commentText").attr("disabled",true);
	$("#bouttonvalider").attr("disabled",true);
}

function hideErrorMessageDistanceVoisin(){
	$("#errorMessageDistanceVoisin").hide();
}

function showErrorMessageDistanceVoisin(){
	$("#errorMessageDistanceVoisin").show();
}

function hideErrorMessageAdresseVoisin(){
	$("#errorMessageAdresseVoisin").hide();
}

function showErrorMessageAdresseVoisin(){
	$("#errorMessageAdresseVoisin").show();
}

//Fonction qui va servir � mesurer la distance entre deux points
//g�ographiques
function calculDistance(){
	hideErrorMessageDistanceVoisin();
	hideErrorMessageAdresseVoisin();
	var latitudeDesti = $("#latitudeDesti").val();
	var longitudeDesti = $("#longitudeDesti").val();
	var latitudeVoisin = $("#latitudeVoisin").val();
	var longitudeVoisin = $("#longitudeVoisin").val();
	var erreur = false;
	
	// Appel Ajax qui va tester si la distance entre les deux latitudes/longitudes
	// des adresses initial du colis et du voisin sont � moins de
	// 50 m�tres (param�tre)
	var query = latitudeDesti + "&longitudeDesti=" + longitudeDesti
				+ "&latitudeVoisin=" + latitudeVoisin
				+ "&longitudeVoisin=" + longitudeVoisin
				+ "&r=" + getRandomNumber();
	
	if (latitudeVoisin != null && latitudeVoisin != "" && latitudeVoisin != "-1"
		&& longitudeVoisin != null && longitudeVoisin != "" && longitudeVoisin != "-1") {
		$.ajax( {
			type : "GET",
			url :  "stubfieldcheckdistance.json?latitudeDesti="+query,
			async: false,
			cache: false,
			success : function(json) {
				var r = json.errorCode;
				if (r == '0') {
					if(!json.hasError){
						$("#errorMessageDistanceVoisin").html('');
						erreur = false;
					} else {
						$("#errorMessageDistanceVoisin").html(json.errorMessage);
						showErrorMessageDistanceVoisin();
						erreur = true;
					}
				} else {
					forwardToErrorPage();
					erreur = true;
				}
			},
			error : function(xhr, status, error) {
				forwardToErrorPage(xhr.status);
				erreur = true;
			}
		});
	} else if (latitudeVoisin != null && (latitudeVoisin == "" || latitudeVoisin == "-1")
		&& longitudeVoisin != null && (longitudeVoisin == "" || longitudeVoisin == "-1")) {
			showErrorMessageAdresseVoisin();
			erreur = true;
	} else {
		handleSubmitFclSubpart('neighbordeliver.html','neighbordeliverform');
		$("#latitudeDesti").attr('value',latitudeDesti);
		$("#longitudeDesti").attr('value',longitudeDesti);
		$("#latitudeVoisin").attr('value',latitudeVoisin);
		$("#longitudeVoisin").attr('value',longitudeVoisin);
		erreur = true;
	}
return !erreur;
}

//Fonction qui va servir � mettre � jour la latitude/longitude du voisin
function validNeighborDeliverForm(){
	$("#latitudeVoisin").attr('value',"");
	$("#longitudeVoisin").attr('value',"");

	var adr = $("#address").val();
	if (adr != null && adr != "") {
		adr = $.trim($("#address").val());
		$("#address").attr('value',adr);
	}
	var zip = $("#zipcode").val();
	if (zip != null && zip != "") {
		zip = $.trim($("#zipcode").val());
		$("#zipcode").attr('value',zip);
	}
	var ville = $("#inputcityselect").val();
	
	// Nettoyage de la ville calcul�e � partir du code postal :
	// On ne veut pas faire la recherche dans Google Maps avec l'arrondissement de la ville,
	// donc on supprime l'arrondissement du nom de la ville.
	if (ville != null && ville != "" 
		&& $.trim(ville) != "" && (ville.substring($.trim(ville).lastIndexOf(" ")) != "")
			&& !isNaN(parseInt(ville.substring($.trim(ville).lastIndexOf(" "))))) {
		ville = ville.substring(0,$.trim(ville).lastIndexOf(" "));
	}
	
	adr = adr + " " + zip + " " + ville;
	if (zip != null && zip.length == 5) {
		if (adr != null && adr != "" && (typeof(geocoder) != 'undefined')) {
			geocoder.geocode({'address': adr}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
		    		// Le geocoder Google a trouv�e une adresse, soit apr�s 
		    		// l'avoir l�g�rement modifi�e soit exactement l'adresse de d�part.
		    		for (var j=0; j<1; j++) {
		    				$("#latitudeVoisin").attr('value',results[j].geometry.location.lat());
		    				$("#longitudeVoisin").attr('value',results[j].geometry.location.lng());
		    		}
				} else {
		    	  // Code ereur possible (doc google):
		    	  // "ZERO_RESULTS" indicates that the reverse geocoding was successful but returned no results. This may occur if the geocoder was passed a latlng in a remote location.
		    	  // "OVER_QUERY_LIMIT" indicates that you are over your quota.
		    	  // "REQUEST_DENIED" indicates that the request was denied. Possible causes include:
		    	  // The sensor parameter is missing.
		    	  // The request includes a result_type or location_type parameter but does not include an API key or client ID.
		    	  // "INVALID_REQUEST" generally indicates one of the following:
		    	  // The query (address, components or latlng) is missing.
		    	  // An invalid result_type or location_type was given.
		    	  // "UNKNOWN_ERROR" indicates that the request could not be processed due to a server error. The request may succeed if you try again.
				}
		    	if (testVal() && calculDistance() && testMailVoisin()) {
					handleSubmitFclSubpart('neighbordeliver.html', 'neighbordeliverform');
					initAll();
		    	}
		    	scrollToFirstError();
		    });
		}
	}
	return true;
}

/**
 * Fonction qui renvoie un tableau contenant la liste des jours f�ri�s 
 * pour l'ann�e donn�e en param�tre.
 * 
 * @param an : l'ann�e concern�e par la recherche des jours f�ri�s.
 * @returns {Array}
 */
function JoursFeries(an) {
	var JourAn = new Date(an, "00", "01");
	JourAn = jQuery.datepicker.formatDate('dd/mm/yy', JourAn);
	var FeteTravail = new Date(an, "04", "01");
	FeteTravail = jQuery.datepicker.formatDate('dd/mm/yy', FeteTravail);
	var Victoire1945 = new Date(an, "04", "08");
	Victoire1945 = jQuery.datepicker.formatDate('dd/mm/yy', Victoire1945);
	var FeteNationale = new Date(an,"06", "14");
	FeteNationale = jQuery.datepicker.formatDate('dd/mm/yy', FeteNationale);
	var Assomption = new Date(an, "07", "15");
	Assomption = jQuery.datepicker.formatDate('dd/mm/yy', Assomption);
	var Toussaint = new Date(an, "10", "01");
	Toussaint = jQuery.datepicker.formatDate('dd/mm/yy', Toussaint);
	var Armistice = new Date(an, "10", "11");
	Armistice = jQuery.datepicker.formatDate('dd/mm/yy', Armistice);
	var Noel = new Date(an, "11", "25");
	Noel = jQuery.datepicker.formatDate('dd/mm/yy', Noel);
	
	var G = an%19;
	var C = Math.floor(an/100);
	var H = (C - Math.floor(C/4) - Math.floor((8*C+13)/25) + 19*G + 15)%30;
	var I = H - Math.floor(H/28)*(1 - Math.floor(H/28)*Math.floor(29/(H + 1))*Math.floor((21 - G)/11));
	var J = (an*1 + Math.floor(an/4) + I + 2 - C + Math.floor(C/4))%7;
	var L = I - J;
	var MoisPaques = 3 + Math.floor((L + 40)/44);
	var JourPaques = L + 28 - 31*Math.floor(MoisPaques/4);
	//var Paques = new Date(an, MoisPaques-1, JourPaques);
	//Paques = jQuery.datepicker.formatDate('dd/mm/yy', Paques);
	var LundiPaques = new Date(an, MoisPaques-1, JourPaques+1);
	LundiPaques = jQuery.datepicker.formatDate('dd/mm/yy', LundiPaques);
	var Ascension = new Date(an, MoisPaques-1, JourPaques+39);
	Ascension = jQuery.datepicker.formatDate('dd/mm/yy', Ascension);
	//var Pentecote = new Date(an, MoisPaques-1, JourPaques+49);
	//Pentecote = jQuery.datepicker.formatDate('dd/mm/yy', Pentecote);
	var LundiPentecote = new Date(an, MoisPaques-1, JourPaques+50);
	LundiPentecote = jQuery.datepicker.formatDate('dd/mm/yy', LundiPentecote);
	
	return new Array(JourAn, LundiPaques, FeteTravail, 
			Victoire1945, Ascension, LundiPentecote, FeteNationale, 
			Assomption, Toussaint, Armistice, Noel);
}

/**
 * Renvoie true ou false selon que la date pass�e en param�tre doit ou pas �tre s�lectionnable.
 * 
 * @param date : la date � tester.
 * @returns {Array}
 */
function DisableSpecificDates(date) {
	var string = jQuery.datepicker.formatDate('dd/mm/yy', date);
    var joursFeries = JoursFeries(date.getFullYear());
    return [joursFeries.indexOf(string) == -1];
}

/**
 * Fonction permettant de g�rer l'affichage des checkbox safePlaces
 */
function gestionAffichageCheckboxSafePlaces(){
	$("#resp").hide();
	$("label[for='resp']").hide();
	var tabCheckbox = ['BAL', 'PDP', 'AUTRE'];
	var showSPauth = 0;

	for (var i = 0; i < tabCheckbox.length; i++){
		if ($("input[value='" + tabCheckbox[i] + "']").prop('checked')){
			showSPauth++;
			$("#resp").show();
			$("label[for='resp']").show();
		}
		$("input[value='" + tabCheckbox[i] + "']").change(function(){
			if ($(this).prop('checked')){
				showSPauth++;
			} else if (!$(this).prop('checked')) {
				showSPauth--;
			}
			
			if (showSPauth > 0){
				$("#resp").show();
				$("label[for='resp']").show();
			} else {
				$("#resp").hide();
				$("label[for='resp']").hide();
				var $error_msg = $("#span_resp");
				if($error_msg != null) {
					$error_msg.hide();
				}
			}
		});
	}
}

// Applique une class si text value est non vide
function setClassIfTextValueIsDefined(idName, textValue, classToAdd) {
	if (textValue != null && textValue != undefined && textValue.length != 0) {
		$("#" + idName).addClass(classToAdd);
	}
}

/**
 * Ferme la popin affichée.
 * Cette fonction efface toutes les boîtes Google ouvertes et masque l'élément
 * avec l'ID "deliveryhelpReceiveId" s'il est visible.
 * 
 * @returns {void}
 */
function closePopup() {
    eraseAllGoogleBox();
    $("#deliveryhelpReceiveId").hide();
}

