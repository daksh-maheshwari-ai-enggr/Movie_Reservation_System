/**
 * @module MockSeatData
 * @description Provides a static data payload to simulate the backend database response.
 * Used strictly for frontend UI development and testing seat selection logic before API integration.
 */
export const mockTheaterLayout = {
  /* ==========================================
     1. Screen Metadata
     ========================================== */
  screenId: "screen_grand_hall_01",
  theaterName: "Grand Hall",
  ticketPrice: 16.00,
  rowsCount: 8,
  seatsPerRow: 12,
  
  /* ==========================================
     2. Seat Grid Generation
     ========================================== */
  rows: [
    {
      rowLabel: "A",
      seats: Array.from({ length: 12 }, (_, i) => ({
        id: `A${i + 1}`,
        seatNumber: i + 1,
        // Simulates pre-booked status for A3 and A4 to test disabled UI states
        status: i === 2 || i === 3 ? "booked" : "available",
        category: "Silver"
      })),
    },
    {
      rowLabel: "B",
      seats: Array.from({ length: 12 }, (_, i) => ({
        id: `B${i + 1}`,
        seatNumber: i + 1,
        status: "available",
        category: "Gold"
      })),
    },
    {
      rowLabel: "C",
      seats: Array.from({ length: 12 }, (_, i) => ({
        id: `C${i + 1}`,
        seatNumber: i + 1,
        // Simulates a block of unavailable seats at the edge of the row (C9-C12)
        status: i > 7 ? "booked" : "available",
        category: "Gold"
      })),
    },
    {
      rowLabel: "D",
      seats: Array.from({ length: 12 }, (_, i) => ({
        id: `D${i + 1}`,
        seatNumber: i + 1,
        status: "available",
        category: "Platinum"
      })),
    },
    {
      rowLabel: "E",
      seats: Array.from({ length: 12 }, (_, i) => ({
        id: `E${i + 1}`,
        seatNumber: i + 1,
        // Simulates a pair of booked premium seats in the center
        status: i === 4 || i === 5 ? "booked" : "available",
        category: "Recliner"
      })),
    },
  ],
};