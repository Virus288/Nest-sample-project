clean:
	rm -rf ./build \
	rm tsconfig.tsbuildinfo

test:
	clear \
	&& npm run test \
	&& npm run test:e2e
