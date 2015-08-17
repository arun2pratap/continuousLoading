(function ( $ ) {
	var settings;
	var defaults = {
			colNumber: 2,
            evenRowClass: 'evenRow',
            oddRowClass: 'oddRow',
            isjqGrid: true,
            isHTMLTable: false,
			showEmptyCell: true
	};
	
    $.fn.continousLoading = function( options ) {
    	console.log((this));
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