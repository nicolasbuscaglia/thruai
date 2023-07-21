"use client";

import { setIsAuthenticated, setMember } from "@/redux/features/uiSlice";
import { useGetUserQuery, useVerifyUserQuery } from "@/redux/services/casesApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { data } = useVerifyUserQuery();
  const { data: user } = useGetUserQuery(data?.sub);

  const isAuthenticated = async () => {
    if (data && user) {
      dispatch(setIsAuthenticated(true));
      dispatch(setMember({ ...data, ...user }));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, [data, user]);

  return children;
};

export { AuthProvider };
