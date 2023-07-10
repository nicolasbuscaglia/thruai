"use client";

import { setIsAuthenticated, setMember } from "@/redux/features/uiSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const { data } = await axios.get("/api/auth/verify");
        dispatch(setIsAuthenticated(true));
        dispatch(setMember(data));
      } catch (error) {
        dispatch(setIsAuthenticated(false));
      }
    };
    isAuthenticated();
  }, []);

  return children;
};

export { AuthProvider };
