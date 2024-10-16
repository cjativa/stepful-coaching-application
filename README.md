# Stepful Coach Scheduler

This repository contains the code for the Stepful Coach Scheduler. It is a fullstack TypeScript application and enables
coaches to login to the application and add available appointment slots to their coaching schedule. Coaches can view their
coaching schedule and see which appointment slots have been booked. Once a slot is booked by a student, the coach can
see the associated student's name and phone number.

It also enables students to sign-in to the application and book one or more of the available appointment slots with
any coach. Once a student books an appointment slot with a coach, that booked appointment slot is shown in the students
own booked appointment lists

Some constraints enforced by the application

- Coaches cannot add a new appointment slot that would overlap with an existing appointment slot in their schedule.
- Coaches cannot sign into the Student login and cannot access the Student Booking page
- Students cannot sign into the Coach login and cannot access the Coach Booking page

Some caveats not addressed due to the ~3-hour time constraint of the project

- Basic error-handling is in-place for common actions on the client-side though not robust
- Authentication is mainly client-side oriented and end-users sign into with a "name" instead of a username/password
- Have not implemented ability for a coach to mark a call as complete to enable them to record a student's satisfaction and take free-form notes
- Have not implemented abiility for coaches to review their past scores and notes for the appointments
- Available appointment slots in the past can be created by coaches and can be booked by students

### Technology Stack

- Node.js 18/Express for the backend server functionality
- Prisma ORM for interfacing with our PostgreSQL database and facilitating table relations
- React/React Context for client-side application and authentication state
- Material UI for client-side components and list views for the schedule lists
- Makefile for easier declaration of commands for building and readying the application services

### How to Start Application

**Requirements**

1. Ensure Node.js v18 is available in your environment
2. Ensure PostgreSQL is available in your environment and running
3. Ensure `make` is available in your environment or install using `sudo apt install make`
4. You should have an empty database called `stepful` with a schema name of `public`
5. Copy the contents of `.env-template` to a file `.env` and simply update the `DATABASE_URL` string with your database username and database password

**Steps to Start Application**

1. Run `npm ci` to install the needed node modules
2. Run `make build-application` which will compile the backend and client-side code
3. Run `make push` which will modify your empty `stepful` database to populate it with the proper schema structure
4. Run `make seed` to populate the empty database structure with some testable student users and coach users
5. Run `make start` to start the application, at which point you can visit http://localhost:4006

You can test the application by signing in using the following coach profiles

1. Tanya P
2. Christopher Jativa
3. Franklin V

You can test the application by signing in using the following student profiles

1. Jeremy J
2. Dylan A
3. Camila P

**Loom Video of running through these steps**

https://www.loom.com/share/8596b37c9b3749828fa965682a83ac76?sid=a9340be0-bf7b-4271-be16-d18fb5e77f97
