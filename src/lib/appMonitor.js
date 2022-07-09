import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory({ basename: '' });
let reactPlugin = new ReactPlugin();
let appInsights = null;

function initializeMonitor(resourceKeyOrConnectionString){
    
    var appInsights = new ApplicationInsights({
        config: {
            connectionString: resourceKeyOrConnectionString,
            extensions: [reactPlugin],
            extensionConfig: {
              [reactPlugin.identifier]: { history: browserHistory }
            }
        }
    });
    appInsights.loadAppInsights();
    return appInsights;
}

export { reactPlugin, appInsights, initializeMonitor, withAITracking };