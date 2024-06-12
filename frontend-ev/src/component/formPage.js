import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Avatar, Box, Modal } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

FormPage.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default function FormPage({ open, handleClose }) {
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
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const [userIDError, setUserIDError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [AddressError, setAddressError] = useState("");
  const [pictureError, setPictureError] = useState("");

  useEffect(() => {
    if (!open) {
      // Clear all the fields and errors when the modal is closed
      setName("");
      setPhone("");
      setUserID("");
      setAddress("");
      setPicture(null);
      setPreview(null);
      setUserIDError("");
      setNameError("");
      setPhoneError("");
      setAddressError("");
      setPictureError("");
    }
  }, [open]);

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

      const blobURL = URL.createObjectURL(file);
      setPicture(file);
      setPreview(blobURL);
      setPictureError("");
    } else {
      setPicture(null);
      setPreview(null);
    }
  };

  const removePicture = () => {
    setPicture(null);
    setPreview(null);
    setPictureError("");
  };

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

      try {
        const response = await axios.post(
          "http://localhost:7100/task/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data[0].status_code === 202) {
          toast.error("UserID Already extists!", toastConfig);
        } else if (response.data[0].status_code === 201) {
          toast.success("User Added successfully!", toastConfig);
        }

        handleFormClose();
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    }
  };

  const handleFormClose = () => {
    handleClose();
  };

  const style = {
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
        onClose={handleFormClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                  {preview ? (
                    <img
                      src={preview}
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
                  {!preview && (
                    <label
                      htmlFor="picture"
                      style={{ cursor: "pointer" }}
                      className="picmessage"
                    >
                      Add Image
                    </label>
                  )}
                  {preview && (
                    <label
                      htmlFor="picture"
                      onClick={removePicture}
                      style={{ cursor: "pointer" }}
                      className="picmessage"
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
