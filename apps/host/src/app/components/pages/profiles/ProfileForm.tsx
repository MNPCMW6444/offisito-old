import { Button, Grid, TextField } from "@mui/material";
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

const ProfileForm = () => {
  const [formState, setFormState] = useState<Company>();
  const server = useContext(ServerContext);

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

  const handleUpdate = async (updatedState: CreateEditCompanyReq) => {
    formState &&
      formState._id &&
      (await server?.axiosInstance.put<any, any, CreateEditCompanyReq>(
        "/api/host/company/edit_company_lease/" + formState._id,
        JSON.parse(JSON.stringify(updatedState)),
      ));
  };

  const debouncedUpdate = debounce(handleUpdate, 500);

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleChange = (name: string, value: string | boolean) => {
    formState &&
      setFormState(
        (prevState) => ({ ...(prevState || {}), [name]: value }) as any,
      );
  };

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.name, e.target.value);
  };

  const renderTextField = (name: keyof CreateEditCompanyReq, label: string) => (
    <TextField
      multiline
      variant="standard"
      label={label}
      value={formState ? formState[name] : ""}
      onChange={handleTextFieldChange}
      name={name}
    />
  );

  const publish = async () => {
    await server?.axiosInstance.post("/api/assets/publish", {});
  };

  return formState?._id ? (
    <Grid
      container
      direction="column"
      rowSpacing={4}
      width="92%"
      height="80%"
      padding="10% 4%"
      sx={{ overflowX: "scroll" }}
    >
      <Grid item>
        <PrimaryText>List a Space</PrimaryText>
      </Grid>
      <Grid item container alignItems="center" columnSpacing={4}>
        <Grid item>{renderTextField("companyInHold", "Company in Hold")}</Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <Button variant="contained" onClick={publish}>
          Publish
        </Button>
      </Grid>
      ;
    </Grid>
  ) : (
    <PrimaryText>Error</PrimaryText>
  );
};

export default ProfileForm;
