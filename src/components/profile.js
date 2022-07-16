import { ProfileData } from "./data-profile";
import {
    useMsal,
  } from "@azure/msal-react";
  import React, {useState } from "react";
  import { loginRequest } from "../lib/authConfig";
  import { callMsGraph } from "../lib/microsoft-graph";
function Profile() {
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
            {name ? name : null}
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <div onClick={RequestProfileData}>Get Profile Information</div>
            }
        </>
    );
  };