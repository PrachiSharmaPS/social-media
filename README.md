# social-media
## Deploye Link
https://socialmediaapplication-z0kw.onrender.com
## API Endpoints
The deployed link for the application is provided, and the following API endpoints are available:

### POST /api/authenticate 
This endpoint performs user authentication and returns a JWT token. The input parameters are email and password, and the return value is a JWT token. No new user registration endpoint is required as dummy email and password can be used for authentication.

### POST /api/follow/{id}
 Authenticated user can follow a user with {id}.

### POST /api/unfollow/{id}
 Authenticated user can unfollow a user with {id}.

### GET /api/user
 This endpoint authenticates the request and returns the respective user profile. The return values are the user's name, number of followers, and number of followings.

### POST api/posts/
This endpoint allows authenticated user to add a new post. The input parameters are the post's title and description, and the return values include the post ID, title, description, and created time in UTC.

### DELETE api/posts/{id}
 Authenticated user can delete a post with {id}.

### POST /api/like/{id}
 Authenticated user can like a post with {id}.

### POST /api/unlike/{id}
 Authenticated user can unlike a post with {id}.

### POST /api/comment/{id}
 Authenticated user can add a comment for a post with {id}. The input parameter is the comment, and the return value is the comment ID.

### GET api/posts/{id}
 This endpoint returns a single post with {id} populated with its number of likes and comments.

### GET /api/all_posts
 This endpoint returns all posts created by authenticated user sorted by post time. The return values include the post ID, title, description, created time, array of comments for the particular post, and number of likes for the particular post.

 ## Installation

```bash
$ npm install
```
## Running the app

```bash
# development
$ npm run start
```
