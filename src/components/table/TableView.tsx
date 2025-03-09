import * as React from 'react';
import { useEffect } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Fab, TableFooter, TablePagination, useMediaQuery, useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import UiTableRow from 'src/components/table/UiTableRow';
import ScrollTop from 'src/hooks/ScrollTop';
import { Articles, ArticlesResponse } from 'src/types/articles';

import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { setLoading, setPage } from '../../store/features/articleSlice';

interface TableViewProps {
  window?: () => Window;
  articles: ArticlesResponse['articles'];
}
const TableView = (props: TableViewProps) => {
  const { totalResults, page } = useAppSelector((state) => state.article);
  const { window, articles } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useAppDispatch();

  const [newPage, setNewPage] = React.useState(page);

  const handleChangePage = (event: unknown, newPage: number) => {
    setNewPage(newPage);
    dispatch(setPage(newPage));
    dispatch(setLoading(true));
    handleScrollToTop();
  };

  useEffect(() => {
    if (page !== newPage) setNewPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleScrollToTop = () => {
    const anchor = document.querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <>
      <TableContainer sx={{ overflow: 'visible' }}>
        <Table aria-label="sticky table" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell size={matches ? 'small' : 'medium'}>
                <Typography textTransform="uppercase" variant={matches ? 'body2' : 'body1'}>
                  Title
                </Typography>
              </TableCell>
              {!matches && (
                <>
                  <TableCell align="right">
                    <Typography textTransform="uppercase">Author</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography textTransform="uppercase">Source</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography textTransform="uppercase">Published At</Typography>
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!articles || !articles.length ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <SearchOffIcon />
                  <Typography>No results found for this search!</Typography>
                </TableCell>
              </TableRow>
            ) : (
              [
                articles?.map((row, index: number) => (
                  <UiTableRow key={`${index}-${row.source.id}`} row={row as Articles} />
                )),
              ]
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[100]}
                count={totalResults}
                rowsPerPage={100}
                page={newPage}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {matches && (
        <ScrollTop {...window}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      )}
    </>
  );
};

export default TableView;
