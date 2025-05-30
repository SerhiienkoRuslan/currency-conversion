// basic react component for dashboard layout
import { type ReactNode } from "react";
import { Stack } from "@mui/material";

export const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <Stack
    direction={"column"}
    alignItems={"center"}
    spacing={{ xs: 12, md: 12, sm: 12 }}
    sx={{
      padding: "20px 0",
    }}
  >
    <Stack
      direction={"row"}
      textAlign={"center"}
      justifyContent={"center"}
      alignItems={{ xs: "center" }}
      spacing={6}
    >
      {children}
    </Stack>
  </Stack>
);
