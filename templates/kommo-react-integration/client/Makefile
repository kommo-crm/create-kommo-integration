copy:
	export SYNC_DOCKER_ID=`docker run -d $(IMAGE) true`; \
	rm -rf $(COPY_TO_PATH); \
	docker cp $${SYNC_DOCKER_ID}:$(COPY_FROM_PATH) $(COPY_TO_PATH); \
	docker rm $${SYNC_DOCKER_ID}

CONTAINER_NAME="kommo-react-integration:latest"

build:
	docker build \
	--tag ${CONTAINER_NAME} \
		-f ./deploy/prod/Dockerfile \
		--build-arg ENVIRONMENT=prod \
		.
	make copy \
		IMAGE=${CONTAINER_NAME} \
		COPY_TO_PATH="./widget.zip" \
		COPY_FROM_PATH="/opt/app/dist/widget.zip"

run-dev:
	ENVIRONMENT="dev" \
	docker compose up
