export function getAppConfig() {

  const appConfiguration = {
    REACT_APP_SERVER_BASE_URL: process.env.REACT_APP_SERVER_BASE_URL,
    
    // Workspace connection string
    REACT_APP_MICROSOFT_APPLICATION_INSIGHTS: process.env.REACT_APP_MICROSOFT_APPLICATION_INSIGHTS
  };

  let errors = "";
  if (!process.env.REACT_APP_SERVER_BASE_URL)
    errors += "REACT_APP_SERVER_BASE_URL is missing\n";
  if (!process.env.REACT_APP_MICROSOFT_APPLICATION_INSIGHTS)
    errors += "REACT_APP_MICROSOFT_APPLICATION_INSIGHTS is missing\n";
  if (errors) {
    console.log(errors);
    throw Error(errors);
  }

  return appConfiguration;
}
