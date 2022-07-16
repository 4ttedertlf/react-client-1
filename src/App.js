import { render } from "react-dom";
import { BlobStorage } from "./BlobStorage";
import React, { StrictMode} from "react";
import { getAppConfig } from "./lib/appConfiguration";
import { PublicClientApplication } from "@azure/msal-browser";
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";
import { PageLayout } from "./components/page-layout";

import { msalConfig } from "./lib/authConfig";


import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from "./Welcome";
import {
  reactPlugin,
  appInsights,
  initializeMonitor,
  withAITracking,
} from "./lib/appMonitor";

const msalInstance = new PublicClientApplication(msalConfig);

global.appConfig = getAppConfig();
global.appMonitor = appInsights;

console.log(global.appConfig);

initializeMonitor(global.appConfig.REACT_APP_MICROSOFT_APPLICATION_INSIGHTS);

const InnerApp = () => {
  return (
    <div>
      <PageLayout>
        <AuthenticatedTemplate>
          <BlobStorage appConfig={global.appConfig}/>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Welcome />
        </UnauthenticatedTemplate>
      </PageLayout>
    </div>
  );
};

const MonitoredInnerApp = withAITracking(
  reactPlugin,
  InnerApp,
  "4tt"
);

const App = () => {
  return (
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <MonitoredInnerApp />
      </MsalProvider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
