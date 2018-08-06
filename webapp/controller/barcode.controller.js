sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("barcodescan.controller.barcode", {

		onInit: function() {
			var oViewModel = new sap.ui.model.json.JSONModel({
				number: 0
			}, true);
			this.getView().setModel(oViewModel, "viewModel");
		},

		scanSuccess: function(oEvent) {
			var sText = oEvent.getParameters().text;
			this.getView().byId("barcodeResult").setText(sText);
		},
		scanFail: function(oEvent) {
			var sText = "Scan Failed";
			this.getView().byId("barcodeResult").setText(sText);
		},

		textFormatter: function(sValue) {
			console.log(sValue);
			return sValue;
		},

		onInputLiveChange: function(oEvt) {
			// var sValue = oEvent.getSource().getValue();
			var oControl = oEvt.getSource();
			// if (oControl.getValueState() === sap.ui.core.ValueState.Error) {
			try {
				var oBinding = oControl.getBinding("value");
				var oValue = oEvt.getParameters().value;
				var oParsedValue = oBinding.getType().parseValue(oValue, oBinding.sInternalType);
				oBinding.getType().validateValue(oParsedValue);
				var sState = isNaN(oParsedValue) ? sap.ui.core.ValueState.Error : sap.ui.core.ValueState.None;
				oControl.setValueState(sState);
			} catch (ex) {

			}
			// }
		},

		onInputChange: function(oEvent) {
			var oControl = oEvent.getSource();
			this.validateFloatInput(oControl);
		},

		validateFloatInput: function(oControl) {
			var oBinding = oControl.getBinding("value");
			var oValue = oControl.getValue();
			try {
				var oParsedValue = oBinding.getType().parseValue(oValue, oBinding.sInternalType);	// throw error if cannot parse value
				if (oParsedValue) {oControl.setValueState(sap.ui.core.ValueState.None);} else {
					oControl.setValueState(sap.ui.core.ValueState.Error);
				}
			} catch (ex) {
				oControl.setValueState(sap.ui.core.ValueState.Error);
			}
		}
	});
});