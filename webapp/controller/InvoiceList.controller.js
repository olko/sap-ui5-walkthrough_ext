sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "../model/formatter",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",

], function(Controller, JSONModel, formatter, Filter, FilterOperator) {
  return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
    formatter: formatter,
    onInit: function() {
      var oViewModel = new JSONModel(
        {
          currency: "EUR",
        });
      this.getView().setModel(oViewModel, "view");
      var oList = this.byId("invoiceList");
      var oBnd = oList && oList.getBinding("items");

      console.log("Binding:\n", oList, oBnd && oBnd.getPath(), oBnd && !!oBnd.getModel());
    },
    onFilterInvoices: function(oEvent) {
      var aFilter = [];
      var sQuery = oEvent.getParameter("query");
      aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));

      var oList = this.byId("invoiceList");
      var oBinding = oList.getBinding("items");
      oBinding.filter(aFilter);
    },
    onPress: function(oEvent) {
      var oItem = oEvent.getSource();
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      var sPath = window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1));
      debugger;
      oRouter.navTo("detail", {
        invoicePath: sPath
      });
    }
  })
})
