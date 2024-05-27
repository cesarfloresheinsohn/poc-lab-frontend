import React from 'react';
import { Container, Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Pagination, Link } from '@mui/material';
import { Search, Edit, FilterList, ArrowUpward, Add } from '@mui/icons-material';

interface Course {
  name: string;
  date: string;
  uploader: string;
  publisher: string;
  status: string;
}

const courses: Course[] = [
  { name: 'Course Name', date: 'Mar 12, 2023', uploader: 'John Doe', publisher: 'Jane Doe', status: 'Published' },
  { name: 'Course Name', date: 'Jun 24, 2023', uploader: 'Chris Smith', publisher: 'Jane Doe', status: 'Request' },
  { name: 'Course Name', date: 'Apr 15, 2023', uploader: 'John Doe', publisher: 'Jane Doe', status: 'Request' },
  { name: 'Course Name', date: 'Jun 24, 2023', uploader: 'Chris Smith', publisher: 'Jane Doe', status: 'Published' },
  { name: 'Course Name', date: 'Apr 15, 2023', uploader: 'John Doe', publisher: 'Jane Doe', status: 'Draft' },
  { name: 'Course Name', date: 'Jun 24, 2023', uploader: 'Chris Smith', publisher: 'Jane Doe', status: 'Published' },
];

const CourseManagement: React.FC = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1">Course Management</Typography>
        <Link href="#" underline="hover" display="inline-flex" alignItems="center">
          <FilterList fontSize="small" />
          <Box ml={1}>Set Filters</Box>
        </Link>
        <Box my={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" startIcon={<Add />}>New Course</Button>
          <Box display="flex">
            <TextField variant="outlined" size="small" placeholder="Search by course, Creator, Calling or Status" />
            <IconButton color="primary">
              <Search />
            </IconButton>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name <ArrowUpward fontSize="small" /></TableCell>
                <TableCell>Date <ArrowUpward fontSize="small" /></TableCell>
                <TableCell>Uploader <ArrowUpward fontSize="small" /></TableCell>
                <TableCell>Publisher <ArrowUpward fontSize="small" /></TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.date}</TableCell>
                  <TableCell>{course.uploader}</TableCell>
                  <TableCell>{course.publisher}</TableCell>
                  <TableCell>{course.status}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" startIcon={<Edit />}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
          <Pagination count={5} color="primary" />
          <Typography>1-30 / 100 Per page: 30</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CourseManagement;
