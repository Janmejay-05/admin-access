import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProductPrivate = ({ children }) => {
  const { userAuth, role } = useSelector((state) => state.login);

  console.log("private role", role);

  return userAuth ? children : <Navigate to={"/"} />;
};

export default ProductPrivate;
