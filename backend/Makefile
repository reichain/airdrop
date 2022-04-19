COMMIT_SHA=$(shell git rev-parse HEAD)
DOCKER_IMAGE=asia-southeast1-docker.pkg.dev/reichain/docker/airdrop-backend

docker:
	buildctl build \
		--frontend dockerfile.v0 \
		--local dockerfile=. \
		--local context=. \
		--output type=image,name=$(DOCKER_IMAGE):$(COMMIT_SHA),push=true

deploy: docker
	deploys deployment set image airdrop-backend -project=reichain -image=$(DOCKER_IMAGE):$(COMMIT_SHA)
