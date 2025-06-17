export type PrototypeEntry = {
  id: string;
  name: string;
  description: string;
  component: React.LazyExoticComponent<
    React.ComponentType<Record<string, never>>
  >;
  settings?: React.LazyExoticComponent<
    React.ComponentType<Record<string, never>>
  >;
  mobileDisabled?: boolean;
};
