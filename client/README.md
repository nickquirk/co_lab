
# co_lab

For the final project of the General Assembly Software Engineering Immersive course I wanted to push myself and make something that was different to what we’d worked on in class or in the previous projects. Co_lab was an idea I developed that allows people to collaborate together to create short loops of music which I called Fragments. 

Each Fragment is a sixteen bar loop which can hold up to four tracks of audio. The audio is created in a sequencer where the user can program simple melodies using a wide array of instruments. Once the fragment is created it can be played as a whole on the main index page, shown below.  

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image20_mbtdxa.png)



##  Deployment
Project can be accessed at: https://co-lab-project.herokuapp.com/

##  Getting Started/code Installation
Code can be accessed at: https://github.com/nickquirk/co_lab

Open the project in a code editor and run the follwoing in the terminal
```
npm i

```
Then install the following:
```
  "dependencies": {
    "axios": "^0.25.0",
    "bootstrap": "^5.2.3",
    "buffer": "^6.0.3",
    "eslint-plugin-react": "^7.31.11",
    "midi-sounds-react": "^1.2.54",
    "react": "^18.2.0",
    "react-bootstrap": "^2.6.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.4",
    "react-scripts": "^5.0.1",
    "sass": "^1.56.1"
  },
```
##  Timeframe & Working Team
This was a solo project. I had a week to meet the criteria of the project and build a full-stack web application.
##  Technologies Used
**Development Tools** 
* Visual Studio Code - IDE
**Languages**
* JavaScript
* Python

