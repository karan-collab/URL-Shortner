# Lin-k.cf
A minimilast and modern link shortner, written in typescript.

## Requirements
- node (>= 10.5.0)
- yarn
- tsc / Typescript Compiler (>= 3.0.1)
- typescript (>= 3.0.1)
- sqlite (>= 2.0.0)
- redis

## App Structure

```
├── queries
│   ├── check_if_exists.sql
│   ├── create_schema.sql
│   ├── get_short_link.sql
│   ├── increment_click_count.sql
│   ├── insert_new_link.sql
│   └── total_urls.sql
├── src
│   ├── app.ts
│   ├── dao.ts
│   └── utils.ts
├── static
│   ├── css
│   ├── fonts
│   ├── images
│   ├── js
│   └── vendor
├── views
│   ├── 404.ejs
│   └── index.ejs
├── Dockerfile
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

## Install, Configure and Run

Below mentioned are the steps to install, configure & run in your platform/distributions.


# Install NPM dependencies.
yarn install 

# Initialize .env file
cp .env.sample .env

# Run the server
yarn start
<br /> 
## Live Link
[Website Link](https://lin-k.cf/)
<br />
## Screenshot of Interface
<img width="1431" alt="Screen Shot 2022-12-16 at 7 45 42 PM" src="https://user-images.githubusercontent.com/57176666/208117674-b329e820-f4d4-4b7d-95e4-57cd041b2dd8.png">


