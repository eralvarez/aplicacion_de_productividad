## What change

- {LIST OF CHANGES}

## How to verify

- [setup your local postgres](https://github.com/Healsty-Organization/docker-postgres)
- create new database name `project_db`
- get the code

## Test

```bash
git clone git@github.com:Healsty-Organization/ecommerce-webapi.git
cd ecommerce-webapi
git checkout {BRANCH}
npm i
```

- modify `development.js` with your postgres info

- `npm run db:sync`

- `npm run db:seed`

## What to verify

- {STEPS TO VERIFY}