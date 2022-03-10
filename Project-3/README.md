LOUD LINK



```
Frontend Routes

CONTEXT

<theme />
<logged />



COMPONENTS


<SearchBar />
<Users />
<Events />
<Ads />
<NavBar />
<ProfileCard />
<EventCard />
<AdCard />


PAGES

 
<HomePage />
.
.
.
... <Link to="SIGNUP / LOGIN"></Link>
.
.
.
... <SearchBar />
.
.
.
... <Users />
.
.
.
...<Events />
.
.
.
...<Ads />
.
.
.
<Signup />
.
.
.
<Login /> 
.
.
.
<MainPage /> 
.
.
...<Users />
.       .
.       .
.       ... <Link to <AllProfilesPage />
.       .
.       .
.       ... <Link to <ProfileDetailPage />
.
.
...<Events />
.       .
.       .
.       ... <Link to <AllEventsPage />
.       .
.       .
.       ... <Link to <EventDetailPage />
.
.
...<Ads />
.       .
.       .
.       ... <Link to <AllAdsPage />
.       .
.       .
.       ... <Link to <AdDetailPage />
.
.
...<NavBAr />
.        .
.        .
.        ... <NavLink to="<Create ad /> <Create event />"
.        .
.        .
.        ... <NavLink to="<SearchPage />"
.        .
.        .
.        ... <NavLink to="<EditProfilePage />"
.
.
<AllProfilesPage />
.
.
...<SearchBar />
.
.
...<ProfileCard />
.
.
...<NavBar />
.        .
.        .
.        ... <NavLink to="<Create ad /> <Create event />"
.        .
.        .
.        ... <NavLink to="<SearchPage />"
.        .
.        .
.        ... <NavLink to="<EditProfilePage />"
.
.
.
<ProfileDetailPage />
.
.
...<divs>
.       .
.       .
.       ...<AdCard />
.       .
.       .
.       ...<EventCard />
.
.
...<NavBAr />
.        .
.        .
.        ... <NavLink to="<Create ad /> <Create event />"
.        .
.        .
.        ... <NavLink to="<SearchPage />"
.        .
.        .
.        ... <NavLink to="<EditProfilePage />"   
.
.
.
<EditProfilePage />
.       .
.       .
.       ...<divs>
.
.
.
<AllAdsPage />
.
.
...<SearchBar />
.
.
...<AdCard />
.
.
...<NavBAr />
.        .
.        .
.        ... <NavLink to="<Create ad /> <Create event />"
.        .
.        .
.        ... <NavLink to="<SearchPage />"
.        .
.        .
.        ... <NavLink to="<EditProfilePage />"
.
.
.
<CreateAdPage />
.       .
.       .
.       ...<divs>
.
.
.
<AdDetailPage />
.
.
...<divs>
.       
.       
.
<AllEventsPage />
.
.
...<SearchBar />
.
.
...<EventCard />
.
.
...<NavBAr />
.        .
.        .
.        ... <NavLink to="<Create ad /> <Create event />"
.        .
.        .
.        ... <NavLink to="<SearchPage />"
.        .
.        .
.        ... <NavLink to="<EditProfilePage />"
.
.
.
<EventDetailPage />
.
.
.
...<divs>
.       
.
.
...<NavBAr />
.        .
.        .
.        ... <NavLink to="<Create ad /> <Create event />"
.        .
.        .
.        ... <NavLink to="<SearchPage />"
.        .
.        .
.        ... <NavLink to="<EditProfilePage />"
.
.
.
<CreateEventPage />
.        .
.        .
.        ...<divs>
```

#### Wireframes

[Excalidraw link](https://excalidraw.com/#json=LhDHL6o2kCv5idgcWPOlt,AJXyjzmkka9wl-BWmTCswQ)

Background Routes

##### Auth routes

| HTTP verb | URL            | Request Headers                 | Request Body                    | Action         |
| --------- | -------------- | ------------------------------- | ------------------------------- | -------------- |
| POST      | `/auth/signup` | --                              | { email, password, usrn, tags } | Creates A User |     
| POST      | `/auth/login`  | --                              | { username, password }          |                |
| GET       | `/auth/verify` | Authorization: Bearer \< JWT \> | --                              |                |


##### Profile

| HTTP verb | URL                  | Request body    | Action                     |
| --------- | -------------------- | --------------- | -------------------------- |
| GET       | `/api/users`         | (empty)         | Return All Users           |
| GET       | `/api/users/:userId` | {userId}        | Returns the specified User |
| PUT       | `/api/users/:userId` | {userId, JSON}  | Edit the specified User    |
| DELETE    | `/api/users/:userId` | {userId}        | Delete the specified User  |


##### Announcements

| HTTP verb | URL                                       | Request body           | Action                             |
| --------- | ------------------------------------------| ---------------------- | -----------------------------------|
| GET       | `/api/annoucements`                       | (empty)                | Return All Announcements           |
| POST      | `/api/annoucements`                       | JSON                   | Create an Announcement             |
| GET       | `/api/annoucements/:annoucementId`        | (empty)                | Returns the specified Announcement |
| PUT       | `/api/annoucements/:annoucementId/edit`   | JSON                   | Edit the specified Announcement    |
| DELETE    | `/api/annoucements/:annoucementId`        | (empty)                | Delete the specified Announcement  |


##### Events

| HTTP verb | URL                          | Request body  | Action                      |
| --------- | -----------------------------| ------------- | ----------------------------|
| GET       | `/api/events`                | (empty)       | Return All Events           |
| POST      | `/api/events`                | JSON          | Create an Event             |
| GET       | `/api/event/:eventId`        | (empty)       | Returns the specified Event |
| PUT       | `/api/event/:eventId/edit`   | JSON          | Edit the specified Event    |
| DELETE    | `/api/event/:eventId`        | (empty)       | Delete the specified Event  |


Models

```
User model

{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  image: {type: String},
  description: {type: String, maxlength: 400},
  tags:[String],
  location: {type: String},
  videos: {type: String},
  ownAnnouncements: [{type: Schema.ObjectId, ref: "Announcement"}],
  announcements: [{type: Schema.ObjectId, ref: "Announcement"}],
  ownEvents:[{type: Schema.ObjectId, ref: "Event"}]
}
```

```
Announcement

 {
   title: {type: String, required: true},
   image: [{type: Schema.ObjectId, ref: "User"}],
   description: {type: String, maxlength: 400}, 
   owner: [{type: Schema.Types.ObjectId,ref:'User'}],
   participants: [{type: Schema.Types.ObjectId, ref:'User'}],
   eventDate: {type: Date},
   expirationDate: {type: Date},
   active: {type: Boolean},
   tags:[String]
 }
```

```
Events

{
  owner: [{type: Schema.Types.ObjectId, ref:'User'}],
  title: {type: String, required: true},
  description: {type: String, maxlength: 400},
  image: [String],
  date: {type: Date},
  schedule: {type: Date},
  artists: [{type: Schema.Types.ObjectId, ref:'User'}],
  location: {type: String},
  price: {type: Number},
  tags:[String]
}
```

#### Deploy Link

