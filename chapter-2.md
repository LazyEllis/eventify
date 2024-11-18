# Chapter 2: Literature Review

## 2.1 Introduction

The rapid evolution of digital technologies has significantly transformed the landscape of event management. This chapter presents a comprehensive review of existing literature and systems in the field of event management, with a particular focus on digital solutions. The purpose of this review is to establish the theoretical and practical foundations upon which the Eventify project is built, identify gaps in current systems, and highlight opportunities for innovation. By examining previous research and implementations, this review will provide a historical context for the development of these systems, an overview of current solutions, and a critical analysis of their strengths and weaknesses.

## 2.2 Historical Background of the Research

The concept of event management has existed for centuries, with formal studies in the field emerging in the late 20th century. Getz (2008) provides a comprehensive overview of the evolution of event studies, tracing its development from a focus on economic impacts to a more holistic approach encompassing social, cultural, and environmental dimensions.

The digital transformation of event management can be traced through several key phases:

1. **Pre-digital Era (Pre-1990s)**: Event management relied heavily on manual processes, paper-based systems, and personal networks. Goldblatt (2013) notes that in the 1980s and early 1990s, organizers used paper-based systems for planning, registration, and ticketing.

2. **Early Digitization (1990s-2000s)**: The introduction of personal computers and basic software led to the development of simple digital tools for event planning and attendee management. Silvers (2012) describes the emergence of standalone applications focusing on specific aspects of event planning, such as attendee registration or schedule management.

3. **Web-based Solutions (2000s-2010s)**: The growth of the internet spawned the first generation of web-based event management platforms, offering online registration and basic attendee engagement features.

4. **Mobile Revolution (2010s)**: The proliferation of smartphones drove the development of mobile-friendly event apps and on-the-go management tools. Solaris (2018) highlights how these technologies enabled real-time communication, enhanced attendee engagement, and provided new channels for event promotion and networking.

5. **AI and Big Data Era (2015-Present)**: The integration of artificial intelligence, big data analytics, and cloud computing has led to more sophisticated, data-driven event management solutions.

6. **Virtual and Hybrid Events (2020-Present)**: The global COVID-19 pandemic accelerated the adoption of virtual and hybrid event technologies, reshaping the industry's approach to event hosting and attendee engagement (Rubinger et al., 2020; EventMB, 2021).

## 2.3 Event Management Systems

### 2.3.1 Introduction

An Event Management System (EMS) is a comprehensive software platform designed to streamline the planning, coordination, execution, and analysis of events. It caters to various event types, including corporate meetings, conferences, workshops, exhibitions, concerts, weddings, and virtual events. The system provides centralized tools to enhance collaboration, optimize resource utilization, and improve attendee experiences.

### 2.3.2 Key Components of an Event Management Systems

1. **User Roles**

- **Administrator**:

  - Configures the system, assigns roles, and ensures security compliance.
  - Monitors system usage and resolves escalations.

- **Event Manager**:

  - Plans and manages event logistics.
  - Oversees vendor coordination and budget allocation.

- **Attendee/Participant**:

  - Registers for events, attends sessions, and provides feedback.

- **Vendor/Partner**:

  - Offers services or goods (e.g., catering, AV equipment).
  - Submits invoices and ensures timely delivery.

2. **Core Modules**

   - **Event Creation and Management**:

     - Set event themes, objectives, and goals.
     - Design interactive agendas with session details.
     - Link supporting documents like presentations and handouts.

   - **Registration and Ticketing**:

     - Customizable registration forms for attendee details.
     - Integration with payment gateways (Stripe, PayPal).
     - Early bird discounts, group rates, and VIP packages.

   - **Communication and Notifications**:

     - Automated email campaigns with personalized content.
     - Live updates via push notifications or SMS.
     - Integration with chat platforms for quick Q&A.

   - **Resource Management**:

     - Comprehensive vendor database with ratings and reviews.
     - Real-time inventory tracking for event supplies.
     - Calendar sync for venue and equipment booking.

   - **Reporting and Analytics**:

     - Demographic breakdown of attendees.
     - Heatmaps for session popularity.
     - Real-time tracking of ticket sales and engagement metrics.

   - **Security and Compliance**:
     - Two-factor authentication for sensitive roles.
     - Secure encryption for payment dat-
     - Compliance with regional data protection laws (GDPR, CCPA).

### 2.3.3 Features in Current Event Management Systems

Examples of popular event management systems include:

1. **Eventbrite**:

   - Simplified ticketing system.
   - Easy integration with social media platforms.
   - Provides analytics for event performance.

2. **Cvent**:

   - Holistic approach covering planning, marketing, and feedback.
   - Extensive venue search tools and 3D event visualization.
   - Advanced mobile apps for event navigation.

3. **Whova**:

   - Focus on attendee networking with matchmaking features.
   - Interactive features like live polls and gamification.
   - Seamless check-in process using QR codes.

4. **Zoho Backstage**:

   - Speaker management with rehearsal tools.
   - Collaboration within teams using Zoho suite apps.
   - Advanced multilingual options for global events.

### 2.3.4 Commonly Used Features

1. **Customizable Event Pages**:

   - Drag-and-drop builder for landing pages.
   - Add event branding, sponsor logos, and multimedia.

2. **Attendee Management**:

   - AI-powered matchmaking for networking.
   - Real-time attendee tracking via RFID or NFC badges.

3. **Event Marketing Tools**:

   - Social media widgets for easy sharing.
   - Analytics on email open rates and ticket conversions.

4. **Live Streaming and Virtual Events**:

   - Breakout rooms for smaller discussions.
   - Live transcription and multilingual subtitles.
   - Sponsor banners during virtual sessions.

5. **Post-Event Feedback Collection**:

   - Surveys with skip-logic for tailored questions.
   - Speaker and session-specific ratings.
   - Suggestions for future event topics.

### 2.3.5 System Architecture

A robust EMS follows a 3-tier architecture:

1. **Presentation Layer**:

   - Provides user interfaces via web browsers and mobile apps.
   - Tools: ReactJS, Angular, or Swift (iOS) for seamless navigation.

2. **Application Layer**:

   - Executes business logic for ticketing, attendee management, and analytics.
   - Tools: Django, Node.js, Laravel for scalable operations.

3. **Database Layer**:

   - Stores event data, attendee records, and financial transactions.
   - Tools: MySQL, PostgreSQL, or MongoDB for high reliability.

### 2.3.6 Use Case Example

**Scenario**: Corporate Training Event

1. **Event Overview**: A 2-day technical workshop for software developers with 300 participants.

2. **Solution Using EMS**:
   - **Event Creation**: Configure workshop sessions, speaker bios, and training materials.
   - **Ticketing**: Offer corporate discounts and group registration options.
   - **Communication**: Notify attendees about prerequisites via emails.
   - **Resource Management**: Assign catering vendors and AV teams.
   - **Execution**:
     - QR-code-based check-ins.
     - Distribute session materials via mobile app.
   - **Post-Event**: Send feedback forms and certification of completion.

### 2.3.7 Workflow of Event Management Systems

1. **Pre-Event**:

   - User logs in and selects role.
   - Admin/Event Manager creates the event.
   - Customizes registration settings and promotes the event.

2. **During Event**:

   - Attendees check in via the EMS app.
   - Real-time updates on sessions, locations, or changes.
   - Engagement via polls, chats, and gamification.

3. **Post-Event**:

   - Collect feedback via automated surveys.
   - Generate financial and engagement reports.
   - Analyse data to improve future events.

### 2.3.8 Advantages of Using EMS

1. **Enhanced Collaboration**: Facilitates communication between event organizers, vendors, and attendees.
2. **Cost Efficiency**: Reduces manual overheads and resource wastage.
3. **Real-Time Updates**: Ensures that all stakeholders remain informed about changes.
4. **Scalability**: Easily accommodates large-scale and multi-location events.

## 2.4 Overview of the Existing System

Current event management systems typically offer a range of features designed to streamline the event planning and execution process. Tum et al. (2006) provide a comprehensive overview of event management processes, which have since been adapted for digital platforms. These systems can be broadly categorized into three types:

1. **Comprehensive Event Management Platforms**: These are all-in-one solutions that cover various aspects of event management, including planning, registration, ticketing, and attendee engagement. Examples include Eventbrite, Cvent, and Bizzabo.

2. **Specialized Tools**: These focus on specific aspects of event management, such as project management (e.g., Asana, Trello) or virtual event hosting (e.g., Hopin, Zoom Events).

3. **Custom Solutions**: Some organizations develop bespoke event management systems tailored to their specific needs, often built on top of existing content management systems or customer relationship management platforms.

### 2.4.1 COMPREHENSIVE EVENT MANAGEMENT SYSTEMS

