const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");

const events = async eventIds => {
  const events = await Event.find({
    _id: { $in: eventIds }
  });

  try {
    return events.map(event => ({
      ...event._doc,
      _id: event.id,
      date: new Date(event._doc.date).toISOString(),
      creator: user.bind(this, event.creator)
    }));
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  const user = await User.findById(userId);

  try {
    return {
      ...user._doc,
      _id: user.id,
      createEvents: events.bind(this, user._doc.createEvents)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => ({
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event._doc.creator)
      }));
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date).toISOString()
    });
    let createdEvent;

    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        _id: result.id,
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById("000");

      if (!creator) {
        throw new Error("User not found!");
      }
      user.createEvents.push(event);

      await creator.save();
      return createEvent;
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({
        email: args.userInput.email
      });
      if (existingUser) {
        throw new Error("User exists already!");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const newUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await newUser.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
