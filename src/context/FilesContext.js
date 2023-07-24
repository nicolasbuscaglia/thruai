"use client";
import React, { useState, createContext, useContext } from "react";

const FilesContext = createContext({});

const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(false);

  const context = {
    files,
    setFiles,
    update,
    setUpdate,
  };
  return (
    <FilesContext.Provider value={context}>{children}</FilesContext.Provider>
  );
};

const useFiles = () => useContext(FilesContext);

export { FilesProvider, useFiles };
