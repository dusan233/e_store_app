import {} from "react-router-dom";
import { Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props extends RouteProps {
  component: any;
}
const ProtectedRoute = ({ component: Component, ...ress }: Props) => {
  let { user } = useAppSelector((state) => state.account);
  return <div>ds</div>;
};

export default ProtectedRoute;
