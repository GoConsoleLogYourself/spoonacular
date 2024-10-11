import styles from "./Drawer.module.scss";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Button,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const handleClick = (text: string) => {
    if (text === "Books") {
      navigate("/books");
    }
    if (text === "Recipes") {
      navigate("/recipes");
    }
  };

  const DrawerList = (
    <List onClick={toggleDrawer(false)}>
      {["Books", "Recipes"].map(text => (
        <ListItem onClick={() => handleClick(text)} key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {text === "Books" ? <AutoStoriesIcon /> : <FastfoodIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
  return (
    <div className={styles.drawer}>
      <Button onClick={toggleDrawer(true)}>Open menu</Button>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideDrawer;
