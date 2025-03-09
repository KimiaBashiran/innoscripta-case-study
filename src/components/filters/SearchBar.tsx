import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import useDebounce from 'src/hooks/useDebounce';
import { useAppDispatch } from 'src/store/app/hooks';
import { replaceFilter } from 'src/store/features/articleSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = React.useState<string>('');
  const debouncedValue = useDebounce(searchKeyword, 350);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(replaceFilter({ key: 'q', value: debouncedValue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Beratung finden…"
        inputProps={{ 'aria-label': 'search' }}
        size="small"
        onChange={(evt) => setSearchKeyword(evt.target.value)}
        value={searchKeyword}
      />
    </Search>
  );
};

export default SearchBar;
