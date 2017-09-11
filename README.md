# Autoshop

A demo project for the Toptal React Academy.

Users can create accounts and log in. They can see and edit a list of repairs
assigned to them and filter them and mark them as complete. Administrators can
add, remove and edit repairs and assign users to them.


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
either an admin or the user with id 1; otherwise it will return an empty list.

#### Get a specific repair: GET /api/repairs/X/

    curl -u alice:topsecret http://localhost:8000/api/repairs/2/

Gets the repair with id 2.

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

This will get only alice, unless alice is an admin, in which case it will get
all users.

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
