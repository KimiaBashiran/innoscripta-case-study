import React from 'react';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { CardMedia, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { Articles } from 'src/types/articles';

interface UiTableRowProps {
  row: Articles;
}

const TableRowExtendedContent = (props: UiTableRowProps) => {
  const { row } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Card elevation={0} sx={{ width: '100%' }}>
      <CardContent>
        <Box display="flex" flexDirection={matches ? 'column' : 'row'} gap={2}>
          <CardMedia
            component="img"
            sx={{ width: 151, borderRadius: '4px' }}
            image={row.urlToImage}
            alt={row.description}
          />
          <Box display="flex" flexDirection="column" flex={1}>
            <Typography variant="body2" color="text.secondary" mb={{ xs: 2, lg: 1 }}>
              {row.content}
            </Typography>
            {matches && (
              <>
                <Typography variant="body2" color="text.secondary" flex={1}>
                  Author: {row.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" flex={1}>
                  Source: {row.source.name}
                </Typography>
              </>
            )}
            <Typography variant="body2" color="text.secondary" flex={1}>
              {moment(row.publishedAt).format('LLLL')}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" mb={{ xs: 0, lg: 1 }}>
            {row.url && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LaunchRoundedIcon />}
                size={matches ? 'small' : 'medium'}
                href={row.url}
                target="_blank"
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                Read More
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TableRowExtendedContent;
