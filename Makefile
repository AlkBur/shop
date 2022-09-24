default: build-server

run-server:
	go run .
#	@cd server/ \
#	&& go mod tidy	\
#	&& go run .	

build-server:
	CGO_ENABLED=0 go build -ldflags="-w -s" -a -installsuffix -o shop .
#	@cd server/ &&
#	CGO_ENABLED=0 go build -ldflags="-w -s" -a -installsuffix -o shop .