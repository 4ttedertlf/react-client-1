import React, { useState } from "react";

const Upload = ({ appConfig }) => {
  const baseUrl = appConfig.REACT_APP_SERVER_BASE_URL;

  const [files, setFiles] = useState(null);
  const [printFiles, setPrintFiles] = useState([]);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadState] = useState({});
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const onFileChange = (event) => {
    let arr = [];

    // TBD - remove loop
    for (var i = 0; i < event.target.files.length; i++) {
      console.log(event.target.files[i]);
      arr.push({
        name: event.target.files[i].name,
        size: event.target.files[i].size,
      });
    }
    setPrintFiles(arr);
    setFiles(event.target.files);
  };

  const onFileUpload = async () => {
    try {
      // prepare UI
      setUploading(true);

      // check file size - image analysis only 4 MB
      /*let file = e.target.files[0];
            if (file && !file.name) {
               window.alert("Please select a file");
               return false;
            }
            if (file.size > 10e6) {
              window.alert("Please upload a file smaller than 10 MB");
              return false;
            }*/

      var formData = new FormData();
      for (const key of Object.keys(files)) {
        formData.append("multi-files", files[key]);
      }

      formData.append("user", "hubot");

      const response = await fetch(`${baseUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const serverResponse = await response.json();
      console.log(serverResponse);

      setFiles(null);
      setPrintFiles([]);
      setUploading(false);
      setUploadState(serverResponse);
      setInputKey(Math.random().toString(36));
    } catch (err) {
      console.log(err);
    }
  };

  const UploadStatus = () => {
    if (uploadStatus) {
      return (
        <>
          <div>{uploadStatus?.operationId}</div>
          <div>{uploadStatus?.operationName}</div>
          <div>{uploadStatus?.operationVersion}</div>
          <div>{uploadStatus?.message}</div>
          <div>{uploadStatus?.error}</div>
        </>
      );
    } else return null;
  };

  const File = ({ name, size }) => {
    return (
      <>
        <li>
          <h4>{name}</h4> <h5>{size}</h5>
        </li>
      </>
    );
  };

  const SelectedFiles = () => {
    if (printFiles && printFiles.length > 0) {
      return (
        <ul>
          {printFiles.map(({ name, size }) => (
            <File key={name} name={name} size={size} />
          ))}
        </ul>
      );
    } else return null;
  };

  const UploadForm = () => {
    if (uploading) {
      return <div>Uploading</div>;
    } else {
      return (
        <>
          <div>Image file max size is 4 MB</div>
          <form method="post" encType="multipart/form-data">
            <input
              type="file"
              name="multi-files"
              onChange={onFileChange}
              key={inputKey || ""}
              multiple
            />
            <button type="submit" onClick={onFileUpload}>
              Upload!
            </button>
          </form>
          <hr />
          {baseUrl}
          <hr />
          <SelectedFiles />
          <hr />
          <UploadStatus />
          <hr />
        </>
      );
    }
  };

  return (
    <div>
      <h1>Upload file to Azure Blob Storage</h1>
      {UploadForm()}
    </div>
  );
};

export default Upload;
