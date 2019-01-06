const Booking = require("../../models/booking");
const Event = require("../../models/event");

const { transformBooking, transformEvent } = require("./merge");

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(transformBooking);
    } catch (error) {
      throw err;
    }
  },
  bookEvent: async args => {
    try {
      const fetchedEvent = await Event.findOne({
        _id: args.eventId
      });
      const booking = new Booking({
        user: "000",
        event: fetchedEvent
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);

      await Booking.deleteOne(args.bookingId);
      return event;
    } catch (err) {
      throw err;
    }
  }
};
