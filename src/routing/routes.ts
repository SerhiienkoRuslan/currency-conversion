import * as CommonPages from "../pages";

export type RouteType = {
  name: string;
  path: () => string;
  component: React.ComponentType;
};

type RoutesNameType = (typeof routes)[number]["name"];

type PathsType = {
  [K in RoutesNameType]: () => string;
};

export const routes: RouteType[] = [
  {
    name: "dashboard",
    path: (): string => "/",
    component: CommonPages.Dashboard,
  },
];

export const paths: PathsType = routes.reduce(
  (acc, { name, path }) => ({
    ...acc,
    [name]: path,
  }),
  {},
);
