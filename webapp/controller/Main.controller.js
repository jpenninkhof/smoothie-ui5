sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/penninkhof/smootie/controls/smoothie"
], function(Controller) {
	"use strict";

	return Controller.extend("com.penninkhof.smootie.controller.Main", {

		onInit: function() {
			this.component = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()));
			
			// Get a reference to the model and add a TimeSeries property
			var chartModel = this.component.getModel("chart");
			chartModel.setProperty("/random", new TimeSeries());

			// Every 500ms a new random number between 0 and 10,000 is added to the time series
			setInterval(function() {
		        chartModel.getProperty("/random").append(new Date().getTime(), Math.random() * 10000);
		    }, 500);
		    
		},
		
		onAfterRendering: function() {
			
			// Get a reference to the smooty control
			var control = this.byId("awesome");
			
			// Bind the random TimeSeries to the chart
		    control.addTimeSeries(
		    	this.component.getModel("chart").getProperty("/random"), 
		    	{ 
		    		strokeStyle: 'rgba(0, 255, 0, 1)', 
		    		fillStyle: 'rgba(0, 255, 0, 0.2)', 
		    		lineWidth: 4 
		    	});
		    	
		    // Start streaming
		    control.startStreaming();
		}

	});

});