### Frameworks
**Frontend**
* React - JavaScript framework (https://reactjs.org/)
* Sass - CSS extension language (https://sass-lang.com/)
* Bootstrap - Frontend toolkit (https://getbootstrap.com/)
**Backend**
* Axios - HTTP client (https://www.npmjs.com/package/axios)
* Express - API interface (https://expressjs.com/)
* Django - Python web framework (https://www.djangoproject.com/)
* NPM - JavaScript package manager (https://www.npmjs.com/)
* Pipenv - virtual environment and package manager (https://pipenv.pypa.io/en/latest/)
* PostgreSQL -  Relational database (https://www.postgresql.org/)

### Other tools
* Cloudinary - Image upload and hosting tools (https://cloudinary.com/)
* TablePlus GUI database tool - (https://tableplus.com/)
* Heroku - cloud application platform (heroku.com)
* Insomnia - API interface
* MIDISounds React - (https://www.npmjs.com/package/midi-sounds-react)




##  Brief
* Build a full-stack application by making your own backend and your own frontend
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database
* Consume your API with a separate frontend built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design
* Be deployed online so it's publicly accessible

##  Planning
I had been thinking about the final project for a few weeks leading up to the actual start so I had a few ideas. The idea of a platform for musical collaboration kept coming back to me so I decided to explore the feasibility as a final project. I was initially thinking of a platform based around audio files but the more I thought about it, the more I felt that a platform that allowed a user to actually create the music would be more accessible and fun. 

After some research I found a React component that allowed notes and basic sequences to be played using a combination of 1500 instrument and drum sounds based on the General MIDI standard. I spoke to Sam, our course Instructor, and he suggested that I create a prototype to see if what I wanted could actually be done in the timescale that we had for the project. 

By the start of the project I had a rough prototype together so I knew I could do what I had planned. When this was sorted I drew up some wireframes and an ERD (Entity Relationship Diagram) of the backend database relationships. 

This was a slightly different approach to how I’d worked before but I felt like it gave me a good start to a potentially challenging project and allowed me to hit the ground running. To ensure that I actually had a project at the end of the week I developed a Minimum Viable Product (MVP) that would fulfil the criteria of the brief and also provide the functionality that I wanted. 

### Minimum Viable Product
The items highlighted in italics were proposed but dropped when I re-scoped the project. 

#### Register/Login
* User can create an account and login 
#### Landing Page
* Can play fragments 
#### Fragment Index
* Can play fragments 
* Can create new fragments 
* Can update fragments 
* Can see owned fragments on profile page 
* Can see owned tracks on Fragments 
#### Sequencer
* Can create new tracks
* Can save tracks 
* *Play other tracks on fragment* 
    * *Can be muted*
* *Instrument and drum sequencer*
#### Profile
* See fragments user has created
* Update profile pic
#### Styling
* Site looks professional and functions in a way that is expected (no unseen errors)
* User experience is on-par with a professionally designed site 

### Backend Entity Relationship Diagram
This diagram shows the relationships between the backend models. The backend was written in Python using Django and PostgreSQL. Essentially there were three main models (Instrument was dropped)
* Fragment 
* Track
* User

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image27_c54vgj.png)

### Wireframes
Once I had developed my idea to the point of a Minimum Viable Product, I created some wireframes to plot the user journey through the site. 

**Login Page**

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628442/Readme_Pics/Project4/image9_gjlbj6.png)

**Fragment Index**

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image25_esqqap.png)

**Sequencer**

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628441/Readme_Pics/Project4/image3_xgzmsh.png)

**Profile**

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628442/Readme_Pics/Project4/image10_ay3kq5.png)

### Stretch Goals
Even though I had a basic prototype I knew that incorporating the sequencer and sound playing element of the application was going to be quite a lengthy process. To make sure I met the MVP I stripped back the project to its essentials and then added any extra functionality as stretch goals to implement if I hit the MVP.

* Search/filter function on instruments and drums 
* Search/filter on Fragments 
* Fragments have tags for genre/feeling/instruments 
* Edit name and Tempo on sequencer page 
* Users can comment and rate Fragments 
* Record and upload audio tracks 
* Dynamic sequencer
    * Can toggle between 16/32 bars and also shift the octave up and down



##  Build/code Process
This being the final project on the General Assembly Software Engineering Immersive I now had some tricks that worked with my previous projects that I could bring into this one. 

### End of Day To Do List 
Something that I found worked well in previous projects was writing a todo list at the end of the day for the following day. I would make a note of everything that I could think of that needed to be completed by the end of the next day. I would then try to break these down where I could and also highlight the one task that would give the biggest return or was the most difficult and would aim to tackle that first thing in the morning. It wasn’t important that I finish all the things on my list, any that didn’t get done were added to the next day's list or reevaluated but the act of clearing my head at the end of the day and starting the following day already with a focus made a huge difference to my focus and efficiency.  

### Regular Rescoping
I’ve mentioned previously that this was an ambitious project to attempt in the time we were given. Because of this I made sure I regularly revisited my MVP to ensure that I had time to implement all of the features I’d set out to develop. Several times during the project I had to cut features that I felt couldn't be built in time or would end up being rushed and sub-par. It always hurts a bit to cut a feature from a project but the thought of having an incomplete or unworkable project hurts more! 

### Prototype
Owing to the time restraints imposed and the scope of this project being outside what we had covered in the course I took some decisions early on about how I was going to develop the project and manage my time so that I had a decent product at the end. 

In the days leading up to the project I developed a basic prototype to ensure that I could interact with the MIDISounds component in the way that I wanted to. 

The requirements for the prototype were as follows:
* Create a 16 step sequence 
* Change instrument 
* Play/stop 
* Clear the sequence 
* Load/Save the sequence  

To allow me to develop the prototype quickly I kept within these core functions and kept styling to a minimum. Once I knew that these functions were possible I could proceed with the project. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image23_s63imf.png)

The most time consuming part of the build process was taking my prototype and incorporating it into a whole application and making it user friendly. I knew this component was going to be complicated so I made the decision to trim the application down where I could and keep the backend and user journey simple. 

### Git and Version Control 
I used Git to manage the version control. In a similar way to previous projects I created a development branch, which I worked on and committed to daily, and then only committed to the main branch at the end of the project. In the future, I will continue working in this way, developing day-to-day on the development branch and only pushing to main once the feature that I’m working on is completed. 

### MIDISounds Component 
This is a standalone component that provides all of the sounds for my application. It was written by Sergey Surikov (https://github.com/surikov) and some documentation is available here:https://surikov.github.io/midi-sounds-react/

It can play single notes and chords and also sequences which it takes in the form of a ‘beat array’. This is a specially formatted array which I will explain below. During my preliminary research phase I looked at how the object received note and instrument data and also the various methods which allow playback and control of musical data. 

### MIDISounds Methods
Calling these methods allowed me to interact with the MIDISounds object. There wasn’t much documentation to follow so this required a bit of reverse engineering to understand. The first thing to understand was how to play a sound. 

#### Instruments
The MIDISounds object references 1500 instrument and drum sounds which are accessed using numbers, for example 1 is an Acoustic Grand Piano and 79 is an Electric Guitar. These instruments range from classical orchestral through to synth and more contemporary rock sounds like distorted guitars and drums. 

#### PlayChordNow(instrument, pitches (MIDI note number), duration)
Instruments can be played using several methods, PlayChordNow() is the most basic. It takes parameters in the form shown above which allow a certain note or notes to be played by a given instrument for a given duration. An example of this is shown below.

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628442/Readme_Pics/Project4/image13_dgrjlg.png)

This will play a middle C with the Acoustic Grand Piano for a duration of 0.125 seconds. 

#### StartPlayLoop(beatArray, bpm, density, fromBeat)
This method will take parameters in the form shown above and play a musical loop at a given tempo. The beatArray should be in the following format. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image31_koiwrs.png)

A Beat is equivalent to one step in a musical sequence. The drums and the two instruments will be played at the same time before progressing to the next beat in the sequence.  

#### LoopStarted
Returns a boolean. Will return true if the currently loaded loop has been started. I used this method to toggle the text on the play buttons between ‘play’ and ‘stop’. 

### Integrating the Component
I had built a basic standalone prototype but incorporating it into my application took quite a bit of work. The MIDISounds component is an older, class-based component which meant the process of interacting with it wasn’t straightforward when working with newer-style React code using hooks. 

I couldn’t find a straightforward way to interact with the object from a parent component so I found a solution with nesting the components which would trigger audio inside a parent MIDISounds component which was then a child of the page component. The hierarchy is shown below 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628445/Readme_Pics/Project4/image39_lrdjj9.png)

### Sequencer
This was probably the largest part of the project and would allow users to create the musical tracks which populate a fragment. Initially I wanted to create both a drum and instrument sequencer but with the time restraints imposed I decided to focus on just the instrument component. 

#### Grid
For the prototype I used toggle buttons to form the basis for the grid but this didn’t look great and the user experience was quite clunky so I made the decision to swap these out for square divs which could be toggled on and off. I decided to make the grid dynamic which took a bit of extra work but I think was a wise design choice for future development. Designing in a dynamic way meant that the grid size can be easily changed should I need to in the future. 

The default grid is sixteen steps long and spans 14 notes (one octave) from middle C (C3, MIDI note 60) at the bottom left corner. The MIDISounds object can play multiple notes at once but in order to keep the user experience simple and streamlined I decided to limit the amount of notes per step to one.

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image33_kapuzu.png)

#### Creating the Grid
To create the grid I first built an array in the form that I wanted the grid to follow. I used an object with the value as a boolean to represent if a cell was checked or not. I created a function that is called on page load and creates an array based on a given number of rows and columns. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image32_l3qqdo.png)

The array that is returned is in the form: 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628441/Readme_Pics/Project4/image1_zvkcy7.png)

Each step in the sequence in an object with a key value pair that denotes if the cell has been checked or not. On page load a blank grid is created and this is then used as a basis to build the grid interface.

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628445/Readme_Pics/Project4/image37_ubxkoo.png)

