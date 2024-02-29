# Booksy-backend


### Steps

```
npm install
```

1 - Installs all packages needed for backend


```
Querying user data
```

The attribute called user_id should be used to get any data back regarding a logged in user.

Here is an outline of how a user is created:
    1 - Guest creates user via Clerk
    2 - Clerk sends us the user data through a POST request
    3 - After verification using svix's webhook headers
    4 - A new user is created in the database with a user_id attribute that directly links to a user in Clerk 


```
Emails
```

We are using Brevo's SMPT service to route our emails. 

You can set up a new one by following these steps: 
    1 - Create a new async function 
    2 - Set the email up using a variable and calling await on transporter.sendMail
    3 - Insert key details:
        from:
        to:
        subject:
        html:
    4 - Run node <functionname>().catch(console.error) to debug