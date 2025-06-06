import { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import SideBar from "./Sidebar";
import toast from "react-hot-toast";
import { clearErrors, getAllOrders } from "../../reducers/adminOrdersReducer";

const OrderList = () => {
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllOrders());
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
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
          <Link to={`/admin/order/${params.row.id}`}>
            <EditIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: "₹ "+ item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      {/* <MetaData title={`ALL ORDERS - Admin`} /> */}

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
