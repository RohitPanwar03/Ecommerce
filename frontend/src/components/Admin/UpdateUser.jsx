import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
// import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  clearUserDetailError,
  getUserDetails,
  updateUserErrors,
  updateUserRole,
  updateUserSuccess,
} from "../../reducers/adminUserReducer";

const UpdateUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.getUserDetail);

  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = useSelector((state) => state.updateUserRole);

  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearUserDetailError());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(updateUserErrors());
    }

    if (success) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch(updateUserSuccess());
    }
  }, [dispatch, error, success, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("role", role);

    dispatch(updateUserRole({ userId, myForm }));
  };

  return (
    <Fragment>
      {/* <MetaData title="Update User" /> */}
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  readOnly
                  value={user.name}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  readOnly
                  value={user.email}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
