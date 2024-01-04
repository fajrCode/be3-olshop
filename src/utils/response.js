const resLogin = (data, token, res) => {
  res.status(200).json({
    code: "200",
    status: "OK",
    message: "Log in Successful",
    data,
    token,
  });
};

const res200Msg = (message, res) => {
  res.status(200).json({
    code: "200",
    status: "OK",
    message,
  });
};

const res200 = (data, res) => {
  res.status(200).json({
    code: "200",
    status: "OK",
    message: "Response Success",
    data,
  });
};

const res201 = (message, res) => {
  res.status(201).json({
    code: "201",
    status: "Created",
    message,
  });
};

const res400 = (message, res) => {
  res.status(400).json({
    code: "400",
    status: "Bad Request",
    message,
  });
};

const res401 = (message, res) => {
  res.status(401).json({
    code: "401",
    status: "Unauthorized",
    message,
  });
};

const res403 = (message, res) => {
  res.status(403).json({
    code: "403",
    status: "Forbidden",
    message,
  });
};

const res404 = (message, res) => {
  res.status(404).json({
    code: "404",
    status: "Not Found",
    message,
  });
};

const res500 = (res) => {
  res.status(500).json({
    code: "500",
    status: "Internal Server Error",
    message: "Sorry our server get error",
  });
};

export {
  resLogin,
  res200Msg,
  res200,
  res201,
  res400,
  res401,
  res403,
  res404,
  res500,
};
