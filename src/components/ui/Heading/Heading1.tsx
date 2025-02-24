type Props = {
  children: React.ReactNode;
};

export const Heading1 = ({ children }: Props) => (
  <h1 className="text-2xl font-bold">{children}</h1>
);
