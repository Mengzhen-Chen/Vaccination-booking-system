# README

### VACCINATION-PROTAL_WEB libraries

- `react` `17.0.2`
- `react-bootstrap` `2.0.0`
- `axios` `0.24.0`
- `react-flatpickr` `^3.10.7`
- `moment` `^2.29.1`
- `react-hot-toast^2.1.1`
- `bootstrap` `5.1.0`

### VACCINATION-PORTAL-SERVER libraries

- `spring-boot-starter-data-jpa`
- `spring-boot-starter-web`
- `mysql-connector-java`
- `spring-session-core`
- `spring-boot-starter-security`
- `jjwt`
- `commons-lang3`
- `validation-api`

### Run VACCINATION-PROTAL-WEB

1. install dependent libraries

```bash
cd project_dir
npm i
```

1. run web server

```bash
npm run start
```

### Run VACCINATION-PROTAL-SERVER

1. install dependent libraries and build run jar file

```bash
cd project_dir
mvn clean package install
```

1. run Application

```bash
java -jar target/portal-0.0.1-SNAPSHOT.jar
```

### VACCINATION-PROTAL-SERVER functionalities

- com.example.vaccination.portal.controller.AuthController#login  login action
- com.example.vaccination.portal.controller.AuthController#signup  signup action
- com.example.vaccination.portal.controller.AuthController#myProfile  get my profile data
- com.example.vaccination.portal.controller.AuthController#editProfile  update my profile data
- com.example.vaccination.portal.controller.VaccineController#list   list all vaccines
- com.example.vaccination.portal.controller.AppointmentController#findByVaccine   find all appointments by vaccine
- com.example.vaccination.portal.controller.VaccinationPlaceController#findByAppointment   find all vaccination places
- com.example.vaccination.portal.controller.BookingController#booking  submit vaccination booking

### VACCINATION-PROTAL-WEB functionalities

- src/Login.js   login page
- src/Signup.js  signup page
- src/MyProfile.js  show my profile page
- src/EditProfile.js  modify my profile page
- src/BookVaccination.js   submit vaccination booking page
- src/request.js   send request to server page