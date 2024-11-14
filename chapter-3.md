# Chapter 3: System Analysis and Design

## 3.1 Introduction

This chapter outlines the system analysis and design phase of the Eventify project. It details the approach taken to translate the project requirements into a concrete system design, including the functional and non-functional requirements, system architecture, and various modeling diagrams that illustrate the system's structure and behavior.

## 3.2 Research Design

The research design for Eventify follows a mixed-method approach, combining elements of both qualitative and quantitative research:

1. Literature Review: A comprehensive review of existing event management systems and relevant technologies was conducted to inform the design decisions.

2. User Surveys: Quantitative data was collected through surveys of potential users (event organizers and attendees) to gather specific requirements and preferences.

3. Expert Interviews: Qualitative data was obtained through semi-structured interviews with experienced event managers to gain insights into industry needs and challenges.

4. Prototyping: An iterative prototyping approach was used to refine the user interface and system features based on user feedback.

5. System Modeling: Various UML diagrams were created to model the system's structure and behavior, facilitating a clear understanding of the system design.

## 3.3 Functional and Non-Functional Requirements

### 3.3.1 Functional Requirements

1. User Management

   - User registration and authentication
   - User profile management
   - Role-based access control (Organizer, Attendee, Sponsor)

2. Event Management

   - Event creation and editing
   - Multi-session event support
   - Event categorization and tagging

3. Ticketing and Registration

   - Multiple ticket types and pricing tiers
   - Registration process handling
   - QR code generation for tickets

4. Event Discovery

   - Basic search functionality
   - Simple event recommendations based on categories and tags

5. Attendee Engagement

   - Basic in-app messaging system
   - Simple networking features (attendee profiles, connection requests)

6. Organizer Tools

   - Event dashboard with basic statistics
   - Team collaboration features

7. Virtual Event Support

   - Integration with external video conferencing platforms (e.g., providing Zoom links)
   - Basic virtual session management

8. Feedback and Surveys
   - Post-event survey creation and distribution
   - Basic feedback analysis tools

### 3.3.2 Non-Functional Requirements

1. Performance

   - Page load times under 5 seconds
   - Support for up to 100 concurrent users initially, with a roadmap for scaling to 500

2. Security

   - Data encryption in transit and at rest
   - Secure authentication using JWT
   - Implementation of basic security best practices

3. Scalability

   - Modular architecture for future feature additions
   - Database design optimized for gradual growth

4. Usability

   - Intuitive, responsive user interface
   - Basic accessibility compliance

5. Reliability

   - 99% system uptime during development and testing phases
   - Regular data backups

6. Compatibility
   - Cross-browser support (Chrome, Firefox, Safari, Edge)
   - Mobile responsiveness

## 3.4 Proposed Model Diagram

[Include a high-level diagram of the proposed Eventify system here, showing major components and their interactions]

## 3.5 System Architecture

Eventify follows a modern, three-tier architecture:

1. Presentation Layer: React.js-based front-end, providing a responsive and interactive user interface.

2. Application Layer: Node.js and Express.js-based back-end, handling business logic and API endpoints.

3. Data Layer: PostgreSQL database for data storage, with Prisma ORM for database operations.

Additional components:

- Socket.io for basic real-time features (optional, if time permits)

[Include a detailed system architecture diagram here]

## 3.6 Flow Charts, Use Case Diagram, Sequence Diagram and all other diagrams

### 3.6.1 Use Case Diagram

[Include a use case diagram showing the main actors (Organizer, Attendee, Sponsor) and their interactions with the system]

### 3.6.2 Event Creation Sequence Diagram

[Include a sequence diagram illustrating the process of an organizer creating a new event]

### 3.6.3 Event Registration Activity Diagram

[Include an activity diagram showing the flow of the event registration process for an attendee]

### 3.6.4 System Component Diagram

[Include a component diagram showing the major components of the Eventify system and their dependencies]

### 3.6.5 Entity-Relationship Diagram (ERD)

[Include an ERD showing the main entities in the Eventify database and their relationships. Key entities should include User, Event, Ticket, Session, and Message]

## 3.7 Development Tools

The following tools and technologies will be used in the development of Eventify:

1. Frontend Development

   - React.js: JavaScript library for building user interfaces
   - Vite: Tool for setting up a new React project
   - React Router: Declarative routing for React applications

2. Backend Development

   - Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine
   - Express.js: Web application framework for Node.js
   - Prisma: Next-generation ORM for Node.js and TypeScript

3. Database

   - PostgreSQL: Open-source relational database

4. Version Control and Collaboration

   - Git: Distributed version control system
   - GitHub: Web-based hosting service for version control using Git

5. API Testing

   - Postman: API development and testing tool

6. Development Environment

   - Visual Studio Code: Source code editor
   - npm (Node Package Manager): Package manager for JavaScript

7. Design and Prototyping

   - Figma: Collaborative interface design tool (for mockups and UI design)

8. Additional Libraries (as needed)

   - Chart.js: Simple yet flexible JavaScript charting library for basic analytics
   - Socket.io: Library for real-time web applications (if implementing real-time features)
   - QRCode.js: Library for generating QR codes for tickets

9. Deployment

   - Render: Cloud hosting platform for deploying web applications

This set of tools and technologies will enable efficient development and deployment of the Eventify system as an MVP (Minimum Viable Product), providing a live, accessible version for demonstration and testing.
