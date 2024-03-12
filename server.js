const express = require('express');
const AdminProfile = require('./src/schema/admin.profile');
const User = require('./src/schema/profileSchema');
const Groups = require('./src/schema/message.profile');
const adminRoutes = require('./src/routes/admin.route')
const userRoutes = require('./src/routes/user.route')
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors'); // Import the cors middleware
const { validate, createAdminValidation } = require('./src/middleware/validation');
const jwt = require('jsonwebtoken');
const { validateToken } = require('./src/middleware/validateToken');

app.use(cors());

const server = http.createServer(app);

app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

require('./src/db/dbConnection');

app.post('/api/create-admin', validate(createAdminValidation), async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const findUsername = await AdminProfile.find({username,role});
        if (findUsername.length > 0) {
          return res.status(409).json({ success: false, data: "username is already in use" });
        }else{
          const adminCreate = await AdminProfile.create({
            username,
            password,
            role
          });
          return res.status(200).json({ success: true, message: 'admin account successfully created', data: adminCreate });
        }
    } catch (error) {
        // console.error('Error creating admin:', error);
        return res.status(error.status || 500).json({ success: false, message: 'admin account not created', error: error });
    }
})

app.post('/api/login', async (req, res) => {
  try {
      const { username, password, role } = req.body;
      let user;
      if (role === 'admin') {
          user = await AdminProfile.findOne({ username });
      } else {
          user = await User.findOne({ username });
      }

      if (user) {
          if (user.password === password) {
              const token = jwt.sign({ username: user.username, role: user.role }, 'ABCDEF', { expiresIn: '1h' });
              return res.json({ success: true, token, data:{username,role} });
          } else {
              return res.status(401).json({ success: false, message: 'You have entered an invalid password' });
          }
      } else {
          return res.status(404).json({ success: false, message: 'Please check username and Password' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ success: false, message: 'Internal server error', error: error });
  }
});


app.get('/api/fetch-all-users', async (req, res) => {
    try {
        const getAllUsers = await User.find({}, { _id: 0 });
        return res.json({ success: true, message: 'all users fetched.', data: getAllUsers });
    } catch (error) {
        // console.error('Error creating admin:', error);
        return res.status(error.status || 500).json({ success: false, message: 'not found any user', error: error });
    }
})

app.post('/api/validate-token', validateToken, (req, res) => {
  res.status(200).json({ success: true, message: 'Token is valid', user: req.user });
});

io.on('connection', async (socket) => {
    try {
      // Fetch group names from the database
      const groups = await Groups.find({}, { _id: 0, groupName: 1 });
  
      socket.on('joinRoom', (room) => {
        if (groups.some((group) => group.groupName === room)) {
          socket.join(room);
          // console.log(`User ${socket.id} joined room: ${room}`);
        } else {
          // console.log(`Invalid room requested by ${socket.id}`);
        }
      });
  
      // Handle chat messages
      socket.on('sendMessage', async (data) => {
        try {
          const { groupName, message, username } = data;
            // console.log('data',data)
          const message_date = Date.now();
          // Update the group messages
          await Groups.updateOne(
            { groupName },
            {
              $push: {
                messages: {
                  sender: username,
                  message,
                  message_date: message_date,
                },
              },
            }
          );
  
          // Broadcast the message to all members of the room
          io.to(groupName).emit('message', {
            sender: username,
            message,
            message_date,
            room: groupName,
          });
        } catch (error) {
          console.error('Error:', error);
        }
      });
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  });

  
  server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
  });
  
  module.exports = server