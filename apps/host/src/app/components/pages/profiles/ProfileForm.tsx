import {
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ServerContext } from "@monorepo/server-provider";
import { Company, CreateEditCompanyReq } from "@monorepo/types";
import { axiosErrorToaster } from "@monorepo/react-components";
import { useLocation } from "react-router-dom";
import debounce from "lodash.debounce";
import { PrimaryText } from "@monorepo/react-styles";
import toast from "react-hot-toast";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ProfileForm = () => {
  const [formState, setFormState] = useState<Company>();
  const server = useContext(ServerContext);
  const [buildings, setBuildings] = useState<
    { value: string; label: string }[]
  >([]);

  const fetchBuildings = useCallback(async () => {
    try {
      const res = await server?.axiosInstance.get(
        "/api/host/building/autocomplete_building_add",
      );
      setBuildings([
        {
          label: res?.data?.data?.address?.street,
          value: res?.data?.data?._id,
        },
      ]);
    } catch (e) {
      axiosErrorToaster(e);
    }
  }, [server?.axiosInstance]);

  useEffect(() => {
    fetchBuildings().then();
  }, [fetchBuildings]);

  const fetchProfile = useCallback(
    async (id: string) => {
      try {
        const res = await server?.axiosInstance.get(
          "/api/host/company/get_company_lease/" + id,
        );
        setFormState(res?.data.data.findCompany);
      } catch (e) {
        axiosErrorToaster(e);
      }
    },
    [server?.axiosInstance],
  );

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  const hasFetched = useRef(false);

  useEffect(() => {
    const id = query.get("id");
    if (id && !hasFetched.current) {
      fetchProfile(id).then(() => {
        hasFetched.current = true;
      });
    }
  }, [query, fetchProfile]);

  const handleUpdate = useCallback(
    async (updatedState: Company) => {
      try {
        const res = await server?.axiosInstance.put(
          "/api/host/company/edit_company_lease/" + updatedState._id.toString(),
          updatedState,
        );
        toast.success(res?.data.msg);
      } catch (error) {
        axiosErrorToaster(error);
      }
    },
    [server?.axiosInstance],
  );

  const debouncedUpdate = useCallback(debounce(handleUpdate, 500), [
    handleUpdate,
  ]);

  const handleChange = (name: string, value: string | Date) => {
    formState &&
      setFormState(((prevState: Company) => {
        const updatedState: Partial<Company> = { ...prevState, [name]: value };
        debouncedUpdate(updatedState as Company);
        return updatedState;
      }) as any);
  };

  const renderTextField = (name: keyof CreateEditCompanyReq, label: string) => (
    <TextField
      multiline
      variant="outlined"
      label={label}
      value={formState ? formState[name] : ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        handleChange(name, e.target.value);
      }}
      name={name}
    />
  );

  const renderSwitch = (name: keyof CreateEditCompanyReq, label: string) => (
    <FormControlLabel
      control={
        <Switch
          checked={!!formState?.[name]}
          onChange={(e: any) => {
            handleChange(name, e.target.checked);
          }}
          name={name}
        />
      }
      label={label}
    />
  );

  const renderDatePicker = (
    name: keyof CreateEditCompanyReq,
    label: string,
  ) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={formState ? formState[name] : ""}
        onChange={(date) => {
          typeof date === "object" && handleChange(name, date as Date);
        }}
        name={name}
      />
    </LocalizationProvider>
  );

  const renderDropdown = (
    name: keyof CreateEditCompanyReq,
    label: string,
    options: { value: string; label?: string }[],
  ) => (
    <Select
      name={name}
      label={label}
      value={formState ? formState[name] : ""}
      onChange={(e) => handleChange(name, e.target.value as string)}
    >
      {options.map(({ label, value }) => (
        <MenuItem value={value}>{label || value}</MenuItem>
      ))}
    </Select>
  );

  return formState?._id ? (
    <Grid
      container
      direction="column"
      rowSpacing={4}
      width="92%"
      padding="2% 4%"
      sx={{ overflowX: "scroll" }}
      wrap="nowrap"
      alignItems="center"
    >
      <Grid item>
        <PrimaryText variant="h4">Company Profile</PrimaryText>
      </Grid>
      <Grid item>{renderTextField("companyName", "Company Name")}</Grid>
      <Grid item>{renderTextField("companyInHold", "Company in Hold")}</Grid>
      <Grid item>{renderTextField("floorNumber", "Floor Number")}</Grid>
      <Grid item>{renderSwitch("fullFloor", "Full Floor?")}</Grid>
      <Grid item>
        {renderDatePicker("contractEndDate", "Contract End Date")}
      </Grid>
      <Grid item>
        {renderSwitch(
          "subleasePermission",
          "I have a legal sublease permission",
        )}
      </Grid>
      <Grid item>{renderDropdown("building", "Building", buildings)}</Grid>
    </Grid>
  ) : (
    <PrimaryText>{hasFetched.current ? "Error" : "Loading..."}</PrimaryText>
  );
};

export default ProfileForm;
