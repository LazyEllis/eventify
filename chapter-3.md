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

1. **User Management**

   - The system shall authenticate users through email and password.
   - The system shall store user profiles with name, email, and contact information.
   - The system shall assign user roles of Organizer, Attendee, or Sponsor.
   - The system shall restrict access to features based on assigned user roles.

2. **Event Management**

   - The system shall store event details including title, date, time, location, and description.
   - The system shall validate event dates against the calendar system.
   - The system shall categorize events by predefined types.
   - The system shall support media attachments up to 10MB per event.

3. **Ticketing Management**

   - The system shall generate unique ticket identifiers.
   - The system shall limit ticket sales to available capacity.
   - The system shall process ticket payments through the payment gateway.
   - The system shall deliver tickets electronically to purchasers.

4. **Event Discovery**

   - The system shall display events in chronological order.
   - The system shall filter events by category.
   - The system shall filter events by date range.
   - The system shall return search results within 3 seconds.

5. **Communication**

   - The system shall send confirmation emails for registrations.
   - The system shall send reminder emails 24 hours before events.
   - The system shall notify organizers of new registrations.
   - The system shall maintain message logs for 30 days.

6. **Analytics**

   - The system shall track ticket sales quantities.
   - The system shall calculate daily revenue totals.
   - The system shall record event attendance numbers.
   - The system shall generate attendance reports in CSV format.

7. **Attendee Engagement**

   - The system shall deliver messages between attendees in real-time.
   - The system shall display attendee profiles with professional information.
   - The system shall record connection requests between attendees.
   - The system shall maintain an attendee directory for each event.

8. **Virtual Event Support**

   - The system shall authenticate virtual event access through single-use tokens.
   - The system shall transmit event joining links to registered attendees via email.
   - The system shall record virtual event attendance status.
   - The system shall maintain virtual event schedules in UTC timezone.
   - The system shall validate virtual event capacity against registration limits.

### 3.3.2 Non-Functional Requirements

1. **Performance**

   - The system shall process user requests within 3 seconds.
   - The system shall support 100 concurrent users.
   - The system shall maintain 99% uptime.
   - The system shall complete database queries within 1 second.

2. **Security**

   - The system shall encrypt all user passwords.
   - The system shall enforce HTTPS for all connections.
   - The system shall timeout inactive sessions after 30 minutes.
   - The system shall log all authentication attempts.

3. **Usability**

   - The system shall display error messages in plain English.
   - The system shall provide keyboard navigation.
   - The system shall conform to WCAG 2.1 Level AA standards.
   - The system shall support screen readers.

4. **Reliability**

   - The system shall backup data daily.
   - The system shall restore from backup within 4 hours.
   - The system shall handle input validation errors gracefully.
   - The system shall maintain data integrity during concurrent operations.

5. **Compatibility**

   - The system shall support Chrome version 90 and above.
   - The system shall support Firefox version 88 and above.
   - The system shall support Safari version 14 and above.
   - The system shall support Edge version 90 and above.

6. **Maintainability**

   - The system shall log all errors with timestamps.
   - The system shall provide API documentation.
   - The system shall implement database migrations.
   - The system shall follow REST architectural principles.

## 3.4 Proposed Model Diagram

[Include a high-level diagram of the proposed Eventify system here, showing major components and their interactions]

## 3.5 System Architecture

Eventify follows a modern, three-tier architecture:

1. Presentation Layer: React.js-based front-end, providing a responsive and interactive user interface.

2. Application Layer: Node.js and Express.js-based back-end, handling business logic and API endpoints.

3. Data Layer: PostgreSQL database for data storage, with Prisma ORM for database operations.

```
@startuml System Architecture
skinparam componentStyle uml2

cloud "Client Layer" {
    [Web Browser]
}

node "Presentation Layer" {
    [React Frontend]
    [React Router]
}

node "Application Layer" {
    [Express.js API]
    [Authentication]
    [Event Management]
    [Ticket Management]
}

database "Data Layer" {
    [PostgreSQL]
}

[Web Browser] --> [React Frontend]
[React Frontend] --> [React Router]
[React Frontend] --> [Express.js API]
[Express.js API] --> [Authentication]
[Express.js API] --> [Event Management]
[Express.js API] --> [Ticket Management]
[Authentication] --> [PostgreSQL]
[Event Management] --> [PostgreSQL]
[Ticket Management] --> [PostgreSQL]
@enduml
```

## 3.6 Flow Charts, Use Case Diagram, Sequence Diagram and all other diagrams

### 3.6.1 Use Case Diagram

```
@startuml Use Case
left to right direction
actor Organizer
actor Attendee
actor Sponsor

rectangle Eventify {
    usecase "Create Event" as CE
    usecase "Manage Event" as ME
    usecase "Register for Event" as RE
    usecase "View Event" as VE
    usecase "Purchase Ticket" as PT
    usecase "Sponsor Event" as SE
    usecase "Network" as NT
    usecase "Manage Profile" as MP
}

Organizer --> CE
Organizer --> ME
Attendee --> RE
Attendee --> VE
Attendee --> PT
Attendee --> NT
Sponsor --> SE
Organizer --> MP
Attendee --> MP
Sponsor --> MP
@enduml
```

### 3.6.2 Event Creation Sequence Diagram

```
@startuml Event Creation
actor Organizer
participant Frontend
participant "API Server" as API
database Database

Organizer -> Frontend: Access event creation form
Frontend -> API: GET /api/event/create
API --> Frontend: Return form template
Organizer -> Frontend: Fill event details
Frontend -> API: POST /api/event
API -> Database: Create event record
Database --> API: Confirm creation
API --> Frontend: Return success status
Frontend --> Organizer: Show success message
@enduml
```

