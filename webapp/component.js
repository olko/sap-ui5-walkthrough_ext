sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"./controller/HelloDialog",
	"sap/ui/Device"
], function(UIComponent, JSONModel, ResourceModel, HelloDialog, Device) {
	"use strict";
	return UIComponent.extend("sap.ui.demo.walkthrough.component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			console.log("Initializing component...");
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			// set device model
			const oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device")
				;
			const oInvoiceModel = new sap.ui.model.odata.v2.ODataModel(
				"https://services.odata.org/V2/Northwind/Northwind.svc/"
			);
			this.setModel(oInvoiceModel, "invoice");
			// set data models
			var oData = {
				recipient: {
					name: "UI5"
				}
			};
			var oModel = new JSONModel(oData);
			this.setModel(oModel);
			// set dialog
			let oRootControl = this.getRootControl();
			console.log(`Creating HelloDialog with view ${oRootControl}`);
			this._helloDialog = new HelloDialog(oRootControl);
			this.getRouter().initialize();
		},
		openHelloDialog: function() {
			console.log("component opens dialog");
			this._helloDialog.open();
		}
	});
});
