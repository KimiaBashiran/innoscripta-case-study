import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { useAppDispatch, useAppSelector } from 'src/store/app/hooks';
import { changeFilters, SingleFilterProps } from 'src/store/features/articleSlice';

interface SingleDateFilterFieldProps {
  label: string;
  id: string;
}

const DateFilterField = (props: SingleDateFilterFieldProps) => {
  const { label, id } = props;
  const { filters } = useAppSelector((state) => state.article);
  const [selectedItems, setSelectedItems] = React.useState<string>(
    filters.find((singleItem: SingleFilterProps) => singleItem.key === id)?.value || null,
  );

  React.useEffect(() => {
    if (!filters.length) {
      setSelectedItems('');
    }
  }, [filters]);

  const dispatch = useAppDispatch();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  const handleItemsChange = (value: Moment | null) => {
    setSelectedItems(moment(value).format('YYYY-MM-DD'));
    dispatch(changeFilters({ key: id, value: moment(value).format('YYYY-MM-DD') }));
  };

  return matches ? (
    <Box display="flex" flexDirection="column" width="100%">
      <DatePicker
        label={label}
        value={selectedItems ? moment(selectedItems) : null}
        onChange={(newValue) => handleItemsChange(newValue)}
      />
    </Box>
  ) : (
    <FormControl sx={{ width: { xs: '100%', lg: 160 } }} size="small">
      <DatePicker
        label={label}
        value={selectedItems ? moment(selectedItems) : null}
        onChange={(newValue) => handleItemsChange(newValue)}
      />
    </FormControl>
  );
};

export default DateFilterField;
