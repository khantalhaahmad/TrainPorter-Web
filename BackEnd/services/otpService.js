const verifyOTP = async (
  phone,
  otp
) => {
  return otp === "123456";
};

module.exports = {
  verifyOTP,
};