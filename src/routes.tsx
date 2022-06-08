import React from "react";
import { Header } from "Components/Header";
import { QualityAssurance } from "pages/quality-assurance";
import { Shipping } from "pages/shipping";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

export function RobotFactoryRoutes() {
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
