import axios from "axios"
import Link from "next/link"
import BookingFormClient from "./booking-form-client"

export default async function BookingPage(props: { params: { id: string; roomId: string } }) {
  const { id, roomId } = props.params
  const hostelIdNum = Number(id)

  // Fetch hostel data
  let hostel = null
  try {
    const hostelRes = await axios.get(`http://127.0.0.1:8050/hostels/hostel-detail-student?hostel_id=${hostelIdNum}`)
    hostel = hostelRes.data
  } catch (err) {
    return <div>Hostel not found</div>
  }

  // Fetch room data
  let room = null
  try {
    const roomRes = await axios.get(`http://127.0.0.1:8050/rooms/get-single-room?hostel_id=${hostelIdNum}&room_number=${roomId}`)
    room = roomRes.data
  } catch (err) {
    return <div>Room not found</div>
  }

  // Final safety check
  if (!hostel || !room) {
    return <div>Unable to load booking details</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/hostels/${hostel.id ?? 0}/rooms/${room.id ?? 0}`}
          className="text-sm text-primary hover:underline"
        >
          &larr; Back to room details
        </Link>

        <h1 className="mt-2 text-3xl font-bold">Book Your Stay</h1>

        <p className="text-muted-foreground">
          {`${room?.room_type ?? "Room"} ${room?.room_number ?? ""} at ${hostel?.name ?? "Hostel"}`}
        </p>
      </div>

      <BookingFormClient hostel={hostel} room={room} />
    </div>
  )
}
