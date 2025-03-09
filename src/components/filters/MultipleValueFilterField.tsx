import React from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
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

const MultipleValueFilterField = (props: SingleFilterFieldProps) => {
  const { label, id, list } = props;
  const { filters } = useAppSelector((state) => state.article);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>(
    filters.find((singleItem: SingleFilterProps) => singleItem.key === id)?.value || [],
  );

  React.useEffect(() => {
    if (!filters.length) {
      setSelectedItems([]);
    }
  }, [filters]);

  const dispatch = useAppDispatch();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  const handleClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = selectedItems.indexOf(value);
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(value);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
    dispatch(changeFilters({ key: id, value: newSelectedItems }));
  };

  const handleItemsChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;
    const value2 = value as any;
    const newFilter = typeof value2 === 'string' ? value2.split(',') : value2;

    setSelectedItems(newFilter);
    dispatch(changeFilters({ key: id, value: newFilter }));
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
        <List>
          {list.map((singleItem) => (
            <ListItem key={singleItem.label} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(singleItem.value)}
                dense
                disableGutters
                sx={{ pl: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 'unset' }}>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${singleItem.value}` }}
                    checked={selectedItems.indexOf(singleItem.value) > -1}
                    size="small"
                    sx={{ py: 0.5 }}
                  />
                </ListItemIcon>
                <Typography variant="body2" noWrap>
                  {singleItem.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  ) : (
    <FormControl sx={{ width: { xs: '100%', lg: 160 } }} size="small">
      <InputLabel id={`${label}-filter-field`}>{label}</InputLabel>
      <Select
        labelId={`${label}-filter-field`}
        multiple
        color="primary"
        value={selectedItems as any}
        onChange={handleItemsChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box>
            {selected.length < 2 ? (
              <Box sx={{ display: 'flex', gap: 0.5, overflow: 'hidden' }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            ) : (
              <Typography color="primary">{selected.length} Items</Typography>
            )}
          </Box>
        )}
      >
        {list.map((singleItem) => (
          <MenuItem key={singleItem.label} value={singleItem.value} dense>
            <Checkbox
              checked={selectedItems.indexOf(singleItem.value) > -1}
              size="small"
              sx={{ py: 0.5 }}
            />
            <ListItemText primary={singleItem.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleValueFilterField;
