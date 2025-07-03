# React + TypeScript + Vite

🚀 **Travel Route** — A fully responsive travel planning app to help you organize your travel experiences, manage todos, and explore cities around the world.

A fully responsive travel planning app built with React, Vite, and TypeScript. Plan your trips by adding cities on an interactive map, manage to-dos, favorite your places, and track your travel history — all with user authentication powered by JSON Server.

🎯 **Key Features**

🗺️ **Interactive Map**:
Add cities as visited or planned by simply selecting locations on the map using Leaflet and React Leaflet.

![Planned Screen](./public/planned.png)

🔍 **Instant Search**:
Search cities or countries, and the map smoothly zooms to your location with an automatic city info form popping up.

![Search Screen](./public/search.png)

📍 **Country View & Geolocation**:
View countries individually and find your current position with a single click.

![Country Screen](./public/country.png)

🏙️ **Detailed City & Tourist Spots**:
Access comprehensive descriptions and highlight top attractions for every city.

![Tour Screen](./public/tour1.png)

✅ **To-Do Lists & Trip Progress**:
Create, edit, and mark tasks for tourist spots. Completed trips automatically move to your visited list.

![Todo Screen](./public/todo.png)
![Todo Screen](./public/todoPlan.png)

⭐ **Favorites & Filtering**:
Easily mark cities as favorites and filter your visited list to focus on your top destinations.

![Favorite Screen](./public/favList.png)

📱 **Responsive Design**:
Clean and modern UI powered by Tailwind CSS, ensuring smooth use on all device sizes.

![Responsive Screen](./public/responsive.png)

🧪 **Tests**
_Example of the interactive Vitest UI where you can view test results in real time._

![Vitest UI Screen](./public/vitest-ui.png)

🛠️ **Robust State Management**:

Managed with Redux Toolkit and persisted using redux-persist to save your app state.

📝 Effortless Forms:
All forms are handled seamlessly with React Hook Form, ensuring smooth validation and UX.

👤 User Authentication:
Register and log in with JSON Server acting as a mock backend API for storing user data securely.

🔔 User Notifications:
Real-time toast notifications powered by React Hot Toast keep you informed of all actions.

🛠️ **Technologies & Dependencies**

- React & React DOM Core UI library v19.0.0-rc.1
- Vite Next-gen frontend tooling Latest
- TypeScript Typed JavaScript Latest
- Redux Toolkit & React Redux State management ^2.8.2 / ^9.2.0
- Redux-persist Persist Redux state between sessions ^6.0.0
- React Router DOM Client-side routing ^7.6.0
- Axios HTTP requests ^1.9.0
- JSON Server Mock backend API ^1.0.0-beta.3
- Leaflet & React Leaflet Interactive maps ^1.9.4 / ^5.0.0
- React Datepicker Date selection component ^8.3.0
- Tailwind CSS & @tailwindcss/vite plugin Utility-first CSS framework ^4.1.7
- React Hook Form Form management ^7.56.4
- React Icons Icon library ^5.5.0
- React Hot Toast Notification system ^2.5.2

🧪 **Tests**

This project is thoroughly tested using the following tools:

- [Vitest](https://vitest.dev/) — Fast and modern unit testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — For component-level testing with a focus on user behavior
- [MSW (Mock Service Worker)](https://mswjs.io/) — To mock API requests for reliable and isolated tests

### ✅ What’s Tested?

- Redux async thunks (authentication, CRUD for cities)
- React components (e.g., Navbar, CityItem, AddTodoList,Form)
- Custom hooks (`useLocalStorageTodos`, etc.)
- Form submissions (login, register, todo forms)
- User interactions (click, input, keyboard events)

### ▶️ Running Tests

To run the test suite:

```bash
npm run test / npm t

To run in watch mode:

npm run test:watch

To launch the interactive Vitest UI:

npm run test:ui
```

## ⚡ Getting Started

```bash
### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation


git clone https://github.com/Onuryemez54/Travel-Route-App.git
cd travel-route

# Install dependencies
npm install
# or
yarn install


## Running the Project

# Start JSON Server (mock API backend)
npm run server

# Start development server (Vite)
npm run dev
```

📬 **Contact**

Created by Onur Yemez.
Feel free to reach out!
🔗 [GitHub Profile](https://github.com/Onuryemez54)
