(function ( $ ) {
	var settings;
	var continousLoading = {
		timeoutVar: window.timeoutVar, // global variable to monitor the continious loading.
		split:30,  // no of rows to be loaded in each time.
		timeOut:50, // the time milliseconds between each split loaded.
		firstPageSize: 250 // no of rows to be shown the first time.
	}
	
    $.fn.continousLoading = function( options ) {
    	var settings = $.extend({}, continousLoading, options.continousLoading );
    	options.continousLoading = settings;
    	var $gridTableObj = (this);
    		if(options.continousLoading.timeoutVar){clearTimeout(options.continousLoading.timeoutVar);}
    		var JSONData = options.data ;
    		var slicedArray = [];
    		var dataCount = JSONData.length;
    		var startIndex = 0;
    		var split = options.continousLoading.split;
    		var endIndex = options.continousLoading.firstPageSize; 
    		slicedArray = JSONData.slice(startIndex,endIndex);
    		startIndex = endIndex ;
    		endIndex = endIndex + split ;
    		options.data = slicedArray;
    		var loadCompleteFunc = options.loadComplete;
    		options.loadComplete = function(data){
    			loadCompleteFunc(data);
				setTimeout(function() {
					clientSideContiniousLoading(JSONData, dataCount, startIndex, endIndex, split);
				},options.continousLoading.timeOut);
    		}    		
    		$gridTableObj.jqGrid(options);
    	
    	function clientSideContiniousLoading(JSONData, dataCount, startIndex, endIndex, split){
    			if(dataCount > startIndex){
    					options.continousLoading.timeoutVar = setInterval(function() {
    						var slicedArray;
    						slicedArray = JSONData.slice(startIndex,endIndex);
    						if(slicedArray.length == 0){
    							clearTimeout(options.continousLoading.timeoutVar);
    							loadCompleteFunc();
    						}
    						console.log('endIndex',endIndex);
    						$gridTableObj.addRowData(undefined, slicedArray);
    						startIndex = endIndex ;
    						endIndex = endIndex + split ;
    					}, options.continousLoading.timeOut);
    			}
    					
    	};
    };
 
}( jQuery ));