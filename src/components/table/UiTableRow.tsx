import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { Articles } from 'src/types/articles';

import TableRowExtendedContent from './TableRowExtendedContent';

interface UiTableRowProps {
  row: Articles;
}

const UiTableRow = (props: UiTableRowProps) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow
        hover
        selected={open}
        onClick={handleClick}
        sx={{ '& > *': { borderBottom: 'unset' }, '&:hover': { cursor: 'pointer' } }}
      >
        <TableCell scope="row">
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                maxWidth: { xs: '19rem', lg: 'unset' },
              }}
              noWrap={matches}
            >
              {row.title}
            </Typography>
          </Box>
        </TableCell>
        {!matches && (
          <>
            <TableCell align="right">
              <Typography>{row.author}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>{row.source.name}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>{moment(row.publishedAt).fromNow()}</Typography>
            </TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell padding="none" colSpan={8}>
          <Collapse in={open}>
            <Box display="flex" width="100%">
              <TableRowExtendedContent row={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UiTableRow;
