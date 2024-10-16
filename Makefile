# Command that builds the server artifacts and the client-side artifacts
# Then the `postbuild:client` command moves it into the server directory to serve it
build-application:
	npm run build:server
	npm run build:client
	npm run postbuild:client
	npx prisma generate

# Command that populates the empty database with the right table and column structures	
push:
	npx prisma db push

# Command that seeds the database with student users and coach users
seed:
	npx prisma db seed

# Command for quickly start the local server
start:
	npm run start:server