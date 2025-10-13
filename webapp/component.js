sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/resource/ResourceModel",
  "./controller/HelloDialog"
], function(UIComponent, JSONModel, ResourceModel, HelloDialog) {
  "use strict";
  return UIComponent.extend("sap.ui.demo.walkthrough.component", {
    metadata: {
      manifest: "json"
    },
    init: function() {
      console.info("Initializing component...");
      // call the init function of the parent
      UIComponent.prototype.init.apply(this, arguments);
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
      console.info(`Creating HelloDialog with view ${oRootControl}`);
      this._helloDialog = new HelloDialog(oRootControl);
    },
    openHelloDialog: function() {
      console.info("component opens dialog");
      this._helloDialog.open();
    }
  });
});
