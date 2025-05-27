var placeSearch, autocomplete, geocoder;
var componentForm = {
  locality: "long_name",
  postal_code: "short_name",
};

var markers = []; // Tableau de markers adresse
var markersT = []; // Tableau de markers points

var map;

var shadow,
  iconeAgence,
  iconeBureau,
  iconePoint,
  iconeAgence_H,
  iconeBureau_H,
  iconePoint_H;

const SIXTH_MARKER_INDEX_ON_MAP = 5;

function removeAllMarkers() {
  var tableSize = markers.length;
  for (i = 0; i < tableSize; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  tableSize = markersT.length;
  for (i = 0; i < tableSize; i++) {
    markersT[i].setMap(null);
  }
  markersT = [];
}

function initializemaps() {
  shadow = new google.maps.MarkerImage(
    "img/beachflag_shadow.png?v1.0",
    // The shadow image is larger in the horizontal dimension
    // while the position and offset are the same as for the main image.
    new google.maps.Size(37, 32),
    new google.maps.Point(0, 0),
    new google.maps.Point(0, 32)
  );

  iconeAgence = new google.maps.MarkerImage(
    "img/picto-point-V2_A.png?v1.0",
    // This marker is 20 pixels wide by 32 pixels tall.
    new google.maps.Size(45, 32), // 20, 32
    // The origin for this image is 0,0.
    new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    new google.maps.Point(0, 32)
  );
  iconeBureau = new google.maps.MarkerImage(
    "img/picto-point-V2_B.png?v1.0",
    // This marker is 20 pixels wide by 32 pixels tall.
    new google.maps.Size(45, 32), // 20, 32
    // The origin for this image is 0,0.
    new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    new google.maps.Point(0, 32)
  );
  iconePoint = new google.maps.MarkerImage(
    "img/picto-point-V2_P.png?v5.0",
    // This marker is 20 pixels wide by 32 pixels tall.
    new google.maps.Size(34, 34), // 20, 32
    // The origin for this image is 0,0.
    new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    new google.maps.Point(17, 34)
  );

  iconeAgence_H = new google.maps.MarkerImage(
    "img/picto-point-V2_A_H.png?v1.0",

    new google.maps.Size(35, 35), // 20, 32
    // The origin for this image is 0,0.
    new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    new google.maps.Point(17, 17)
  );
  iconeBureau_H = new google.maps.MarkerImage(
    "img/picto-point-V2_B_H.png?v1.0",
    // This marker is 20 pixels wide by 32 pixels tall.
    new google.maps.Size(50, 45), // 20, 32
    // The origin for this image is 0,0.
    new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    new google.maps.Point(0, 32)
  );
  iconePoint_H = new google.maps.MarkerImage(
    "img/picto-point-V2_P_H.png?v5.0",
    // This marker is 20 pixels wide by 32 pixels tall.
    new google.maps.Size(45, 32), // 20, 32
    // The origin for this image is 0,0.
    new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at 0,32.
    new google.maps.Point(0, 32)
  );

  geocoder = new google.maps.Geocoder();

  var centreCarte = new google.maps.LatLng(46.227638, 2.213749);

  var myOptions = {
    zoom: 6,
    center: centreCarte,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);
}

function stringToXML(text) {
  if (window.ActiveXObject) {
    var doc = new ActiveXObject("Microsoft.XMLDOM");
    doc.async = "false";
    doc.loadXML(text);
  } else {
    var parser = new DOMParser();
    var doc = parser.parseFromString(text, "text/xml");
  }
  return doc;
}

function codeAddress(
  paramAddress,
  pzipcode,
  pcity,
  pcountrycode,
  numberOfPointsFirstDisplay,
  idtry,
  profilSC
) {
  var address = paramAddress + " " + pzipcode + " " + pcity;
  if (pcountrycode !== undefined && pcountrycode != "") {
    address = paramAddress + " " + pzipcode + " " + pcity + " ," + pcountrycode;
  }

  hideErrorMessageCPVIlleSC();
  console.log(address);

  var bounds = new google.maps.LatLngBounds();
  var persistId = -1;

  removeAllMarkers();
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      for (i = 0; i < 1; i++) {
        markers[i] = new google.maps.Marker({
          map: map,
          position: results[i].geometry.location,
          title: results[i].formatted_address,
        });
        var pointprincipallat = markers[i].position.lat();
        var pointprincipallon = markers[i].position.lng();
        $.getJSON(
          "stubpointsearch.json?lat=" +
            markers[i].position.lat() +
            "&lon=" +
            markers[i].position.lng() +
            "&r=" +
            getRandomNumber() +
            "&z=" +
            pzipcode +
            "&c=" +
            pcity,
          function (json) {
            var r = json.errorCode;
            if (r == "0") {
              writePointsList();
              $.each(json.olgiPointList, function (i, c) {
                var icon = iconePoint;
                if (c.presentationPointType == "B") {
                  icon = iconeBureau;
                } else if (c.presentationPointType == "A") {
                  icon = iconeAgence;
                } else if (c.presentationPointType == "P") {
                  icon = iconePoint;
                } else if (c.presentationPointType == "B_H") {
                  icon = iconeBureau_H;
                } else if (c.presentationPointType == "A_H") {
                  icon = iconeAgence_H;
                } else if (c.presentationPointType == "P_H") {
                  icon = iconePoint_H;
                } else if (
                  c.presentationPointType == "B_PC" ||
                  c.presentationPointType == "P_PC"
                ) {
                  return;
                }

                var v = true;
                if (i >= numberOfPointsFirstDisplay) {
                  v = false;
                }

                markersT[i] = new google.maps.Marker({
                  icon: icon,
                  shadow: shadow,
                  map: map,
                  position: new google.maps.LatLng(c.latitude, c.longitude),
                  title: c.name,
                  visible: v,
                });

                var text = c.tooltips;
                markersT[i].infowindow = new google.maps.InfoWindow({
                  content: text,
                });

                google.maps.event.addListener(
                  markersT[i],
                  "click",
                  function (point) {
                    eraseAllGoogleBox();
                    showReceivePoint(c.id);
                    if (persistId != -1) {
                      if (persistId != i) {
                        markersT[persistId].infowindow.close();
                      }
                    }
                    for (x = 0; x < markersT.length; x++)
                      if (
                        markersT[x].position.lat() == point.latLng.lat() &&
                        markersT[x].position.lng() == point.latLng.lng()
                      ) {
                        markersT[x].infowindow.open(map, markersT[x]);
                        persistId = x;
                      }
                  }
                );
                // s'assure que tous les points sont visibles sur la carte
                bounds.extend(
                  new google.maps.LatLng(
                    markersT[i].getPosition().lat(),
                    markersT[i].getPosition().lng()
                  )
                );
              });

              bounds.extend(
                new google.maps.LatLng(pointprincipallat, pointprincipallon)
              );
              map.fitBounds(bounds);
            } else if (r == "-2") {
              if (idtry == 1) {
                codeAddress(
                  " ",
                  pzipcode,
                  pcity,
                  pcountrycode,
                  numberOfPointsFirstDisplay,
                  2,
                  profilSC
                );
              } else if (idtry == 2) {
                codeAddress(
                  "",
                  pzipcode,
                  "",
                  pcountrycode,
                  numberOfPointsFirstDisplay,
                  4,
                  profilSC
                );
              } else if (idtry == 4) {
                if (profilSC == "true") {
                  // Le code postal et la ville sont erron�s, positionnement d'un code postal par d�faut
                  // pour ne pas bloquer la recherche des points pour le SC.
                  pzipcode = "75001";
                  codeAddress(
                    "",
                    pzipcode,
                    "Paris",
                    "FR",
                    numberOfPointsFirstDisplay,
                    4,
                    profilSC
                  );
                  showErrorMessageCPVIlleSC();
                } else {
                  forwardToErrorPage02();
                  // mettre un z�ro dans le dernier chiffre. Pour recherche par CP plus efficace.
                  pzipcode = pzipcode.replace(/(\s+)?.$/, "0");
                }
              }
            } else {
              forwardToErrorPage();
            }
          }
        ).error(function () {
          forwardToErrorPage();
        });
      }
    } else {
      if (idtry == 1) {
        codeAddress(
          " ",
          pzipcode,
          pcity,
          pcountrycode,
          numberOfPointsFirstDisplay,
          2,
          profilSC
        );
      } else if (idtry == 2) {
        codeAddress(
          "",
          pzipcode,
          "",
          pcountrycode,
          numberOfPointsFirstDisplay,
          4,
          profilSC
        );
      }
    }
  });
}

