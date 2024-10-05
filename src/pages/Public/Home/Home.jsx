import useRole from "../../../hooks/useIsAdmin";

const Home = () => {
  const { isAdmin } = useRole();
  console.log(isAdmin);
  return <div>ss</div>;
};

export default Home;