#### Creating an Empty Sequence 
This is another function that is called on page load. It creates an empty sequence which can then be filled by the user input on the sequencer interface. As with the grid function above, the function takes the number of columns as an argument and returns an empty sequence array. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image32_l3qqdo.png)

An empty sequence array takes the following form:

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673630611/Readme_Pics/Project4/Screenshot_2023-01-13_at_17.23.27_ej8mlf.png)

#### Cell Component
Each cell in the grid is made up of a cell component. The cells are passed the rowID, column ID, the cell state and the function generateSequenceData as props. These are in-turn passed to the generateSequenceData function as arguments. In this way, the grid is updated when the user clicks a cell and information about which cells have been clicked is sent to the generateSequenceData function which then creates sequence and grid data. 

Using a ternary operator I added some conditional logic to each cell to change the background colour when the cell is toggled. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image19_etvgeh.png)

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628441/Readme_Pics/Project4/image6_ygqavn.png)

#### Track object
Once a sequence has been created it can be saved to the parent Fragment. The saving and recalling of sequence data was probably one of the most challenging parts of this project. I decided to save each track as discrete objects with the following form. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628442/Readme_Pics/Project4/image12_qhnrn9.png)

The data key contains an array of objects that hold all the data required to reproduce each step of a sequence. This takes the following form.

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image30_fsdcdq.png)

