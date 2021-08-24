# trio-home-project-back
Backend project for Trio hiring proccess

# Heroku Demo
## Front
https://trio-home-project-frontend.herokuapp.com/
## Back
https://trio-home-project-backend.herokuapp.com/

# Technical Design
https://docs.google.com/document/d/1RJOdjD1ebsVU-TG3NLPsAsteqrZTpsfkZ8hgiwE8iy0/edit?usp=sharing

# To do
Create complete README
Unit tests
Improve error handling
Currently it returns the amount of contacts sent to synchronization, but sendGrid provides an endpoint for checking request status. The refreshing is slow to be used on current design, but could be improved on. Request identification is being returned to frontend.
Contacts synchronization was made by upserting any contacts on any related list of mailchimp to sendgrid, but there might be other approaches, such as removing any contact not on mailchimp
