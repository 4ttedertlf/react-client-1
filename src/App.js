import { render } from "react-dom";
import Blob from "./Blob";
import Upload from "./Upload";
import React, { StrictMode, useState } from "react";
import { getAppConfig } from "./lib/appConfiguration";
import { PublicClientApplication } from "@azure/msal-browser";
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { PageLayout } from "./components/nav-bar";
import { msalConfig, loginRequest } from "./lib/authConfig";
import { ProfileData } from "./components/data-profile";
import { callMsGraph } from "./lib/microsoft-graph";
import 'bootstrap/dist/css/bootstrap.min.css';

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

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
      const request = {
          ...loginRequest,
          account: accounts[0]
      };

      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance.acquireTokenSilent(request).then((response) => {
          callMsGraph(response.accessToken).then(response => setGraphData(response));
      }).catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
              callMsGraph(response.accessToken).then(response => setGraphData(response));
          });
      });
  }

  return (
      <>
          <h5 className="card-title">Welcome {name}</h5>
          {graphData ? 
              <ProfileData graphData={graphData} />
              :
              <div onClick={RequestProfileData}>Get Profile Information</div>
          }
      </>
  );
};
const InnerApp = () => {
  return (
    <div>
      <PageLayout>
        <AuthenticatedTemplate>
          You are signed in. 
          <ProfileContent />
          <Upload appConfig={global.appConfig} />
          <Blob />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>You are not signed in! Please sign in.</p>
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
