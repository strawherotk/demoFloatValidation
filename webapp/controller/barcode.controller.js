sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("barcodescan.controller.barcode", {
		scanSuccess: function(oEvent) {
			var sText = oEvent.getParameters().text;
			this.getView().byId("barcodeResult").setText(sText);
		},
		scanFail: function(oEvent) {
			var sText = "Scan Failed";
			this.getView().byId("barcodeResult").setText(sText);
		}
	});
});