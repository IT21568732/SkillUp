import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    async function getPaymentHistory() {
      await axios
        .get("http://localhost:8005/payment/get-transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPayments(res.data);
          setIsLoading(false)
          console.log(res.data);
          console.log(payments);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getPaymentHistory();
    console.log(payments);
  }, []);
  return (
    <div className="ml-52 ml- mt-10">
  
      <TableContainer sx={{ maxWidth: 1200 }} component={Paper}>
        <Table sx={{ maxWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell  align="center">Course</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && payments?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row?.courseName}</TableCell>
                <TableCell align="center">{row?.payment?._id}</TableCell>
                <TableCell align="center">{row?.payment?.price}</TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}