// Initialisation des champs et du geocoder Google
function initialize() {
  $("#latitudeVoisin").attr("value", "-1");
  $("#longitudeVoisin").attr("value", "-1");

  geocoder = new google.maps.Geocoder();
}

function testAdresseDestinataire(
  paramAddress,
  paramZipcode,
  paramCity,
  latitude,
  longitude,
  profilSC
) {
  var address = paramAddress + " " + paramZipcode + " " + paramCity;
  var j;
  hideAdresseDestiErronee();
  hideAdresseDestiInexacte();
  console.log(address);

  geocoder.geocode({ address: address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      for (j = 0; j < 1; j++) {
        $("#latitudeDesti").attr("value", results[j].geometry.location.lat());
        $("#longitudeDesti").attr("value", results[j].geometry.location.lng());
        $("#latitudeVoisin").attr("value", latitude);
        $("#longitudeVoisin").attr("value", longitude);
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
      showAdresseDestiErronee();
    }
  });
}

function showSixthElement() {
  var sixthMarkerElement = $(".listPointsChrono li:nth-child(6)");

  sixthMarkerElement.removeClass("hidden");
}

function showSixthMarkerOnLoad() {
    if (markersT && markersT.length > SIXTH_MARKER_INDEX_ON_MAP && markersT[SIXTH_MARKER_INDEX_ON_MAP]) {
  		markersT[SIXTH_MARKER_INDEX_ON_MAP].setVisible(true);
    }
}

// Exécute showSixthMarkerOnLoad() lorsque la page est complètement chargée
function executeOnPageLoad(func) {
  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    func();
  } else {
    document.addEventListener("DOMContentLoaded", func);
  }
}

// Fonction à exécuter lorsque la page est complètement chargée
function onPageLoad() {
  // Appel de la fonction showSixthMarkerOnLoad()
  showSixthMarkerOnLoad();
}

// Appel de la fonction executeOnPageLoad() avec onPageLoad() comme argument
executeOnPageLoad(onPageLoad);
