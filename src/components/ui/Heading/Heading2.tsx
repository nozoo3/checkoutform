type Props = {
  children: React.ReactNode;
};

export const Heading2 = ({ children }: Props) => (
  <h1 className="text-xl font-bold">{children}</h1>
);
