# DaCapo
## Let B-stock instruments resound again!


![Overview of DaCapo](./  "Overview of DaCapo")

[Click here for the full website access](https://)




## Table of contents
1. [Introduction](#introduction) 
2. [Preparation](#preparation)
3. [Development](#development)
4. [Features](#features)
5. [Testing](#testing)
6. [Deployment](#deployment) 
7. [Notes](#notes) 
8. [Credits / attributes](#credits) 



## Introduction 

role that specialist Front-End developers perform in modern software development


## Preparation


project goals --> according user story... 


The **UXD - User Experience Design** was declared and described in advance and includes the 5 panels *strategy, scope, structure, skeleton and surface*. 

### Strategy 
What makes DaCapo special? 


---
### Scope 


What can not be implemented within the project, just because of lack of time? 
* 

The scope, in terms of content, will stretch over  components.
* 

Here, further pages are omitted too due to time constraints. 
How the individual pages are composed is outlined in the structure section next.


components  --> according user story...


--- 
### Structure 

The structure of the app is kept very simple and is illustrated here for the sake of completeness. This results in a simple, clear and intuitive navigation for the user. 

![Structure of DaCapo](./ "Structure of DaCapo")

---
### Skeleton 

In order to implement the pages safer, faster and more efficiently, wireframe models were created in advance. Excluded from this are the pages login, signup and logout, as these are simple pages with either a form element or a feedback display. Wireframe models are therefore only created for more complex pages. 



![Wireframe of index page](./ "Wireframe of index page")

![Wireframe of instruments page](./ "Wireframe of instruments page")

![Wireframe of instruments detail page](./ "Wireframe of instruments detail page")

![Wireframe of profile](./ "Wireframe of profile")

![Wireframe of bookmark feed](./ "Wireframe of bookmark feed")

---
### Surface

In terms of visual language, the main points that remain are colors, logo and fonts.
The color palette consists of the main color # and some according compound colors. Down below you can see an abstract of the Adobe Color Wheel.

![Color palette](./ "Color palette")

The app logo was created with the Adobe Express. 

![Logo](./ "Logo")

Google Fonts was used for the typography. The font "" is used for headlines and titles, the font "" is used for everything else. The icons in the app are also from Google (Google Icons). The icons from Google are not provided via a CDN, but they have been downloaded. 

## Development

The entire project was developed in an agile manner. Particularly noteworthy is the sprint board (git hub project), on which the user stories and their status were recorded. For better traceability, the project was set to public. 

To make it clearer, the user stories were divided into epics (unfortunately not visible in the sprint). For the sake of completeness, the epics with the corresponding stories are listed here once again. 

### Admin Epic:
**Introduction:**



**Goals & Outcomes:**




### User Epic:
**Introduction:**




**Goals & Outcomes:**




Down below, you can see the sprint board in action during development.
![Agile development](./ "Agile development")



## Features
The DaCapo app has many features, which will now be examined in more detail below. 



UX design and accessibility guidelines, and the site is fully responsive.




Another feature are the present and working CRUD operations that the user can perform in the frontend.
These include: 

* the creation



Users also get feedback on all CRUD operations and database states.
This includes: Feedback...





A special feature is also the sending of emails, 

![Email example](./ "Email example")


### Features for the future 
The following features would be ideas for further development...



## Testing 

The page and its functionality was tested manually as well as automatically. For a better overview, these two areas are now treated separately from each other. 

**Manual testing**

Manual testing was done primarily using Chrome DevTools (Lighthouse) and validators for HTML, CSS, JavaScript and Python.

The layout was tested in portrait and landscape mode on the following devices: iPhone SE, iPhone XR, iPhone 12 Pro, Pixel 5, Samsung Galaxy S8+, Surface Pro 7, Surface Duo, Galaxy Fold, Samsung Galaxy A51/71, Nest Hub, Nest Hub Max and common monitors. No display errors were detected. If other devices show any, they would have to be improved afterwards. 

To test accessibility and SEO, Lighthouse was used. 

![Lighthouse report](./  "Lighthouse report")



**Automatic testing**


The suite consists of  tests, all of which pass at the time of project release.
![Test suite](./  "Test suite")


## Deployment 

After the Django project and apps were created, the project was deployed directly to Heroku in order to be able to plan ahead and spend less time on it in the end. The individual steps were: 



[You can access the website right here](https://)


## Notes

**Security features**

In the course of the creation attention was paid to security at all times. All sensitive information is stored in environment variables and at no time was the project deployed to Heroku with debug=True. No critical information was made public like this. 

**Front-End libraries**

why chosen?
improved UX?

**Requirements**


## Credits


**Code-related**

At this point I would first like to mention the course content from CodeInstitute.


**Images**