#### Helper functions
In order to create reusable code I created two helper functions to ‘pack’ and ‘unpack’ the track objects which could be used whenever I needed to use or save the track data. One would take sequence data and return a trackObject and the other would take a trackObject and return sequence data. 

#### Pack Track Object
![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image18_blb06w.png)

#### Unpack Track Object
![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image34_d4layy.png)

#### Saving Track Data
In order to save the track data to the database it needed to be parsed to a JSON string (JSON stringified) and then sent as an Axios POST request. I created a function to handle this. I wanted to create a collaborative environment and one of the features I wanted to include to help this was displaying the username of the person who created the Track or Fragment to be shown. 

To do this, and also to encourage users to create an account, I added authentication routes on the Axios POST requests. I included details of the user making the request in the headers, using Bearer Token authentication.

Each track is saved with a reference to the Fragment it is associated with. This is obtained from the url address using useParams() and parsed in the Axios POST request. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image21_vnmyq5.png)

### User Authentication 
I used authentication in several areas of the application. This was mainly to identify the user who had created a Fragment or Track but also to encourage people to sign up. I wanted to encourage collaboration on Fragments and I thought this would be a fun way to let people know who they’re collaborating with.  

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628442/Readme_Pics/Project4/image7_ri2gno.png)

### Profile Page
I wanted to create a profile page that gave users access to the Fragments that they’d created and collaborated on. From here there would also be the option to delete or edit Fragments. To add some customisation to the account I gave the user the ability to add or update a profile picture. 

### Fragment Index
This is a view of all the available Fragments and allows users to play all of the tracks on a fragment at the same time. Users can browse through the pool of available Fragments and, if the Fragment has fewer than four tracks, can add a track.

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image20_mbtdxa.png)

The most challenging part of this page was combining the fragment tracks into one and playing them. During my prototyping I had tested playing multiple notes with different instruments at once with the MIDISounds component so I knew it was possible but dynamically creating a track with combined user content on the fly was really tricky! 

Using useState() and useEffect() I tracked the state of several variables and triggered functions when they were changed or updated. 

#### Selected Fragment
When the play button on the Fragment is clicked the id of the fragment is used to make an Axios GET request to the API to retrieve the data about the fragment. This is then saved as selectedFragment.  

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628442/Readme_Pics/Project4/image11_xs7bjd.png)

A useEffect listens for when the selected fragment is changed, unpacks and de-stringifys the track objects associated with that fragment and, using the helper function I described previously, then creates an array of these tracks. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image17_g9gvo6.png)

These tracks are then combined and packed into a fragment track which is saved as a state variable called fragmentTrack.

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image22_n40pvf.png)

#### Fragment Track 
I created a helper function which takes up to four tracks in the form of an array and returns one sequence as a beat array in the form that I explained previously. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628442/Readme_Pics/Project4/image14_wfe3na.png)

Once the fragment track is returned it is parsed to the MIDISounds component which will start looping the sequence. 

### Styling
I wanted the styling to be bold but also clean and minimal. I decided to create a light grey background colour, which would group together similar sections on the page and provide some continuity. In addition to this I used a yellow accent colour to add variation on certain sections and keep it visually interesting but also to highlight useful functions such as the login/logout button in the navbar. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image29_zevaku.png)

To add some visual spice I added a background for the cards and owned fragments in the profile page. I felt that an all caps font on most elements added to the bold styling and when combined with the special characters gave the styling a slightly futuristic theme. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628442/Readme_Pics/Project4/image8_lhfyjz.png)

