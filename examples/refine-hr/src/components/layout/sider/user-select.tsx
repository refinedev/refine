import {
  Avatar,
  Box,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export const UserSelect = () => {
  return (
    <Select
      fullWidth
      type="text"
      size="small"
      sx={{
        py: "16px",
        "& > fieldset": {
          borderColor: "transparent",
        },
      }}
      defaultValue={1}
    >
      <ListSubheader>Employees</ListSubheader>
      {mockData.employees.map((employee) => (
        <MenuItem key={employee.id} value={employee.id}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar
              src={employee.avatar}
              alt={employee.name}
              sx={{ width: 32, height: 32 }}
            />
            <Typography
              noWrap
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {employee.name}
            </Typography>
          </Box>
        </MenuItem>
      ))}
      <ListSubheader>Managers</ListSubheader>
      {mockData.managers.map((manager) => (
        <MenuItem key={manager.id} value={manager.id}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar
              src={manager.avatar}
              alt={manager.name}
              sx={{ width: 32, height: 32 }}
            />
            <Typography
              noWrap
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {manager.name}
            </Typography>
          </Box>
        </MenuItem>
      ))}
      <ListSubheader>Admins</ListSubheader>
      {mockData.admins.map((admin) => (
        <MenuItem key={admin.id} value={admin.id}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar
              src={admin.avatar}
              alt={admin.name}
              sx={{ width: 32, height: 32 }}
            />
            <Typography
              noWrap
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {admin.name}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

const mockData = {
  managers: [
    {
      id: 1,
      name: "Bill Lumbergh",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    },
    {
      id: 2,
      name: "Joanna",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ],
  employees: [
    {
      id: 3,
      name: "Peter Gibbons",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 4,
      name: "Samir Nagheenanajar",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ],
  admins: [
    {
      id: 5,
      name: "Milton Waddams",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Bob Slydell & Bob Porter",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ],
};
