# Project-3


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
