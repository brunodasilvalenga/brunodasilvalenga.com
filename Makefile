NODEJS_IMAGE=node:14-alpine

DEFAULT_ARG_DEFNITIONS=docker run -it --rm --env-file=.env -w /work -v $(shell pwd)/:/work -p 3000:3000

RUN_NODEJS_SHELL=$(DEFAULT_ARG_DEFNITIONS) --entrypoint=sh $(NODEJS_IMAGE)
RUN_NODEJS=$(DEFAULT_ARG_DEFNITIONS) $(NODEJS_IMAGE)

.PHONY: .env install start shell

env-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Environment variable $* not set"; \
		exit 1; \
	fi

.env:
	touch .env

install: .env
	$(RUN_NODEJS) npm install

start: .env
	$(RUN_NODEJS) npm run start

shell: .env
	$(RUN_NODEJS_SHELL)