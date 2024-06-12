/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import { Avatar, Box, Modal } from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

UpdateForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default function UpdateForm({ open, handleClose, id }) {
  const toastConfig = {
    position: "top-right",
    autoClose: 3000, // Close the message after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [userID, setUserID] = useState("");
  const [Address, setAddress] = useState("");
  const [picture, setPicture] = useState("");

  const [userIDError, setUserIDError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [AddressError, setAddressError] = useState("");
  const [pictureError, setPictureError] = useState("");

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:7100/task/profiles/user?id=${id}`
        );
        const userData = response.data[0].data[0];
        setName(userData.name);
        setPhone(userData.phone);
        setUserID(userData.userID);
        setAddress(userData.Address);
        console.log("userData------------>", userData);
        if (userData.profile) {
          setPicture(userData.profile);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!hasFetched.current) {
      fetchData(id);
      hasFetched.current = true;
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    setUserIDError("");
    setNameError("");
    setPhoneError("");
    setAddressError("");
    setPictureError("");

    if (!userID.trim()) {
      setUserIDError("User ID is required");
      valid = false;
    }
    if (!name.trim()) {
      setNameError("Name is required");
      valid = false;
    }
    if (!phone.trim()) {
      setPhoneError("Phone is required");
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone must be a 10-digit number");
      valid = false;
    }
    if (!Address.trim()) {
      setAddressError("Address is required");
      valid = false;
    }
    if (!picture) {
      setPictureError("Please select an image");
      valid = false;
    }

    if (valid) {
      const formData = new FormData();
      formData.append("userID", userID);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("Address", Address);
      formData.append("profile", picture);

      console.log(picture);

      if (typeof picture === "string") {
        console.log("string------------>");
        // If picture is a base64 string, convert it to Blob
        const byteString = atob(picture.split(",")[1]);
        const mimeString = picture.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        formData.append("profile", blob);
      } else {
        formData.append("profile", picture);
      }

      console.log("form", formData);

      try {
        const response = await axios.post(
          `http://localhost:7100/task/update?id=${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUserID("");
        setName("");
        setPhone("");
        setAddress("");
        setPicture(null);
        console.log(response);
        if (response.data[0].status_code === 201) {
          toast.success("User Updated successfully!", toastConfig);
          setTimeout(() => {
            // eslint-disable-next-line no-restricted-globals
            location.reload()
          }, 700);
        } else if (response.data[0].status_code === 202) {
          toast.error("UserID Already exist!", toastConfig);
        }

        handleClose();
      } catch (error) {
        console.error("Error updating user data:", error);
        toast.error("Please fix the errors in the form", toastConfig);
      }
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // in MB
      const allowedTypes = ["image/png", "image/jpeg"];

      if (!allowedTypes.includes(file.type)) {
        setPictureError(
          "Invalid image type. Please select a PNG or JPEG file."
        );
        return;
      }
      if (fileSize > 2) {
        setPictureError(
          "File size exceeds 2MB limit. Please select a smaller file."
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      setPicture(file);
      reader.readAsDataURL(file);
      setPictureError("");
    } else {
      setPicture(null);
    }
  };

  const removePicture = () => {
    setPicture(null);
    setPictureError("");
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    border: "none",
    outline: "none",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="picture-container">
                <input
                  type="file"
                  id="picture"
                  onChange={handlePictureChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <label htmlFor="picture" className="picture-label">
                  {picture ? (
                    <img
                      src={picture}
                      alt="Preview"
                      className="picture-preview"
                    />
                  ) : (
                    <span className="picture-icon">
                      <Avatar alt="" src="" sx={{ width: 100, height: 100 }} />
                    </span>
                  )}
                </label>
                <div className="picture-buttons">
                  {!picture && (
                    <label
                      htmlFor="picture"
                      className="add-button"
                      style={{ cursor: "pointer", fontWeight: "550" }}
                    >
                      Add Image
                    </label>
                  )}
                  {picture && (
                    <label
                      type="button"
                      className="remove-button"
                      onClick={removePicture}
                      style={{ cursor: "pointer", fontWeight: "550" }}
                    >
                      Remove Image
                    </label>
                  )}
                </div>
                {pictureError && <span className="error">{pictureError}</span>}
              </div>
              <div>
                <label htmlFor="userID" className="textmessage">
                  User ID*
                </label>
                <input
                  type="text"
                  id="userID"
                  value={userID}
                  disabled="true"
                  onChange={(e) => setUserID(e.target.value)}
                />
                {userIDError && <span className="error">{userIDError}</span>}
              </div>
              <div>
                <label htmlFor="name" className="textmessage">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && <span className="error">{nameError}</span>}
              </div>
              <div>
                <label htmlFor="phone" className="textmessage">
                  Phone*
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {phoneError && <span className="error">{phoneError}</span>}
              </div>
              <div>
                <label htmlFor="address" className="textmessage">
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {AddressError && <span className="error">{AddressError}</span>}
              </div>
              <div className="Submit-button">
                <button type="submit" className="textmessage">
                  Update
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
