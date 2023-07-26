"use client";
import { selectMember } from "@/redux/features/uiSlice";
import { useAddAWSFileMutation } from "@/redux/services/casesApi";
import React, { useState, createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";

const FilesContext = createContext({});

const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(false);
  const member = useSelector((state) => selectMember(state));
  const [addAWSFile] = useAddAWSFileMutation();

  const processFiles = async ({ caseId }) => {
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file.rawFile, file.rawFile.name);
        formData.append(
          "metadata",
          JSON.stringify({
            clientId: member.clientId,
            userId: member.cognitoId,
            caseId: caseId,
            ...file,
          })
        );

        const fileResponse = await addAWSFile(formData);
        if (fileResponse.error) {
          throw new Error(fileResponse.error.data?.message);
        }
      }
      setFiles([]);
    } catch (err) {
      console.log("Error uoloading file", err);
    }
  };

  const context = {
    files,
    setFiles,
    update,
    setUpdate,
    processFiles,
  };

  return (
    <FilesContext.Provider value={context}>{children}</FilesContext.Provider>
  );
};

const useFiles = () => useContext(FilesContext);

export { FilesProvider, useFiles };
