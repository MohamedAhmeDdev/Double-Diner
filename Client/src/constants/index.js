export const SERVER_URL = "https://doublediner-4zwd.onrender.com";


export function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour12: true };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
  }
  
  export function formatTime(inputTime) {
    if (!inputTime) {
      return ""; // Handle invalid or empty input
    }
  
    // Parse the input date string
    const date = new Date(inputTime);
  
    // Get hours, minutes, and AM/PM from the date object
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
    // Add leading zero to minutes if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    // Create the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
  
    return formattedTime;
  }
  
  