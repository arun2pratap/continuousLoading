contniousLoading
=================

A wraper to jqGrid plugin to provide continous Loading till all the data get's loaded.

## Demo
download contniousLoading_1.0.0 and run default.html inside demo folder

##How to use:
Use it the same was as the jqGrid with an additional parameter to continous loading
				
##Options:
Options are the same as jQgrid option with an additional option 
continousLoading : {timeoutVar: timeoutVar, split:30, timeOut:150,  firstPageSize: 50}

```javascript
	$('#plainHTMLTable').continousLoading({
			datatype : "local",
			data : jsonData,
			width : ($(window).width() - 70),
			gridview : true,
			loadonce : true,
			colNames : collumNames,
			colModel : collumModel,
			rowNum : 150000,			
			viewrecords : true,
			subGrid : false,
			autoheight : true,
			autowidth : false,
			shrinkToFit : true,
			cellsubmit : 'clientArray',
			cellEdit : false,
			jsonReader : {
				root : "rows",
				repeatitems : false
			},
			cmTemplate: { title: false },
			loadComplete : function(data) {
				$("tr.jqgrow:odd").addClass("oddRow");
				$("tr.jqgrow:even").addClass("evenRow");
			},
			continousLoading : {
				timeoutVar: timeoutVar,
				split:30,
				timeOut:150,
				firstPageSize: 50
			}
		});
```
continousLoading {
	timeoutVar: timeoutVar, // global variable to monitor the continious loading.
	split:30,  // no of rows to be loaded in each time.
	timeOut:150, // the time milliseconds between each split loaded.
	firstPageSize: 50 // no of rows to be shown the first time.
}

##Effects:
Will render the data/row continuously as per the continousLoading option's provided.

##Additional:

If you want the data to be loaded when we scroll down, you can use the in-build functionality given by jqGrid