### User Experience
I wanted to display information to the user about how to interact with my application in an engaging but unobtrusive way. The idea I developed was to use a modal that would display information about how to use the application but would be shown only on the user’s first visit to each page. In this way I hoped that each new user would have the information they needed to use the application but it wouldn’t impact the experience otherwise.

I developed the modal as a standalone component with a UseEffect that triggers on page load. Conditional logic then checks for a token in local storage with the pageId that matches the current page. If the token does not exist then the modal is shown and the key is created. If the token exists then nothing happens. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628442/Readme_Pics/Project4/image15_mcfob0.png)

The modal content is passed to the component as props. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628441/Readme_Pics/Project4/image2_addub4.png)

Which displays to the user like this

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628443/Readme_Pics/Project4/image16_gmynqf.png)

### Backend
As mentioned previously I kept the backend structure simple with just three models and three relationships between them. 
* Fragments
* Tracks
* Jwt_auth (users) 

This design decision paid off when the main functionality of my application took slightly longer than expected to develop. Fortunately the simple design only took me about a day to implement which meant I kept on-track with where I had planned to be day-to-day.  

#### Populated Serializers 
In several places I made use of populated serializers to populate keys on models with more data. An example of this was on the Track model. I spoke in the User Authentication section about how I wanted to display the username of users on each Fragment and Track that they created. Using Populated Serializers is how I achieved this. 

On the Track model I created a foreign key called owner. 
![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image26_uwgtxv.png)

I then created a populated track serializer, setting the owner key equal to the user serializer.
![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image28_j9vu0y.png)

Finally I added the populated track serializer to the track view
![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628441/Readme_Pics/Project4/image4_nrzqjn.png)

In this way the owner foreign field was populated with the complete data about the user that had created the Track rather than just the id. This gave me access to the username key which was much more readable and personal than just using the owner id which was a number. 

