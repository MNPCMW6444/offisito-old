import { alpha, InputBase, styled } from "@mui/material";
import {
  LocationCityOutlined,
  LocationOn,
  LocationSearching,
  SearchOutlined,
} from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface SearchBarProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchOutlined />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></StyledInputBase>
      <SearchIconWrapper>
        <LocationOn />
      </SearchIconWrapper>
    </Search>
  );
};

export default SearchBar;
