sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/core/Fragment"],
  function(Controller, MessageToast, Fragment) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
      onShowHello: function() {
        // read msg from i18n model
        var oBundle = this.getView().getModel("i18n").getResourceBundle();
        var sRecipient = this.getView()
          .getModel()
          .getProperty("/recipient/name");
        var sMsg = oBundle.getText("helloMsg", [sRecipient]);
        // Show message
        MessageToast.show(sMsg);
      },
      onOpenDialog: function() {
        var oView = this.getView();

        if (!this.byId("helloDialog")) {
          Fragment.load({
            id: oView.getId(),
            name: "sap.ui.demo.walkthrough.view.HelloDialog",
            controller: this
          }).then(function(oDialog) {
            oView.addDependent(oDialog);
            oDialog.open();
          });
        } else {
          this.byId("helloDialog").open();
        }
      },
      onCloseDialog: function() {
        this.byId("helloDialog").close();
      }
    });
  },
);