![](https://res.cloudinary.com/dhjguxvm1/image/upload/v1673628444/Readme_Pics/Project4/image35_j1qxg4.png)


##  Challenges
There were many things that made this project challenging but overall I’m happy with how I managed them. 

* Reducing the scope of the project whilst still making it interesting 
* Converting data between sequencer/grid and MIDISounds component 
* Changing the way that I interacted with the MIDISounds Object
* Packing multiple tracks into one fragment track 
* Streamlining user experience 
* Keeping a complex idea simple 
* Keeping everything dynamic

### Project Scope
At the start of the project I had lots of ideas about how I wanted to develop the idea. Whilst I wrote down all of these ideas I was mindful of the limited time for this project and that if I wasn’t careful I would end up without a MVP. To avoid this scenario I was really strict with the MVP and several times during the project reduced the scope so that I would definitely have a finished project. 

One thing that I think I tripped up on was trying to include both the instrument and drum sequencers. I developed both of these in parallel for a few days but then realised I was running out of time so prioritised the instrument sequencer and in the end dropped the drum sequencer from the MVP. In hindsight I should have prioritised the instrument sequencer from the start, adding the drum sequencer as a stretch goal.  

#### Building Track and Fragment Arrays
This was one of the most challenging areas of the project. I really underestimated how much time it would take to wrangle the data into a form that could be saved and then recalled and used by each component. Building up these arrays involved creating functions that dynamically manipulated objects and arrays depending on user input and I had to ensure that they would output in the required format so that they were playable by the MIDISounds component regardless of user input. 

Creating the Fragment track array was particularly difficult. Combining up to four track arrays into one sequence gave me a few headaches but I feel that the process has definitely taught me more about how to use object and array methods. I also feel much more comfortable attempting to tackle ‘Codewars’ style logical problems now. 

#### Building Dynamic Components 
I’ve touched on this previously but designing components to be dynamic in nature was much more difficult than hard-coding them. It required me to adopt a mindset where I was thinking about how the user would interact with the component and how I could help them use the tools I was developing. It also pushed me to think about building components in a way that made life easier for future me. I would much rather spend some time up front building a reusable component than get a feature in quickly that isn’t reusable. I think working in this way also focused me on the main functionality of what I’m developing and helped me to write DRY code. 

A good example of this is the sequencer grid. I could have quite easily hardcoded the values for the layout of the grid but instead I took the time to make it dynamic. This decision paid off when I decided to adjust the size of the grid midway through the project. Rather than having to change values across many functions, I just changed two variables at the top of the document. This also meant that I could quite easily expose this functionality to the user, allowing them to change the size of the grid dynamically. Although this didn’t quite make it into the finished version, I’ve written the code in a way that would make it very quick to implement. 


#### Time Management
I’ve mentioned a few times that this project had the potential to be a bit too big for the timeframe that we had. To ensure that I actually had a project at the end of the week, time management was really important. I assessed where I was at the end of each day and several times re-scoped the project so that I could hit a decent MVP. 



##  Wins
* The idea works! It's fun and can create interesting content 
* I think the styling works well 
* Learnt a huge amount about arrays and objects and transforming data from one form into another dynamically 

##  Key Learnings/takeaways 
Some of my key takeaways are detailed in this section. 
### Manipulating Data 
This project really tested my ability to manipulate data, especially when working with objects and arrays. Having to develop functions to pack and unpack the Track and Fragment objects really stretched my logical JavaScript skills and has definitely helped me to become more comfortable with these kinds of ‘CodeWars’ style problems. 

### Django and PostgreSQL 
This was the first project where I had used these technologies. Although I kept the backend fairly simple I think building this project really helped to become more comfortable working with both of these and also with Python.  

### Bootstrap
This isn’t the first project I’ve built using Bootstrap but this project has definitely deepened my knowledge of the framework. In this project I explored ‘modals’ and ‘toasts’ as a way of displaying information to the user in a way that was slightly more dynamic than just displaying text. Particularly the Modals, where they only display automatically once per user. I designed the Modal component to be reusable so this is something I’ll be able to take into future projects.  


##  Bugs
Unfortunately there are still some bugs in my code that I didn’t have time to address. 

### Fragment Playback
When the Fragment Index page is first loaded the play button needs to be clicked several times before the selected Fragment Track will play. I think this could be solved by caching the instruments in the MIDISounds component first, before playback. A ‘loading’ message or ‘spinner’ could be displayed while the instruments are cached, to improve the user experience, and once the track is ready for playback the whole track would be played. 

This would potentially solve another bug which also occurs after first page load. When playback of the selected Fragment Track starts, it doesn’t start at the beginning of the track.  



##  Future Improvements 
I really enjoyed building this project and will continue to develop the idea. I’ve been making a list of improvements that will make the user experience better, will add additional functionality and make the code more efficient and easier to work with. First of all I’ll refactor existing code and develop the User Experience. Then I’ll work on implementing some of the stretch goals that I outlined previously 

### Refactor Code 
Owing to the short development time of this project I had to make certain design decisions that weren’t optimal in the long run. While I was working on the project I worked around these decisions but I can tell that they will make life more difficult in the future so one of the first improvements I’ll make is to refactor certain areas of the code. 

#### Grid Object
Currently each step is an object in the form `{isChecked: true}`. I’d like to tidy this up by just having true/false for each step. I think this will improve the readability of the code and make the grid array easier to work with. 

#### Sequence Data
The sequence data for each track currently exists as two separate arrays. I’d like to incorporate this into one object in order to simplify the component and to make life easier for future me. 

### User Experience
I’d like to develop the User Experience as I feel that there are areas of the application that are tricky to use or unclear. One particular area that needs work is the login page. I’d like to display prompts when:
* User creates an account successfully 
* Username or password is incorrect 

Also I’d like to display information about the expected format of the password (8 letters, special characters etc..) 

### New Features 
I had quite a few ideas for extra functionality for co_lab that I didn’t get time to implement. Some that I’d particularly like to develop are:
* Drum sequencer
* Search/filter function on instruments and drums 
* Search/filter on Fragments 
* Users can comment and rate Fragments 
* Record and upload audio tracks 
* Dynamic sequencer
    * Can toggle between 16/32 bars and also shift the octave up and down
* Can see all collaborations on user profile 
* Develop my own MIDISounds component written using React Hooks
* Users can combine Fragments into whole pieces of music. 



