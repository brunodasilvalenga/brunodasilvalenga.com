NODEJS_IMAGE=node:14-alpine

DEFAULT_ARG_DEFNITIONS=docker run -it --rm --env-file=.env -w /work -v $(shell pwd)/:/work -p 3000:3000

RUN_NODEJS_SHELL=$(DEFAULT_ARG_DEFNITIONS) --entrypoint=sh $(NODEJS_IMAGE)
RUN_NODEJS=$(DEFAULT_ARG_DEFNITIONS) $(NODEJS_IMAGE)

.PHONY: .env install build start shell export new-post

env-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* not set"; \
		exit 1; \
	fi

.env:
	touch .env

install: .env ## Install NPM packages
	$(RUN_NODEJS) npm install

build: .env ## Build NextJS project.
	$(RUN_NODEJS) npm run build

export: .env ## Export NextJS application
	$(RUN_NODEJS) npm run export

start: .env ## Run NextJS in dev mode.
	$(RUN_NODEJS) npm run start

shell: .env ## Open shell as nodejs
	$(RUN_NODEJS_SHELL)

new-post: .env ## Create new post
	$(RUN_NODEJS) npm run new-post