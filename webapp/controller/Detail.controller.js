sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/ui/core/routing/History"
], function(Controller, UIComponent, History) {
  "use strict"
  return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
    onInit: function() {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched: function(oEvent) {
      console.log("View 'Detail': \n\tShipperName: {invoice>ShipperName}", "\n\tProductName: {invoice>ProductName}");
      console.log("_onObjectMatched, Arguments: ", window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath));
      console.log("_onObjectMatched, oEvent: ", oEvent);
      let view = this.getView();
      view.bindElement({
        "path": "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
        "model": "invoice"
      });
    },
    onNavBack: function() {
      var oHistory = History.getInstance();
      var oPreviousHash = oHistory.getPreviousHash();

      if (oPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        this.getRouterFor(this).navTo("overview");
      }
    }
  })
})