### 3.6.3 Event Registration Activity Diagram

```
@startuml Event Registration Activity
start
:User Browses Events;
:Select Event;
:View Event Details;
if (Tickets Available?) then (yes)
  :Select Ticket Type;
  :Enter Registration Details;
  :Process Payment;
  if (Payment Successful?) then (yes)
    :Generate QR Code;
    :Send Confirmation Email;
    :Registration Complete;
  else (no)
    :Show Payment Error;
    :Return to Payment;
  endif
else (no)
  :Show Waitlist Option;
  :Join Waitlist;
endif
stop
@enduml
```

### 3.6.4 System Component Diagram

```
@startuml Component Diagram
package "Frontend Components" {
    [Event List]
    [Event Details]
    [Registration Form]
    [User Dashboard]
    [Admin Panel]
}

package "Backend Services" {
    [Auth Service]
    [Event Service]
    [Ticket Service]
    [User Service]
}

package "External Services" {
    [Email Service]
    [Payment Gateway]
}

database "Database" {
    [PostgreSQL]
}

[Event List] --> [Event Service]
[Event Details] --> [Event Service]
[Registration Form] --> [Ticket Service]
[User Dashboard] --> [User Service]
[Admin Panel] --> [Auth Service]

[Event Service] --> [PostgreSQL]
[Ticket Service] --> [PostgreSQL]
[User Service] --> [PostgreSQL]
[Auth Service] --> [PostgreSQL]

[Ticket Service] --> [Payment Gateway]
[Event Service] --> [Email Service]
@enduml
```

### 3.6.5 Package Diagram

```
@startuml Package Diagram
package "Frontend" {
    package "Components" {
        [UI Components]
        [Forms]
        [Pages]
    }
    package "Services" {
        [API Client]
        [Auth Helper]
    }
    package "Utils" {
        [Validators]
        [Formatters]
    }
}

package "Backend" {
    package "API" {
        [Routes]
        [Controllers]
        [Middleware]
    }
    package "Services" {
        [Business Logic]
        [External Services]
    }
    package "Data" {
        [Models]
        [Repository]
    }
}

[Components] ..> [Services]
[API] ..> [Services]
[Services] ..> [Data]
@enduml
```

### 3.6.5 Entity-Relationship Diagram (ERD)

```
@startuml ERD
!define Table(name,desc) class name as "desc" << (T,#FFAAAA) >>
!define primary_key(x) <u>x</u>
!define foreign_key(x) <i>x</i>

Table(User, "users") {
  primary_key(id): UUID
  email: STRING
  password_hash: STRING
  name: STRING
  role: ENUM
  created_at: TIMESTAMP
}

Table(Event, "events") {
  primary_key(id): UUID
  foreign_key(organizer_id): UUID
  title: STRING
  description: TEXT
  start_date: TIMESTAMP
  end_date: TIMESTAMP
  location: STRING
  category: STRING
  status: ENUM
  created_at: TIMESTAMP
}

Table(Ticket, "tickets") {
  primary_key(id): UUID
  foreign_key(event_id): UUID
  type: STRING
  price: DECIMAL
  quantity: INTEGER
  description: STRING
}

Table(Registration, "registrations") {
  primary_key(id): UUID
  foreign_key(user_id): UUID
  foreign_key(ticket_id): UUID
  foreign_key(event_id): UUID
  status: ENUM
  qr_code: STRING
  created_at: TIMESTAMP
}

Table(Session, "sessions") {
  primary_key(id): UUID
  foreign_key(event_id): UUID
  title: STRING
  description: TEXT
  start_time: TIMESTAMP
  end_time: TIMESTAMP
  location: STRING
}

User ||--o{ Event : organizes
Event ||--o{ Ticket : has
Event ||--o{ Session : contains
User ||--o{ Registration : makes
Ticket ||--o{ Registration : includes
Event ||--o{ Registration : belongs_to

@enduml
```

## 3.7 Development Tools

The following tools and technologies will be used in the development of Eventify:

1. Frontend Development

   - **React.js**: Core UI framework
   - **Vite**: Fast, modern build tool and dev server
   - **React Router**: Client-side routing
   - **React Query**: Data fetching and caching
   - **React Hook Form**: Form handling with validation
   - **Tailwind CSS**: Utility-first CSS framework
   - **Material-UI**: Component library
   - **Chart.js**: Basic analytics visualization
   - **QRCode.js**: QR code generation

2. Backend Development

   - **Node.js/Express.js**: Server framework
   - **Prisma**: Type-safe ORM
   - **JWT**: Authentication
   - **Bcrypt**: Password hashing
   - **Multer**: Local file uploads
   - **Winston**: Basic logging
   - **Socket.io**: Basic real-time features

3. External Services

   - **Cloudinary**: Media storage
   - **Stripe**: Secure payment processing integration
   - **SendGrid**: Reliable email delivery service
   - **Zoom API**: Virtual events
   - **Netlify**: Frontend hosting
   - **Railway**: Backend hosting

4. Development Environment

   - **VS Code**: Primary IDE
   - **Git**: Version control
   - **npm**: Package management
   - **Postman**: API testing

5. Testing and Quality

   - **Jest**: Testing framework
   - **React Testing Library**: Component testing
   - **Supertest**: API testing
   - **ESLint/Prettier**: Code formatting

This set of tools and technologies will enable efficient development and deployment of the Eventify system as an MVP (Minimum Viable Product), providing a live, accessible version for demonstration and testing.
