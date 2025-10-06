const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('./../Models/userModel');
const Booking = require('./../Models/bookingModel');
const LiveLocation = require('./../Models/LiveLocation');
const clients = new Map();

function setupWebSocket(server) {
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("✅ Client connected via WebSocket");

    ws.on("message", async (message) => {
    try {
        const { event, data } = JSON.parse(message);


        if (event === "login") {
        const user = await User.findOne({ email: data.email });
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            return ws.send(JSON.stringify({
            event: "login",
            status: "error",
            message: "Invalid email or password"
            }));
        }

        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        clients.set(user._id.toString(), ws);

        return ws.send(JSON.stringify({
            event: "login",
            status: "success",
            user: { id: user._id, name: user.name, role: user.role },
            token
        }));
        }

        if (event === "new_booking") {
        const driverSocket = clients.get(data.driverId);
        if (driverSocket && driverSocket.readyState === WebSocket.OPEN) {
            driverSocket.send(JSON.stringify({
            event: "new_booking",
            booking: data.booking,
            message: "Have New Booking"
            }));
        }
    }

        if (event === "booking_accepted") {
        const customerSocket = clients.get(data.customerId);
        if (customerSocket && customerSocket.readyState === WebSocket.OPEN) {
            customerSocket.send(JSON.stringify({
            event: "booking_accepted",
            message: " Driver Accepted Your Booking"
        }));
        }
    }

       
        if (event === "trip_started") {
        const booking = await Booking.findById(data.bookingId);
        if (!booking) return;

        booking.status = "ongoing";
        await booking.save();

        const customerSocket = clients.get(booking.customer.toString());
          if (customerSocket && customerSocket.readyState === WebSocket.OPEN) {
            customerSocket.send(JSON.stringify({
              event: "trip_started",
              message: "  Your Trip Start Now "
            }));
          }
        }

        
        if (event === "trip_ended") {
          const booking = await Booking.findById(data.bookingId);
          if (!booking) return;

          booking.status = "completed";
          await booking.save();

          const customerSocket = clients.get(booking.customer.toString());
          if (customerSocket && customerSocket.readyState === WebSocket.OPEN) {
            customerSocket.send(JSON.stringify({
              event: "trip_ended",
              message: " Trip End , Thank You For Using Nanhalk"
            }));
          }

          const driverSocket = clients.get(booking.driver.toString());
          if (driverSocket && driverSocket.readyState === WebSocket.OPEN) {
            driverSocket.send(JSON.stringify({
            event: "trip_ended",
              message: "   Trip Updated"
            }));
          }
        }

           
        if (event === "live_location") {
          const { driverId, customerId, location } = data;

        
        const customerSocket = clients.get(customerId);
        if (customerSocket && customerSocket.readyState === WebSocket.OPEN) {
            customerSocket.send(JSON.stringify({
            event: "driver_location_update",
            driverId,
            location
            }));
        }

            
        await LiveLocation.findOneAndUpdate(
            { driver: driverId },
            { location, updatedAt: new Date() },
            { upsert: true, new: true }
        );
        }

    } catch (err) {
        console.error("WebSocket Error:", err.message);
      }
    });

    ws.on("close", () => {
      for (let [id, socket] of clients.entries()) {
        if (socket === ws) clients.delete(id);
      }
      console.log(" WebSocket connection closed");
    });
  });

  console.log("WebSocket server initialized.");
}

module.exports = { setupWebSocket };
