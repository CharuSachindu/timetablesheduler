import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import TextField from '@mui/material/TextField';


export default function SearchCard({title}) {
  return (
    <Card>
        <CardContent>

        <TextField className='' id="outlined-search" label="Search field" type="search" />
        </CardContent>
    </Card>
  );
}
