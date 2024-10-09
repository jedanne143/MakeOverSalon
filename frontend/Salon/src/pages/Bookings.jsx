import React from 'react'
import './Bookings.css'
function Bookings() {
  return (
    <div className="bookingsContainer">
      <iframe src="https://app.acuityscheduling.com/schedule.php?owner=33637889&ref=embedded_csp" title="Schedule Appointment" width="100%" height="100%"></iframe><script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
    </div>
  )
}

export default Bookings