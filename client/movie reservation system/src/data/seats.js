const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

const reservedSeats = [
  "A3", "A4", "B5", "B6", "C8",
  "D10", "E2", "F12", "G7", "H5", "I9"
];

const blockedSeats = [
  "A10", "C4", "D6", "E11", "F3", "H13"
];

const seatData = [];

rows.forEach((row) => {
  for (let number = 1; number <= 14; number++) {
    const seatId = `${row}${number}`;

    let status = "available";

    if (reservedSeats.includes(seatId)) {
      status = "reserved";
    } else if (blockedSeats.includes(seatId)) {
      status = "blocked";
    }

    let category = "Regular";

    if (["A", "B"].includes(row)) {
      category = "Recliner";
    } else if (["C", "D", "E"].includes(row)) {
      category = "Premium";
    } else {
      category = "Regular";
    }

    seatData.push({
      id: seatId,
      row,
      number,
      category,
      status,
      price: 14,
    });
  }
});

export default seatData;