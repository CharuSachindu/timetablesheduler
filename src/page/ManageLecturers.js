import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '../Components/button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function ManageLecturers() {
  const [lecturerID, setLecturerID] = useState('');
  const [lecturerName, setLecturerName] = useState('');
  const [module, setModule] = useState('');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [faculty, setFaculty] = useState();
  const [department, setDepartment] = useState();
  const [lecturers, setlecturers] = useState();
  const [addOpen, setAddOpen] = useState(false);

  const handleClickAddOpen = () => {
    setAddOpen(true);
  }

  const handleAddClose = () => {
    setAddOpen(false);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/getLecturers')
      .then(result => setlecturers(result.data))
      .catch(err => console.log(err))
    console.log(lecturers)

  }, [])

  const departments = {
    'School of Computing': ['SE', 'CC', 'CS', 'DS'],
    'School of Engineering': ['Civil', 'Electronic', 'Mecha', 'Marine']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Code to send data to the backend (e.g., using fetch or axios)
    console.log('Lecturer ID:', lecturerID);
    console.log('Lecturer Name:', lecturerName);
    console.log('Username:', username);
    console.log('password', password);
    console.log('Faculty', faculty);
    console.log('Department', department);

    axios.post(`http://localhost:5000/createLecturers?lec_id=${lecturerID}&name=${lecturerName}&username=${username}&password=${password}&faculty=${faculty}&department=${department}`)
      // axios.post(`http://localhost:5000/api/students/createStudents?index=${studentIndex}`+ studentName,department,batch,faculty)
      .then(response => {
        console.log(response.data); // Handle successful response
      })

    // window.location.reload();

    // Reset the form
    // setLecturerID('');
    // setLecturerName('');
    // setModule('');
  };


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lecturers?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (

    <div className='ml-4'>
      <div className=' flex flex-row gap-3 pb-5 pt-3 w-full h-full'>
        <div className='basis-1/4'>
          {/* <div className=' flex flex-col justify-center shadow-md hover:bg-gray-300 rounded p-10'>
        Add lecturer
        </div> */}
          <Button title={"Add Lecturer"} onClick={handleClickAddOpen} />
        </div>

        <div className=' flex flex-col justify-center basis-3/4 shadow-md pl-5 pr-1'>
          <TextField id="outlined-search" label="Search field" type="search" />
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <div className='font-bold text-base'>
                    Name
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div className='font-bold text-base'>
                    Department
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div className='font-bold text-base'>
                    Faculty
                  </div>
                </TableCell>
              </TableRow>
              {(lecturers)?.map((row) => (
                <TableRow key={row.lec_id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.department}
                  </TableCell>
                  <TableCell align="right">
                    {row.faculty}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={lecturers?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>


      <Dialog
        open={addOpen}
        onClose={handleAddClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleAddClose();
          },
        }}
      >

        <DialogTitle>Add Lecturer</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td>
                  <label>
                    Username:
                  </label>
                </td>
                <td>
                  <TextField id="outlined-search" label="Search field" type="search" onChange={(e) => setUsername(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Password:
                  </label>
                </td>
                <td>
                  <TextField id="outlined-password-input" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Lecturer ID:
                  </label>
                </td>
                <td>
                  <TextField id="outlined-search" label="Search field" type="search" onChange={(e) => setLecturerID(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Lecturer Name:
                  </label>
                </td>
                <td>
                  <TextField id="outlined-search" label="Search field" type="search" onChange={(e) => setLecturerName(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Choose the faculty
                  </label>
                </td>
                <td>
                  <select
                    value={faculty}
                    onChange={(e) => {
                      setFaculty(e.target.value);
                      setDepartment('');
                    }}
                  >
                    <option value="">Select Faculty</option>
                    <option value="School of Computing">School of Computing</option>
                    <option value="School of Engineering">School of Engineering</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Choose the Department:
                  </label>
                </td>
                <td>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    disabled={!faculty}
                  >
                    <option value="">Select Department</option>
                    {faculty && departments[faculty].map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                <Button type="submit" title={"Submit"} onClick={(e) => handleSubmit}>Submit</Button>
                </td>
                <td>
                <Button onClick={handleAddClose} title={"Cancel"}>Cancel</Button>
                </td>
              </tr>
            </table>

          </form>
        </DialogContent>
        <DialogActions>
          
          
        </DialogActions>

      </Dialog>
    </div>
  );
}

export default ManageLecturers;
