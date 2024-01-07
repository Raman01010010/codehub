import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container2 from "./Container2";
import Modal from "@mui/material/Modal";
import { Backdrop, Fade } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { User } from "../context/User";
import MenuIcon from "@mui/icons-material/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserFriends,
  faEnvelope,
  faMoneyCheckAlt,
  faUser,
  faBell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMediaQuery, Menu, MenuItem } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import axios from "../api/axios";

const Navbar2 = () => {
  const { sh, setSh, newUser } = useContext(User);
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isJobMenuOpen, setIsJobMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState([]); // New state for search input
  const [name, setName] = useState(null);
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
// Assuming you are using the document.cookie API to manage cookies

// Function to clear all cookies
function clearAllCookies() {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}
console.log(newUser.userid);
// Example usage in a logout function

async function handleLogout() {
  // Perform any additional logout logic if needed

  // Clear all cookies
  //clearAllCookies();
  console.log(newUser.userid)
  try {
    
    const response = await axios.post("/api/logout", {
      userid: newUser.userid,
    });

    if (response.status === 200) {
      // Successful logout on the server
      // Redirect to the login page or perform any other client-side cleanup
      window.location.href = "/home2";
    } else {
      // Server responded with an error status
      console.error("Failed to logout on the server:", response.statusText);
      // Optionally, handle the error, show a message, or take appropriate action
    }
  } catch (error) {
    // Error occurred during the axios request
    console.error("Failed to logout on the server:", error);
    // Optionally, handle the error, show a message, or take appropriate action
  }
}


// In your component, you might have a logout button or link that triggers the handleLogout function
// <button onClick={handleLogout}>Logout</button>

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  function handleNavAndClose() {
    handleMenuClose();
  }

  const handleJobMenuToggle = () => {
    setIsJobMenuOpen(!isJobMenuOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cleanup function to set isJobMenuOpen to false when component unmounts
    return () => {
      setIsJobMenuOpen(false);
    };
  }, []);

  useEffect(() => {
    // Set isJobMenuOpen to true when the location changes to "/showjob"
    setIsJobMenuOpen(location.pathname === "/showjob");
  }, [location.pathname]);
  function fun() {
    setSh((old) => {
      return !old;
    });
  }

  useEffect(() => {
    // Fetch data from the backend using axios or your preferred method
    const fetchData = async () => {
      try {
        console.log(searchInput);
        const response = await axios.post("/connect/searchname", {
          searchInput,
        });

        // Access the data property of the response
        const responseData = response.data;

        // Access the matchedUsernames property from the data
        const matchedUsernames = responseData.matchedUsernames;

        // Assuming setName is a state update function
        setName(matchedUsernames);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    // Call the fetchData function

    // Call the fetchData function
    fetchData();
  }, [searchInput]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event, value) => {
    setSearchInput(value);
  };
  console.log(name);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isLargeScreen ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             SAMPLE NAME
              </Typography>

              <Button color="inherit" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>

              <Button color="inherit" component={Link} to="/post">
                <FontAwesomeIcon icon={faHome} style={{ marginRight: "5px" }} />
                Home
              </Button>
              <Button color="inherit" onClick={fun} component={Link}>
                <FontAwesomeIcon icon={faBell} style={{ marginRight: "5px" }} />
                Notification
              </Button>

              <Button color="inherit" onClick={handleMenuOpen}>
                <FontAwesomeIcon
                  icon={faUserFriends}
                  style={{ marginRight: "5px" }}
                />
                MENUE 1
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleNavAndClose}
                  component={Link}
                  to="/connections"
                >
                 S1
                </MenuItem>
                <MenuItem
                  onClick={handleNavAndClose}
                  component={Link}
                  to="/otherusers"
                >
                 S2
                </MenuItem>
                <MenuItem
                  onClick={handleNavAndClose}
                  component={Link}
                  to="/pending"
                >
                  S3
                </MenuItem>
              </Menu>
            
            
              <Button
                color="inherit"
                component={Link}
                to={`/profilepage/${newUser.email}`}
              >
                <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />
                My Profile
              </Button>
              <IconButton
                onClick={handleLogout}
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
              >
        <FontAwesomeIcon icon={faRightFromBracket} />{" "}
              </IconButton>
            </>
          ) : (
            <>
              {/* ... (unchanged code) */}
              <IconButton
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
                to="/post"
              >
                <FontAwesomeIcon icon={faHome} />
              </IconButton>
              <Button color="inherit" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              <IconButton
                onClick={fun}
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
              >
                <FontAwesomeIcon icon={faHome} />
              </IconButton>

              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                style={{ marginRight: "20px" }}
              >
                <FontAwesomeIcon icon={faUserFriends} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/connections"
                >
                  SW1
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/otherusers"
                >
                  S2
                </MenuItem>
                <MenuItem
                  onClick={handleNavAndClose}
                  component={Link}
                  to="/pending"
                >
                  S3
                </MenuItem>
              </Menu>
              <IconButton
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
                to={`/chat/${newUser.userid}`}
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </IconButton>
            
              <IconButton
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
                to={`/profilepage/${newUser.email}`}
              >
                <FontAwesomeIcon icon={faUser} />
              </IconButton>
            </>
          )}

          <Dialog
            open={isModalOpen}
            onClose={handleCloseModal}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Search People</DialogTitle>
            <Stack spacing={2}>
              {name && name.length > 0 && (
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={name.map((option) => ({
                    label: option.username,
                    link: `/profilepage/${option.email}`,
                  }))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Link to={option.link} {...props}>
                      {option.label}
                    </Link>
                  )}
                />
              )}
            </Stack>
          </Dialog>
        </Toolbar>
      </AppBar>
<div style={{marginTop:'10vh'}}> <Container2 /></div>
     
    </>
  );
};

export default Navbar2;
