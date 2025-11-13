sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/ui/core/routing/History",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel"
], function(Controller, UIComponent, History, MessageToast, JSONModel) {
  "use strict"
  return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
    onInit: function() {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);

      var oViewModel = new JSONModel({
        "currency": "EUR"
      });
      this.getView().setModel(oViewModel, "view");
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
    },

    onRatingChange: function(oEvent) {
      debugger;
      var fValue = oEvent.getParameter("value");
      var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
      MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
    }
  })
})
