import { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
// import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import toast from "react-hot-toast";
import {
  clearDeleteErrors,
  clearErrors,
  clearisDeleted,
  deleteProductsAdmin,
  getAdminProducts,
} from "../../reducers/adminProductReducer";
import Loader from "../layout/Loader/Loader";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.adminProducts);

  const {
    error: deleteError,
    loading: deleteLoading,
    isDeleted,
  } = useSelector((state) => state.deleteProducts);

  const deleteProductHandler = (id) => {
    dispatch(deleteProductsAdmin(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearDeleteErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      dispatch(clearisDeleted());
      navigate("/admin/dashboard");
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, isDeleted]);

  if (deleteLoading) {
    return <Loader />;
  }

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: "₹ " + item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      {/* <MetaData title={`ALL PRODUCTS - Admin`} /> */}

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            className="productListTable"
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
