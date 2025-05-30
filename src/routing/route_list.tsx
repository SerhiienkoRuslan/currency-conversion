import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { routes, paths } from "./routes";

const renderRoutes = () =>
  routes.map(({ name, path, component: Component }) => (
    <Route key={name} path={path()} element={<Component />} />
  ));

export const RouteList: React.FC = () => (
  <Routes>
    {renderRoutes()}
    <Route path="*" element={<Navigate to={paths.dashboard()} replace />} />
  </Routes>
);
