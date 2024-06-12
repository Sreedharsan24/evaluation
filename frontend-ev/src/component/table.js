/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";
import FormPage from "./formPage";
import axios from "axios";
import UpdateForm from "./updateform";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicTable() {
  const toastConfig = {
    position: "top-right",
    autoClose: 3000, // Close the message after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const hasFetched = React.useRef(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateHandleOpen = (id) => {
    setSelectedId(id);
    setUploadOpen(true);
  };

  const updateHandleClose = () => {
    setUploadOpen(false);
    setSelectedId(null);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7100/task/profiles");
      setRows(response.data[0].data[0]);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  React.useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchData();
  }, []);

  const handleFormClose = () => {
    handleClose();
    fetchData();
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:7100/task/delete?id=${id}`);
      console.log(response)
      if(response.data[0].status_code === 200) {
        toast.success("User Deleted Successfully!", toastConfig);
      }
      setRows((prevRows) => prevRows.filter((row) => row._id !== id));
    } catch (error) {
      console.log("Error deleting row", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <ToastContainer />
      <FormPage open={open} handleClose={handleFormClose} />
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow className="table-head">
              <TableCell align="center" className="table-head-cell">
                Profile
              </TableCell>
              <TableCell align="center" className="table-head-cell">
                User ID
              </TableCell>
              <TableCell align="center" className="table-head-cell">
                Name
              </TableCell>
              <TableCell align="center" className="table-head-cell">
                Phone
              </TableCell>
              <TableCell align="center" className="table-head-cell">
                Address
              </TableCell>
              <TableCell align="center" className="table-head-cell" colSpan={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Add User+
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) && rows.length > 0 ? (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row._id} className="table-row">
                    <TableCell
                      align="center"
                      sx={{ display: "flex", justifyContent: "center" }}
                      className="table-cell"
                    >
                      <Avatar alt={row.name} src={row.profile} />
                    </TableCell>
                    <TableCell align="center" className="table-cell">
                      {row.userID}
                    </TableCell>
                    <TableCell align="center" className="table-cell">
                      {row.name}
                    </TableCell>
                    <TableCell align="center" className="table-cell">
                      {row.phone}
                    </TableCell>
                    <TableCell align="center" className="table-cell">
                      {row.Address}
                    </TableCell>
                    <TableCell align="center" className="table-cell">
                      <IconButton
                        aria-label="edit"
                        onClick={() => updateHandleOpen(row._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" className="table-cell">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ margin: "0 auto", width: "80%" }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedId && (
        <UpdateForm
          open={uploadOpen}
          handleClose={updateHandleClose}
          id={selectedId}
        />
      )}
    </div>
  );
}
