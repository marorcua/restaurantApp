# Restaurant web application

<hr>

## Endpoints

| Method        | Path       | Description |
|:-------------| :----------|:------------|
| Get           | /         | App introduction/ link Log in |
| Get           |   /auth/ | log In|
| Get          |    /auth/sign-up | Sign up and create user profile            |
| Post          |    /auth/sign-up | Sign up and create user profile            |
| Get          |    /auth/log-out | Log out of the application            |
| Get          |    /users/ | Welcome page            |
| Get          |    /users/list | Users list            |
| Get          |    /users/:id | Display user profile            |
| Get          |    /users/edit/:id | Edit user profile            |
| Post          |    /users/edit/:id | Edit user profile            |
| Get          |    /users/delete/:id | Delete user profile            |
| Get          |    /restaurants/favorites | Favorites restaurantes            |
| Get          |    /restaurants/appointments | Restaurants appointments            |
| Get          |    /chat | Chat list            |
| Get          |    /chat/:id | Individual chat            |
| Get          |    /map | Main map            |
