import { FormControlLabel, FormLabel, Switch } from "@mui/material";
import React from "react";

export const renderSwitchesHOC =
  (
    handleSwitchChange: (key: string, checked: boolean) => void,
    formatLabel: (key: string) => string,
  ) =>
  (
    items: {
      [key: string]: boolean;
    },
    section: "amenities" | "availability",
  ) => (
    <>
      <FormLabel component="legend">
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </FormLabel>
      {Object.keys(items).map((key) => (
        <FormControlLabel
          key={key}
          control={
            <Switch
              checked={items[key]}
              onChange={(e) =>
                handleSwitchChange(`${section}.${key}`, e.target.checked)
              }
            />
          }
          label={formatLabel(key)}
        />
      ))}
    </>
  );
