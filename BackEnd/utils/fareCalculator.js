const calculateFare = (luggageCount = 1) => {
  const currentHour = new Date().getHours();

  const baseFare = 50;

  const luggageCharge =
    luggageCount * 20;

  let peakCharge = 0;
  let nightCharge = 0;

  // Peak Hours
  if (
    (currentHour >= 7 &&
      currentHour <= 10) ||
    (currentHour >= 17 &&
      currentHour <= 21)
  ) {
    peakCharge = 30;
  }

  // Night Hours
  if (
    currentHour >= 22 ||
    currentHour <= 5
  ) {
    nightCharge = 40;
  }

  // Fixed Platform Fee
  const platformFee = 10;

  const subtotal =
    baseFare +
    luggageCharge +
    peakCharge +
    nightCharge +
    platformFee;

  const gst = Math.round(
    subtotal * 0.05
  );

  const total =
    subtotal + gst;

  return {
    amount: total,

    breakdown: {
      baseFare,
      luggageCharge,
      peakCharge,
      nightCharge,
      platformFee,
      gst,
      total,
    },
  };
};

module.exports =
  calculateFare;