sap.ui.define([
  "sap/ui/base/ManagedObject",
  "sap/ui/core/Fragment"
], function(ManagedObject, Fragment) {
  "use strict";

  return ManagedObject.extend("sap.ui.demo.walkthrough.controller.HelloDialog", {
    constructor: function(oView) {
      this._oView = oView;
    },
    exit: function() {
      delete this._oView;
    },
    open: function() {
      var oView = this._oView;
      if (!oView.byId("helloDialog")) {
        console.info("oView child with id 'HelloDialog' missing! Creating a new one.");
        var oFragmentController = {
          onCloseDialog: function() {
            oView.byId("helloDialog").close();
          }
        }
        Fragment.load({
          id: oView.getId(),
          name: "sap.ui.demo.walkthrough.view.HelloDialog",
          controller: oFragmentController
        }).then(function(oDialog) {
          console.info("Fragment has been loaded.")
          oView.addDependent(oDialog);
          oDialog.open();
        });
      } else {
        oView.byId("helloDialog").open();
        console.info("oView child with id 'HelloDialog' has been found and opened!");
      }
      console.info("HelloDialog has been constructed");
    },
  });
})
