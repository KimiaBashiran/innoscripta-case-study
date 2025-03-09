import React from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'src/store/app/hooks';
import { changeFilters, SingleFilterProps } from 'src/store/features/articleSlice';
import { FilterEntry } from 'src/types/filter-lists';

interface SingleFilterFieldProps {
  label: string;
  id: string;
  list: FilterEntry[];
}

const SingleValueFilterField = (props: SingleFilterFieldProps) => {
  const { label, id, list } = props;
  const { filters } = useAppSelector((state) => state.article);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const [selectedItems, setSelectedItems] = React.useState<string>(
    filters.find((singleItem: SingleFilterProps) => singleItem.key === id)?.value || '',
  );

  React.useEffect(() => {
    if (!filters.length) {
      setSelectedItems('');
    }
  }, [filters]);

  const dispatch = useAppDispatch();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  const handleClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleItemsChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(value);
    dispatch(changeFilters({ key: id, value: value }));
  };

  return matches ? (
    <Box display="flex" flexDirection="column" width="100%">
      <Button
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={mobileMenuOpen ? <ExpandLess /> : <ExpandMore />}
        color="inherit"
        sx={{
          justifyContent: 'space-between',
        }}
        size="small"
      >
        <Box display="flex" height="32px" alignItems="center">
          {label}
        </Box>
      </Button>
      <Collapse in={mobileMenuOpen} unmountOnExit>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedItems}
            onChange={handleItemsChange}
            sx={{ py: 1 }}
          >
            {list.map((singleItem, index) => (
              <FormControlLabel
                key={`${index}-${singleItem.label}`}
                value={singleItem.value}
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2" noWrap>
                    {singleItem.label}
                  </Typography>
                }
                sx={{ pl: 0.5 }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Collapse>
    </Box>
  ) : (
    <FormControl sx={{ width: { xs: '100%', lg: 160 } }} size="small">
      <InputLabel id={`${label}-filter-field`}>{label}</InputLabel>
      <Select
        labelId={`${label}-filter-field`}
        color="primary"
        value={selectedItems as any}
        input={<OutlinedInput label={label} />}
        onChange={handleItemsChange}
      >
        {list.map((singleItem) => (
          <MenuItem key={singleItem.label} value={singleItem.value} dense>
            {singleItem.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleValueFilterField;
