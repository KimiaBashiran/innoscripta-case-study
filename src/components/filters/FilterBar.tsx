import React from 'react';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import { useAppDispatch } from 'src/store/app/hooks';
import { clearAllFilters } from 'src/store/features/articleSlice';
import { categoryList, FilterEntry, sourcesList } from 'src/types/filter-lists';

import DateFilterField from './DateFilterField';
import MultipleValueFilterField from './MultipleValueFilterField';
import SearchBar from './SearchBar';
import SingleValueFilterField from './SingleValueFilterField';

const filtersList: {
  label: string;
  key: string;
  list: FilterEntry[];
  multipleValue: boolean;
}[] = [
  {
    label: 'Sources',
    key: 'sources',
    list: sourcesList,
    multipleValue: true,
  },
  {
    label: 'Category',
    key: 'category',
    list: categoryList,
    multipleValue: true,
  },
];

const FilterBar = () => {
  const dispatch = useAppDispatch();

  const [drawerState, setDrawerState] = React.useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerState(open);
  };

  const handleClearAllFilters = () => {
    dispatch(clearAllFilters());
  };

  return (
    <Box
      className="Filters"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      gap={2}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap={{ xs: 0, lg: 2 }} flex={1}>
          <SearchBar />
          {matches ? (
            <IconButton sx={{ color: 'text.primary' }} onClick={handleClearAllFilters}>
              <DeleteOutlineRoundedIcon />
            </IconButton>
          ) : (
            <Button
              size="small"
              endIcon={<DeleteOutlineRoundedIcon />}
              sx={{ color: 'text.primary' }}
              onClick={handleClearAllFilters}
            >
              Clear Filters
            </Button>
          )}
        </Box>

        <Box display={{ xs: 'flex', lg: 'none' }} justifyContent="center">
          <IconButton onClick={toggleDrawer(true)}>
            <FilterAltRoundedIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerState}
            onClose={toggleDrawer(false)}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              sx={{ width: '75vw' }}
              role="presentation"
              p={2}
            >
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Filters
                  </ListSubheader>
                }
              ></List>
              <Divider />
              <List>
                {filtersList.map((singleFilter) => (
                  <ListItem key={`${singleFilter.key}-${singleFilter.label}`}>
                    {singleFilter.multipleValue ? (
                      <MultipleValueFilterField
                        label={singleFilter.label}
                        id={singleFilter.key}
                        list={singleFilter.list}
                      />
                    ) : (
                      <SingleValueFilterField
                        label={singleFilter.label}
                        id={singleFilter.key}
                        list={singleFilter.list}
                      />
                    )}
                  </ListItem>
                ))}
                <ListItem key="from-date-filter-list-item">
                  <DateFilterField label="Published From" id="dateFrom" />
                </ListItem>
                <ListItem key="to-date-filter-list-item">
                  <DateFilterField label="Published Until" id="dateTo" />
                </ListItem>
              </List>
              <Button
                size="small"
                endIcon={<DeleteOutlineRoundedIcon />}
                sx={{ color: 'text.primary' }}
                onClick={handleClearAllFilters}
              >
                Clear Filters
              </Button>
            </Box>
          </Drawer>
        </Box>
      </Box>
      <Box
        display={{ xs: 'none', lg: 'flex' }}
        flexDirection="row"
        alignItems="center"
        gap={2}
        flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
      >
        {filtersList.map((singleFilter) => {
          return singleFilter.multipleValue ? (
            <MultipleValueFilterField
              key={`${singleFilter.key}-${singleFilter.label}`}
              label={singleFilter.label}
              id={singleFilter.key}
              list={singleFilter.list}
            />
          ) : (
            <SingleValueFilterField
              key={`${singleFilter.key}-${singleFilter.label}`}
              label={singleFilter.label}
              id={singleFilter.key}
              list={singleFilter.list}
            />
          );
        })}
        <DateFilterField label="Published From" id="dateFrom" />
        <DateFilterField label="Published Until" id="dateTo" />
      </Box>
    </Box>
  );
};

export default FilterBar;
