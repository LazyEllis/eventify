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

   - The system shall provide user registration and authentication capabilities.
   - The system shall allow users to create and manage their profiles.
   - The system shall implement role-based access control for Organizers, Attendees, and Sponsors.

2. Event Management

   - The system shall enable organizers to create and edit events.
   - The system shall support multiple sessions within a single event.
   - The system shall provide event categorization and tagging functionality.

3. Ticketing and Registration

   - The system shall support multiple ticket types and pricing tiers.
   - The system shall handle the complete registration process.
   - The system shall generate unique QR codes for each ticket.

4. Event Discovery

   - The system shall provide search functionality for events.
   - The system shall recommend events based on categories and tags.

5. Attendee Engagement

   - The system shall provide an in-app messaging system.
   - The system shall enable networking through attendee profiles and connection requests.
     .

6. Organizer Tools

   - The system shall provide an event dashboard with statistics.
   - The system shall support team collaboration features.

7. Virtual Event Support

   - The system shall integrate with external video conferencing platforms.
   - The system shall provide virtual session management capabilities.

8. Feedback and Surveys
   - The system shall enable creation and distribution of post-event surveys.
   - The system shall provide basic feedback analysis tools.

### 3.3.2 Non-Functional Requirements

1. Performance

   - The system shall load pages in under 5 seconds.
   - The system shall support 100 concurrent users initially.
   - The system shall be scalable to support 500 concurrent users.

2. Security

   - The system shall encrypt all data in transit and at rest.
   - The system shall implement JWT for secure authentication.
   - The system shall follow security best practices.

3. Scalability

   - The system shall utilize a modular architecture.
   - The system shall implement database optimization for growth.

4. Usability

   - The system shall provide an intuitive, responsive user interface.
   - The system shall comply with basic accessibility standards.

5. Reliability

   - The system shall maintain 99% uptime during development and testing.
   - The system shall perform regular data backups.

6. Compatibility
   - The system shall function on major browsers (Chrome, Firefox, Safari, Edge).
   - The system shall be responsive on mobile devices.

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
