import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function ClickCard({title}) {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
            <Typography  className='p-3' gutterBottom variant="h5" component="div">

          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography className='p-3' gutterBottom variant="h5" component="div">

          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
