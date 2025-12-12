import React, { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Button,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { markAllSeen, markSeen, removeNote } from "../redux/notificationSlice";

export default function NotificationBell() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notes
  );

  const unread = notifications.filter((n: any) => !n.seen).length;

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton style={{color:"black"}}
      onClick={(e) => setAnchor(e.currentTarget)}>
        <Badge badgeContent={unread} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
        <MenuItem disabled>
          <Typography sx={{ flex: 1 }}>Notifications</Typography>
          <Button size="small" onClick={() => dispatch(markAllSeen())}>
            Mark all
          </Button>
        </MenuItem>

        {notifications.length === 0 && (
          <MenuItem>
            <ListItemText primary="No notifications" />
          </MenuItem>
        )}

        {notifications.map((n: any) => (
          <MenuItem
            key={n.id}
            onClick={() => dispatch(markSeen({ id: n.id }))}
            sx={{ whiteSpace: "normal" }}>
            <ListItemText
              primary={n.message}
              secondary={n.scheduledTime
                ? `Scheduled: ${new Date(n.scheduledTime).toLocaleString()}`: `Received: ${n.time}`}/>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeNote({ id: n.id }));
              }}>
              Remove
            </Button>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
