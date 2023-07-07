"use client";

import { updateIsAuthenticated } from "@/redux/features/uiSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const { data } = await axios.get("/api/auth/verify");
        dispatch(updateIsAuthenticated(true));
      } catch (error) {
        dispatch(updateIsAuthenticated(false));
      }
    };
    isAuthenticated();
  }, []);

  return children;
};

export { AuthProvider };
