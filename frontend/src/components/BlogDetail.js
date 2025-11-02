import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const [inputs, setInputs] = useState({});
  const id = useParams().id;

  // Function to fetch blog details
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  // Fetch blog details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDetails();
      setBlog(data.blog);

      // Set initial state of 'inputs' with default values
      if (data.blog) {
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
        });
      }
    };

    fetchData();
  }, [id]); // Fetch data whenever 'id' changes

  // Function to send update request
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            bgcolor={"#fff"}
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Edit Your Blog
            </Typography>
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
              Title
            </InputLabel>
            <TextField
              name="title"
              onChange={(e) =>
                setInputs((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              value={inputs.title}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
              Description
            </InputLabel>
            <TextField
              name="description"
              onChange={(e) =>
                setInputs((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              value={inputs.description}
              margin="auto"
              variant="outlined"
            />

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="success"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
