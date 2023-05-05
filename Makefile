.PHONY: format install-deps

format:
	js-beautify -r *.js

install-deps:
	pip install js-beautify
	