1. **Eventbrite**

   **Overview**: Eventbrite is a widely used ticketing and event management platform that primarily caters to small and medium-sized events. It offers self-service tools for event creation, ticketing, and promotion.

   **Strengths**:

   1. User-friendly interface with intuitive event creation workflow
   2. Strong social media integration and marketing tools
   3. Mobile-optimized event pages and ticketing
   4. Free tier available for free events
   5. Built-in payment processing with multiple currency support

   **Weaknesses**:

   1. Limited customization options for event pages
   2. Basic reporting capabilities
   3. Limited features for complex, multi-track events
   4. Higher fees compared to some competitors
   5. Limited virtual event capabilities

2. **Cvent**

   **Overview**: Cvent is an enterprise-level event management platform offering comprehensive solutions for large-scale events and conferences. It provides extensive features for both in-person and virtual events.

   **Strengths**:

   1. Comprehensive event management capabilities
   2. Advanced registration and attendance tracking
   3. Robust reporting and analytics tools
   4. Strong integration with hotel and venue sourcing
   5. Extensive virtual and hybrid event features

   **Weaknesses**:

   1. Complex interface with steep learning curve
   2. High cost making it less accessible for smaller organizations
   3. Requires significant technical expertise to fully utilize
   4. Over-complex workflows for simple events
   5. Limited flexibility in customization without professional services

3. **Bizzabo**

   **Overview**: Bizzabo is a modern event management platform that focuses on delivering engaging experiences across in-person, virtual, and hybrid events. It emphasizes data-driven insights and attendee engagement.

   **Strengths**:

   1. Strong focus on attendee engagement and networking
   2. Modern, responsive user interface
   3. Comprehensive virtual event capabilities
   4. Advanced analytics and ROI tracking
   5. Robust API and integration options

   **Weaknesses**:

   1. Higher pricing point for full feature set
   2. Limited customization for smaller events
   3. Mobile app requires separate configuration
   4. Complex setup process for first-time users
   5. Limited support for multi-language events

This analysis of existing systems reveals several gaps that Eventify aims to address:

1. Need for a balanced solution between simplicity and functionality
2. Importance of scalable pricing for different organization sizes
3. Requirement for intuitive interfaces without sacrificing features
4. Demand for integrated virtual event capabilities
5. Need for flexible customization options

## 2.4 Review of Related Work

### 2.4.1 Details of Reviewed Literatures

1. **User Interface Design in Event Management Systems**

   Pearlman and Gates (2010) conducted an early study on the importance of user interface design in event management software. They emphasized the need for intuitive navigation and clear information hierarchy. Building on this, Huang et al. (2015) conducted a study on user interface design for event management mobile applications. Their findings emphasize the importance of intuitive navigation and responsive design in enhancing user engagement. The study highlighted the need for simplified user flows and the integration of AI-powered assistants to improve user experience. More recently, Bowdin et al. (2023) have highlighted the growing importance of responsive design and mobile-first approaches in their comprehensive guide to event management.

2. **Ticketing and Registration Solutions**

   Ferdinand and Kitchin (2017) provided an in-depth analysis of ticketing systems in their book on event management. They highlighted the growing importance of flexible pricing models and integrated payment systems. A more recent study by Raj et al. (2022) examined the impact of blockchain technology on ticketing solutions, noting its potential for reducing fraud and enhancing ticket transferability.

3. **Virtual and Hybrid Event Technologies**

   In response to the COVID-19 pandemic, Rubinger et al. (2020) conducted a rapid review of virtual scientific meetings, highlighting both the challenges and opportunities presented by this format. Their research underscored the need for platforms that can seamlessly transition between in-person, virtual, and hybrid formats, while maintaining high levels of attendee engagement. Building on this, Ludvigsen and Hayton (2020) explored the concept of "hybrid congress", discussing how events can blend physical and digital elements effectively.

4. **Data Analytics in Event Management**

   Sivarajah et al. (2017) provided a comprehensive review of big data analytics in various fields, including event management. They highlighted the potential for predictive analytics in forecasting attendance and optimizing event content. This trend has continued to grow, with more recent studies emphasizing the role of data-driven decision-making in event planning and execution.

5. **Sustainability in Event Management**

   Jones (2017) discussed the growing importance of sustainability in event management, highlighting the need for digital solutions that can help reduce the environmental impact of events. This theme was further explored by Mair and Smith (2021), who examined how virtual and hybrid events can contribute to sustainability goals. Raj et al. (2022) expanded on this, emphasizing the role of technology in reducing the environmental impact of events through features such as digital ticketing and virtual attendance options.

