.PHONY: serve

BLUE=\033[0;34m
NOCOLOR=\033[0m

PORT?=8080

default: serve

serve:
	@echo "${BLUE}Starting local webserver at http://localhost:${PORT}/${NOCOLOR}."
	yarn start

build:
	@echo "${BLUE}Building page, results in index.html ${NOCOLOR}."
	yarn build

prettify:
	prettier --single-quote --trailing-comma all --print-width 79 --write src/*.js webpack.config.js

deploy: build
	@echo "${BLUE}Pushing page to github...${NOCOLOR}."
	git pull origin master
	git add -A
	git commit -m 'Deploy'
	git push origin master
	@echo "${BLUE}Done! Results at samlau.me/camera-interact${NOCOLOR}."
