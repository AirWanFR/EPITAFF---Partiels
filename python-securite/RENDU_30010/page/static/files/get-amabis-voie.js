var getAmabisVoie = {

		option : {
			minLength: 3,
			scrollHeight: 400,
		},

    /*
    url : url ajax appeler
    amabisElementAdre : div id addresses
    amabisElementCodp : div id code poste
    */
 
		autocomplete : function(url, amabisElementAdre, amabisElementCodp, amabisElementPays, amabisElementVille) {

		      $(amabisElementAdre).autocomplete({
		
		    	  source: function( request, response ) {
		
		    		  var nationalZipCodePattern = /\d{5}/;
		
		    		  if (amabisElementPays == null || isNational($(amabisElementPays).val())) {
		      			
		    			  if (nationalZipCodePattern.test($(amabisElementCodp).val()) == true) {
		      			
		    				  $.ajax({
		      					              
		    					  url: url,
		    					  data: {
		
		    						  zipCode:$(amabisElementCodp).val(),
		    						  streetAddress:$(amabisElementAdre).val(),
		    						  city:$(amabisElementVille).val()
		
		    					  },
								
		    					  type: "POST",						
		      					
		    					  dataType: "json",
		      					
		    					  success: function( data ) {
		      						               
		    						  if (data != null) {
		      									               
		    							  response($.map(data, function (item) {
		
		    								  var nval = item;
		    								  var cplg = 0, fpar = 0;
		    								  var cpar = '', ccroch='', extrait, label;
		    								  var spar = nval.indexOf("[");
		
		    								  if (spar > 0) {
		
		    									  fpar = nval.indexOf("]");
		    									  extrait = $.trim(nval.slice(0 , spar) + ' ' + nval.slice(fpar+1));
		
		    								  } else {
		    									  extrait = nval;
		
		    								  }
		                                    			
		    								  spar = extrait.indexOf("[");
		                                    			
		    								  if (spar > 0) {
		                                    	
		    									  fpar = nval.indexOf("]");
		    									  extrait = $.trim(nval.slice(0 , spar) + ' ' + nval.slice(fpar+1));
		
		    								  }
		
		    								  spar = extrait.indexOf(":");
		                                    	
		    								  if (spar > 0) {
		    									  extrait = extrait.slice(spar+1);
		    								  }
		                                    			
		    								  label = extrait;
		                                    			
		    								  spar = extrait.indexOf("(");
		
		    								  if (spar > 0) {
		    									  fpar = extrait.indexOf(")");
		    									  cpar = extrait.slice(spar+1 , fpar);
		    									  extrait = extrait.slice(0 , spar);
		
		    								  }
		
		    								  return {
		    									  id : extrait,
		    									  cp:cpar,
		    									  value: extrait,
		    									  label: label
		    									  };
		
		    							  }));
		      								                                
		    						  }
		      					                                            
		    					  }
		    				  });
		      				              
		    			  }
		    		  }
		    	  },
		
		      			
		    	  focus : function (event, ui) {
		    		  this.value = ui.item.value;
		    		  event.preventDefault(); // Prevent the default focus behavior.
		    	  },
		
		      			
		    	  minLength: this.option.minLength,
		
		    	  scrollHeight: this.option.scrollHeight,
		               
		    	  select: function( event, ui ) {
		      			          
		    		  event.preventDefault();
		    		  var cpar = ui.item.cp;
		    		  cplg = cpar.length;
		              
		    		  if (cplg == 5) {
		    			  var oldcpv = $(amabisElementCodp).val();
		    			  cp = oldcpv.slice(0 , 5);
		    			  if (cp != cpar) {
		    				  $(amabisElementCodp).val(cpar);
		    			  }
		
		    		  }
		    	  }
		      });

 }

}



