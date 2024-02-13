import { Grid, Button } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  axiosErrorToaster,
  Company,
  format,
  PrimaryText,
  renderDatePicker,
  renderDropdown,
  renderSwitch,
  renderTextField,
  ServerContext,
} from "@monorepo/shared";
import { useLocation } from "react-router-dom";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { Add } from "@mui/icons-material";
import buildingFormModal from "./BuildingFormModal";
import BuildingFormModal from "./BuildingFormModal";

const ProfileForm = () => {
  const [formState, setFormState] = useState<Company>();
  const server = useContext(ServerContext);
  const [buildings, setBuildings] = useState<
    { value: string; label: string }[]
  >([]);

  const [buildingForm, setBuildingForm] = useState(false);

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

  const handleChange = (name: string, value: string | Date | boolean) => {
    formState &&
      setFormState(((prevState: Company) => {
        const updatedState: Partial<Company> = { ...prevState, [name]: value };
        debouncedUpdate(updatedState as Company);
        return updatedState;
      }) as any);
  };

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
      {buildingForm && <BuildingFormModal />}
      <Grid item>
        <PrimaryText variant="h4">Company Profile</PrimaryText>
      </Grid>
      <Grid item>
        {renderTextField(formState, handleChange, "companyName")}
      </Grid>
      <Grid item>
        {renderTextField(formState, handleChange, "companyInHold")}
      </Grid>
      <Grid item>
        {renderTextField(formState, handleChange, "floorNumber")}
      </Grid>
      <Grid item>
        {renderSwitch(formState, handleChange, "fullFloor", "Full Floor?")}
      </Grid>
      <Grid item>
        {renderDatePicker(
          formState,
          handleChange,
          "contractEndDate",
          "Contract End Date",
        )}
      </Grid>
      <Grid item>
        {renderSwitch(
          formState,
          handleChange,
          "subleasePermission",
          "I have a legal sublease permission",
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        columnSpacing={2}
      >
        <Grid item>
          <PrimaryText>Building: </PrimaryText>
        </Grid>
        <Grid item>
          {renderDropdown(
            formState,
            handleChange,
            "building",
            format("building"),
            buildings,
          )}
        </Grid>
        <Grid item>
          <Button onClick={() => setBuildingForm(true)}>
            <Add /> Other
          </Button>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <PrimaryText>{hasFetched.current ? "Error" : "Loading..."}</PrimaryText>
  );
};

export default ProfileForm;
