import {
  Asset,
  axiosErrorToaster,
  Company,
  PrimaryText,
  renderSwitchGroup,
  renderTextField,
  ServerContext,
} from "@monorepo/shared";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import { Grid } from "@mui/material";

const SpaceForm = () => {
  const [formState, setFormState] = useState<Asset>();
  const server = useContext(ServerContext);

  const fetchSpace = useCallback(
    async (id: string) => {
      try {
        const res = await server?.axiosInstance.get(
          "/api/host/asset/asset_detail/" + id,
        );
        setFormState(res?.data.data);
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
      fetchSpace(id).then(() => {
        hasFetched.current = true;
      });
    }
  }, [query, fetchSpace]);

  const handleUpdate = useCallback(
    async (updatedState: Company) => {
      try {
        const res = await server?.axiosInstance.put(
          "/api/host/asset/edit_asset/" + updatedState._id.toString(),
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
      <Grid item>
        <PrimaryText variant="h4">List your Space</PrimaryText>
      </Grid>
      <Grid item>
        {renderTextField(
          formState,
          handleChange,
          "assetDescription",
          "Description",
        )}
      </Grid>
      <Grid item>
        {renderTextField(formState, handleChange, "roomNumber", "Room Number")}
      </Grid>
      {renderSwitchGroup(
        formState,
        "Availability",
        "assetAvailability",
        setFormState,
        debouncedUpdate,
      )}
    </Grid>
  ) : (
    <PrimaryText>{hasFetched.current ? "Error" : "Loading..."}</PrimaryText>
  );
};

export default SpaceForm;
