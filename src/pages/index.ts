import { lazyLoad } from "../components";

export const Dashboard = lazyLoad(
  () => import(/*  webpackChunkName: "Dashboard" */ "./dashboard"),
);
