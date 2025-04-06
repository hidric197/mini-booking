## About project
- Laravel version 12.7.2
- React version 9.1.0
- Database: sqlite

## Install Laravel

1. Install vendors

    `composer install`
2. Copy file environment

    `cp .env.example .env`
3. Generate laravel app key

    `php artisan key:generate`
3. Run migrations

    `php artisan migrate`

4. Run seeders

    `php artisan db:seed`

5. Generate JWT-Auth secret key

    `php artisan jwt:secret`

## Install React

1. Install node_modules

    `npm install`

## Build local environment
1. Run Laravel server
    `php artisan serve`

2. Run React server
    `npm run dev`

3. Goto index page
    `http://localhost:8000`

## How to use?
1. Use as a guest

    - Users can view available for rooms
    - Pre-booking
2. Use as an admin (Need to login)

    `Username: admin@gmail.com`

    `Password: 12345678`

    - Can view, create, edit, and delete rooms.
    - Can view room bookings
    - Can view, create, edit, and delete bookings.
