sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/util/UriParameters"
], function(MockServer, UriParameters) {
	"use strict";

	return {
		init: function() {
			// Create
			var oMockServer = new MockServer({
				rootUri: "https://services.odata.org/Northwind/Northwind.svc/"
			});

			var oUriParameters = new UriParameters("window.location.href");

			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});

			// simulate
			var sPath = "../localService";
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

			// start mock server
			oMockServer.start();
		}
	}
})
