# Eventify

A modern event management platform that simplifies creating, managing, and tracking events all in one place.

## 🚀 Features

- **Event Management**: Create, edit, and delete events with comprehensive details
- **Ticket Management**: Create different ticket types with customizable prices and quantities
- **Real-time Messaging**: Chat with event attendees through integrated messaging
- **Analytics Dashboard**: Track ticket sales, revenue, and attendance rates
- **QR Code Ticketing**: Generate unique QR codes for easy check-in
- **Attendee Management**: Assign tickets to attendees and track participation
- **Multiple Event Types**: Support for physical, virtual, and hybrid events
- **User Profiles**: Customizable user profiles for event organizers and attendees

## 💻 Tech Stack

- **Frontend**: React 19, React Router 7
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Real-time Communication**: Socket.io
- **QR Code Generation**: QRCode.react
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier

## 📋 Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/eventify.git
   cd eventify
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a .env file in the root directory with your environment variables (see `.env.example` if it exists)

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📊 Project Structure

```
eventify/
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── routes/           # Application pages/routes
│   ├── services/         # API clients and services
│   └── utils/            # Utility functions
├── public/               # Static assets
└── ...config files
```

## 🧪 Testing

Run tests with:

```bash
npm run test
# or
yarn test
```

## 🧹 Linting and Formatting

```bash
# Lint code
npm run lint
# or
yarn lint

# Format code
npm run format
# or
yarn format
```

## 📱 Screenshots

_(Screenshots would go here)_

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **LazyEllis** - _Initial work_

## 🙏 Acknowledgments

- All contributors who have helped this project
- The amazing open-source community behind the technologies used
