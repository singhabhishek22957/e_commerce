import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import React, { useEffect, useState } from "react";
import { Dialog } from "../ui/dialog";
import AdminOrdersDetailsView from "./orders-details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderDetails, resetOrderDetails } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  // const [orderDetails, setOrderDetails] = useState({});

  const handleOrderDetails = (orderId) => {
    // setOrderDetails(order);
    dispatch(getOrderDetails(orderId)).then((res) => {
      console.log("order details", res);
      // dispatch(getAllOrders());
    });
    setOpenDetailsDialog(true);
  };

  useEffect(() => {
    dispatch(getAllOrders()).then((res) => {
      console.log("res", res);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!openDetailsDialog) {
      dispatch(getAllOrders()).then((res) => {
        console.log("res", res);
      });
      dispatch(resetOrderDetails());
      console.log("openDetailsDialog", openDetailsDialog);
      
      console.log("reset order details", orderDetails);
    }
  }, [dispatch, openDetailsDialog]);

  return (
    <Card>
      <CardHeader>
        <CardTitle> All Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only"></span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList &&
              orderList.length > 0 &&
              orderList.map((order) => (
                <TableRow>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>
                    {order?.orderDate
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        order.orderStatus === "delivered"
                          ? "bg-green-500"
                          : "bg-black"
                      }`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOrderDetails(order?._id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        {orderDetails && (
          <AdminOrdersDetailsView
            order={orderDetails}
            setClose={setOpenDetailsDialog}
          />
        )}
      </Dialog>
    </Card>
  );
};

export default AdminOrdersView;
