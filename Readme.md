# How to Run application

1. Clone the repository
```sh
git clone https://github.com/Caleb9083/studious-spork.git
```

2. Change directory into application
```sh
cd studious-spork
```

3. Install dependencies
```sh
yarn install
```

4. Copy sample.env to .env file and populate the env accordinly
```sh
cp sample.env .env
```
5. Start local database with docker `(Optional)`
NB: make sure you have the make cli installed.
```sh
make mongodb
```
6. start the application
```sh
yarn start
```