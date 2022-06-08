import React, { useEffect } from "react";
import { Header } from "Components/Header";
import { QualityAssurance } from "pages/quality-assurance";
import { Shipping } from "pages/shipping";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { fetchRobotsForQA } from "store/robot";
import { LIMIT } from "constants/index";

export function RobotFactoryRoutes() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchRobotsForQA(LIMIT));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />

      <Container className="mt-5">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/quality-assurance" />}
          ></Route>
          <Route
            path="/quality-assurance"
            element={<QualityAssurance />}
          ></Route>
          <Route path="/shipping" element={<Shipping />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
