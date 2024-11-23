import {create} from "zustand";

const useDashboardStore = create((set) => ({
  // Popup State
  isPopupOpen: false,
  openPopup: () => set({ isPopupOpen: true }),
  closePopup: () => set({ isPopupOpen: false }),

  // Form Data
  name: "",
  description: "",
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),

  // Bar Chart Data
  barChartData: [
    { month: "Jan", revenue: 120, expenses: 90 },
    { month: "Feb", revenue: 140, expenses: 85 },
    { month: "Mar", revenue: 160, expenses: 95 },
    { month: "Apr", revenue: 180, expenses: 100 },
    { month: "May", revenue: 200, expenses: 110 },
    { month: "Jun", revenue: 220, expenses: 115 },
  ],
  setBarChartData: (data) => set({ barChartData: data }),

  // Line Chart Data
  lineChartData: [
    {
      id: "User Growth",
      data: [
        { x: "Jan", y: 100 },
        { x: "Feb", y: 120 },
        { x: "Mar", y: 150 },
        { x: "Apr", y: 180 },
        { x: "May", y: 220 },
        { x: "Jun", y: 270 },
      ],
    },
  ],
  setLineChartData: (data) => set({ lineChartData: data }),

  // Globe Data (Arcs)
  arcsData: [
    {
      startLat: 37.7749,
      startLng: -122.4194,
      endLat: 40.7128,
      endLng: -74.006,
      color: ["#ff0000", "#0000ff"],
    },
    {
      startLat: 51.5074,
      startLng: -0.1278,
      endLat: 48.8566,
      endLng: 2.3522,
      color: ["#00ff00", "#ff00ff"],
    },
    {
      startLat: 35.6895,
      startLng: 139.6917,
      endLat: -33.8688,
      endLng: 151.2093,
      color: ["#ffaa00", "#aaff00"],
    },
  ],
  setArcsData: (data) => set({ arcsData: data }),

  // Pie Chart Data
  pieChartData: [
    { id: "Product A", value: 35 },
    { id: "Product B", value: 25 },
    { id: "Product C", value: 20 },
    { id: "Product D", value: 15 },
    { id: "Product E", value: 5 },
  ],
  setPieChartData: (data) => set({ pieChartData: data }),
}));

export default useDashboardStore;
