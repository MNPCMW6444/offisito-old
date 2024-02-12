import { Grid } from "@mui/material";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ServerContext } from "@monorepo/shared";

export const ProfilePictureUpdater = () => {
  const server = useContext(ServerContext);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Adjust the URL to where your server is hosted
      const response = await server?.axiosInstance.put(
        "api/auth/manage/update-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert("Upload successful");
      console.log(response?.data); // You can do something with the URL here
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    }
  };

  return (
    <Grid>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </Grid>
  );
};
