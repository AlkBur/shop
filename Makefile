BINARY_NAME=shop

default: build-server

run-server:
	go run .
#	@cd server/ \
#	&& go mod tidy	\
#	&& go run .	

build-server:
	go build -ldflags="-w -s" -a -installsuffix -o shop .
#	@cd server/ &&
#	CGO_ENABLED=0 go build -ldflags="-w -s" -a -installsuffix -o shop .

build:
	go build -o ${BINARY_NAME} .

run:
 ./${BINARY_NAME}

build_and_run:
	build run

clean:
	go clean
	rm ${BINARY_NAME}