6. **Accessibility in Event Management**

   Darcy and Dickson (2009) explored the importance of accessibility in event management, emphasizing the need for digital platforms that cater to diverse needs. Their work highlighted how technology can be leveraged to create more inclusive event experiences.

7. **ICT in Event Management**

   Reinhold et al. (2017) conducted a systematic literature review on the use of information and communication technologies (ICT) in events. They identified key areas where ICT is applied in event management, including marketing, operations, and attendee experience enhancement.

8. **Smart Events and IoT Integration**

   Xiang et al. (2022) explored the concept of "smart events," integrating Internet of Things (IoT) technologies into event management systems. Their work demonstrated how IoT can enhance real-time data collection and improve the overall event experience.

### 2.4.2 Summary of Reviewed Literatures

The reviewed literature reveals several key trends in event management systems:

1. A growing emphasis on user-centric design and mobile-first approaches (Bowdin et al., 2023; Huang et al., 2015).
2. A shift towards more flexible, hybrid event models that blend in-person and virtual elements (Ludvigsen and Hayton, 2020; Rubinger et al., 2020).
3. The rising importance of data analytics in driving decision-making and measuring event success (Sivarajah et al., 2017).
4. An ongoing challenge in balancing feature richness with user simplicity and ease of use (Pearlman and Gates, 2010; Bowdin et al., 2023).
5. Increasing focus on sustainability and accessibility in event management (Jones, 2017; Darcy and Dickson, 2009; Raj et al., 2022).
6. The increasing integration of AI and machine learning for personalized experiences.
7. Emerging applications of advanced technologies such as IoT in event management (Xiang et al., 2022).
8. Growing integration of various event management functions into comprehensive platforms.

## 2.5 Strengths and Weaknesses of the Existing System

### Strengths:

1. Robust ticketing and registration capabilities (Ferdinand and Kitchin, 2017)
2. Increasing adoption of mobile-friendly interfaces (Bowdin et al., 2023; Huang et al., 2015)
3. Growing integration of virtual event hosting features (Rubinger et al., 2020)
4. Advanced analytics for tracking event performance (Sivarajah et al., 2017)
5. Improved efficiency in event planning and execution through automation
6. Enhanced data collection capabilities for post-event analysis
7. Support for virtual and hybrid event formats
8. Integration with other business tools (e.g., CRM systems, marketing platforms)

### Weaknesses:

1. Limited customization options for complex, multi-session events (Raj et al., 2022)
2. Inadequate support for seamless transitions between in-person and virtual formats (Ludvigsen and Hayton, 2020)
3. Insufficient focus on attendee-to-attendee networking, particularly in virtual settings
4. Challenges in data privacy and security, especially for international events
5. Lack of integrated solutions that cover the entire event lifecycle from planning to post-event analysis (Getz, 2008)
6. Limited application of advanced technologies for personalization and predictive analytics
7. Lack of robust integration between event management and long-term community building
8. Challenges in providing seamless experiences across in-person and virtual attendees in hybrid events

# 2.7 General Comments

The literature review reveals that while significant advancements have been made in event management systems, several gaps remain. There is a clear need for more integrated, flexible solutions that can adapt to the changing nature of events in a post-pandemic world. The Eventify project aims to address some of these gaps in its initial MVP by:

1. Developing an intuitive, user-centric interface for both organizers and attendees.
2. Creating a system that supports basic in-person event management with the potential for future virtual event integration.
3. Implementing foundational attendee networking capabilities.
4. Providing basic data collection and simple analytics while prioritizing user privacy and data security.
5. Delivering a comprehensive solution that integrates core aspects of event management.
6. Laying the groundwork for future enhancements in areas such as sustainability, accessibility, and advanced technology integration.

By focusing on these areas, Eventify has the potential to contribute to the field of event management systems, addressing current limitations in a targeted manner and establishing a foundation for more advanced features in future iterations. The initial MVP will prioritize essential functionalities while designing the system architecture to accommodate future scalability and feature enhancements.

Future research and development in this field should continue to focus on enhancing the integration of advanced technologies, improving the hybrid event experience, and developing more sophisticated tools for attendee engagement and networking. While the initial version of Eventify will not incorporate advanced features such as AI-driven recommendations or IoT integration, the system will be designed with the flexibility to incorporate such technologies in future versions.

This approach allows for the development of a solid, functional base system while providing a clear roadmap for future enhancements that align with the evolving needs of the event management industry.
