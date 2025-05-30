import React, { Suspense } from "react";
import type { ComponentProps } from "react";

import { Loading } from "../loading";

export type PreloadLazy<T extends React.ComponentType> = T & {
  preload: () => Promise<void>;
};

export type LoadableComponent = { preload: () => Promise<void> };

export const lazyLoad = <Props extends ComponentProps<any>>(
  factory: () => Promise<{ default: React.ComponentType<Props> }>,
  fallback = <Loading />,
): React.ComponentType<Props> & { preload: () => Promise<void> } => {
  const LazyComponent = React.lazy(factory);
  let PreloadedComponent: React.ComponentType<Props> | undefined;
  let factoryPromise: Promise<void> | undefined;

  const Component = (props: any): React.ReactElement => {
    const LoadedComponent = LazyComponent || PreloadedComponent;

    return (
      <Suspense fallback={fallback}>
        <LoadedComponent {...props} />
      </Suspense>
    );
  };

  Component.preload = (): Promise<void> => {
    if (!factoryPromise) {
      factoryPromise = factory().then((module) => {
        PreloadedComponent = module.default;
      });
    }

    return factoryPromise;
  };

  return Component;
};
