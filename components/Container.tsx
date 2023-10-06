type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="w-11/12 max-w-4xl mx-auto px-6">{children}</div>;
};
export default Container;
