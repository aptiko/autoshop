# Autoshop

A demo project for the Toptal React Academy.

Users can create accounts and log in. They can see and edit a list of repairs
assigned to them and filter them and mark them as complete. Administrators can
add, remove and edit repairs and assign users to them.

## Creating a development installation

- Clone the repository and go to the top-level directory.
- Create and activate a Python 3 virtualenv.
- Install backend dependencies: `pip install -r requirements.txt`
- Prepare the database: `./manage.py migrate`
- Run the backend tests: `./manage.py test`
- Create a superuser: `./manage.py createsuperuser`
- Start the backend server: `./manage.py runserver`
- On another terminal window, change to the `frontend` directory.
- Install frontend dependencies: `yarn`.
- Run the frontend tests: `yarn run jest`.
- Compile the frontend: `yarn run webpack -- --watch`.

After all this, you should be able to logon to http://localhost:8000/ and do
more stuff.

## Known limitations

- When a user manager hits "reload" on the browser, it sometimes shows all
  repairs as unassigned; this is because it manages to finish loading repairs
  from the server before it has managed to load users.
- Password setting and changing has not been implemented; the user is specified
  at registration time and that's it.
- The dates are entered in text fields in ISO8601 format instead of using
  date pickers.
- It would have been more logical when filtering with dates to be able to
  specify a start date and an end date.
- The times sometimes show as 00:00 and sometimes as 00:00:00.
- When a user registers and confirms their email, the confirmation page has
  no CSS and the links are incorrect (but the registration finishes OK).
- Whenever there is an error when submitting a form, the form is cleared.

## Web service API

### Authentication

Authenticate with username and password; for example,

    curl -u alice:topsecret http://localhost:8000/api/repairs/

### Repairs

#### Get all repairs: GET /api/repairs/

    curl -u alice:topsecret http://localhost:8000/api/repairs/

This will get all the repairs for alice; if alice is an admin, it will get
the repairs for all users.

#### Get all repairs for a user: GET /api/users/X/repairs/

    curl -u admin:topsecret http://localhost:8000/api/users/1/repairs/

This will get all the repairs for the user with id 1, provided that the user is
either an admin or the user with id X; otherwise it will return an empty list.

#### Get a specific repair: GET /api/repairs/X/

    curl -u alice:topsecret http://localhost:8000/api/repairs/2/

Gets the repair with id 2.

#### Get the comments for a repair: GET /api/repairs/X/comments/

    curl -u alice:topsecret http://localhost:8000/api/repairs/2/comments/

Gets the comments for repair 2.

#### Create a comment: POST /api/repairs/X/comments/

    curl -u alice:topsecret http://localhost:8000/api/repairs/2/comments/ \
        -d comment="This repair sucks!"

#### Create a repair: POST /api/repairs/

    curl -u alice:topsecret http://localhost:8000/api/repairs/ \
        -d assigned_user=1 \
        -d date=2017-04-28 \
        -d time=08:15 \
        -d complete=false

This only works if Alice is an admin.

#### Update a repair: PUT /api/repairs/X/

    curl -u alice:topsecret http://localhost:8000/api/repairs/3/ \
        -X PUT \
        -d assigned_user=1 \
        -d date=2017-04-28 \
        -d time=08:15 \
        -d complete=false

This example assumes that Alice is either an admin or the user with id 1. If
Alice is not an admin, the fields must not change anything, with the exception
of "complete", which can be set to true.

#### Delete a repair: DELETE /api/repairs/X/

    curl -u alice:topsecret http://localhost:8000/api/repairs/3/ -X DELETE

This only works if Alice is an admin.

### Users

#### Get all users: GET /api/users/

    curl -u alice:topsecret http://localhost:8000/api/users/

This will get all users.

#### Get a specific user: GET /api/users/X/

    curl -u alice:topsecret http://localhost:8000/api/users/3/

#### Create a user: POST /api/users/

    curl -u alice:topsecret http://localhost:8000/api/users/ \
        -d username=george \
        -d is_staff=false

#### Update a user: PUT /api/users/X/

    curl -u alice:topsecret http://localhost:8000/api/users/3/ \
        -X PUT \
        -d username=aliki \
        -d is_staff=false

#### Delete a user: DELETE /api/users/X/

    curl -u alice:topsecret http://localhost:8000/api/users/3/ -X DELETE

#### Get a CSRF token: GET /api/

This returns an empty response, which is the way to get a CSRF token before logging in.
