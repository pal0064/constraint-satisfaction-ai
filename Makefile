.PHONY: format install

format:
	js-beautify -r *.js

install-deps:
	pip install js-beautify
	