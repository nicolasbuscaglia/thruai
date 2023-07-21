"use client";
import React, { useState, createContext, useContext } from "react";

const FilesContext = createContext({});

const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  const context = {
    files,
    setFiles,
  };
  return (
    <FilesContext.Provider value={context}>{children}</FilesContext.Provider>
  );
};

const useFiles = () => useContext(FilesContext);

export { FilesProvider, useFiles };
