import CalendarComponent from "./components/CalendarPopup"; // 引入CalendarPopup组件


const App = () => {
  const startDates = ["20240123", "20240125"]; // 特殊日期数组

  return (
    <div className="App">
      <CalendarComponent startDates={startDates} />
    </div>
  );
};

export default App;
